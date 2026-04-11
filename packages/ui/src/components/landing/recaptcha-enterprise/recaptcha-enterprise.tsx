"use client";

import { useEffect, useImperativeHandle, useRef } from 'react';

export interface ReCaptchaEnterpriseHandle {
  reset: () => void;
}

interface ReCaptchaEnterpriseProps {
  sitekey: string;
  onChange: (token: string | null) => void;
  action?: string;
  ref?: React.Ref<ReCaptchaEnterpriseHandle>;
}

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        render: (
          container: HTMLElement,
          params: {
            sitekey: string;
            callback: (token: string) => void;
            'expired-callback': () => void;
            'error-callback': () => void;
            action?: string;
            theme?: 'light' | 'dark';
          }
        ) => number;
        reset: (widgetId: number) => void;
        getResponse: (widgetId: number) => string;
      };
    };
    onRecaptchaLoad: () => void;
  }
}

export function ReCaptchaEnterprise({
  sitekey,
  onChange,
  action = 'SUBMIT',
  ref,
}: ReCaptchaEnterpriseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current !== null) {
        window.grecaptcha.enterprise.reset(widgetIdRef.current);
      }
    },
  }));
  
  useEffect(() => {
    window.onRecaptchaLoad = () => {
      if (!containerRef.current) return;
      if (widgetIdRef.current !== null) return;

      widgetIdRef.current = window.grecaptcha.enterprise.render(
        containerRef.current,
        {
          sitekey,
          action,
          callback: (token: string) => {
            onChange(token);
          },
          'expired-callback': () => {
            onChange(null);
          },
          'error-callback': () => {
            onChange(null);
          },
        }
      );
    };

    const SCRIPT_ID = 'recaptcha-enterprise-script';
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) return;

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/enterprise.js?onload=onRecaptchaLoad&render=explicit`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById(SCRIPT_ID);
      if (s) document.head.removeChild(s);
    };
  });
  return <div ref={containerRef} />;
}
