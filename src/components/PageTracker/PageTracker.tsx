'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function PageTracker() {
  const pathname = usePathname();
  const lastPathname = useRef<string | null>(null);

  useEffect(() => {
    if (pathname && pathname !== lastPathname.current) {
      lastPathname.current = pathname;

      // Automatically fire PAGE_VIEW telemetry event
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'PAGE_VIEW',
          path: pathname,
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch((e) => console.error('Failed to log page view:', e));
    }
  }, [pathname]);

  return null;
}
