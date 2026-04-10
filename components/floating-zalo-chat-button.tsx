'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function ZaloWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    const div = document.createElement('div');
    div.className = 'zalo-chat-widget';
    div.setAttribute('data-oaid', '1026353125122284919');
    div.setAttribute('data-welcome-message', 'Rất vui khi được hỗ trợ bạn!');
    div.setAttribute('data-autopopup', '1');
    div.setAttribute('data-width', '');
    div.setAttribute('data-height', '');

    widgetRef.current.appendChild(div);
  }, []);

  return (
    <>
      <div ref={widgetRef}></div>
      <Script src="https://sp.zalo.me/plugins/sdk.js" strategy="afterInteractive" />
    </>
  );
}
