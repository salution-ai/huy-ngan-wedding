import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

export const runtime = "nodejs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({ success: false, message: "Cloudinary env vars are missing" }, { status: 500 })
    }

    const formData = await req.formData()
    const file = formData.get("file")

    if (!file || typeof file === "string" || typeof file.arrayBuffer !== "function") {
      return NextResponse.json({ success: false, message: "File is required" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploaded = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "print-up" }, (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed"))
            return
          }
          resolve({ secure_url: result.secure_url })
        })
        .end(buffer)
    })

    return NextResponse.json({
      success: true,
      imageUrl: uploaded.secure_url,
    })
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 })
  }
}

function getPublicIdFromCloudinaryUrl(imageUrl: string) {
  try {
    const { pathname } = new URL(imageUrl)
    const uploadIndex = pathname.indexOf("/upload/")
    if (uploadIndex === -1) {
      return null
    }

    let publicPath = pathname.slice(uploadIndex + "/upload/".length)
    publicPath = publicPath.replace(/^v\d+\//, "")
    publicPath = publicPath.replace(/\.[^/.]+$/, "")
    return decodeURIComponent(publicPath)
  } catch {
    return null
  }
}

export async function DELETE(req: Request) {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({ success: false, message: "Cloudinary env vars are missing" }, { status: 500 })
    }

    const { imageUrl } = (await req.json()) as { imageUrl?: string }

    if (!imageUrl) {
      return NextResponse.json({ success: false, message: "imageUrl is required" }, { status: 400 })
    }

    const publicId = getPublicIdFromCloudinaryUrl(imageUrl)
    if (!publicId) {
      return NextResponse.json({ success: false, message: "Invalid cloudinary imageUrl" }, { status: 400 })
    }

    const result = await cloudinary.uploader.destroy(publicId)
    if (result.result !== "ok" && result.result !== "not found") {
      return NextResponse.json({ success: false, message: "Cloudinary delete failed" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Cloudinary delete error:", error)
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 })
  }
}
