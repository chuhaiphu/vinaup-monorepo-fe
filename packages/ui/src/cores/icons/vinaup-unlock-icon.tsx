import React from 'react';

export default function UnlockIcon({
  stroke = '#121212',
  size = 16,
  className,
}: {
  stroke?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.55 7.15039H2.35C1.46634 7.15039 0.75 7.86673 0.75 8.75039V15.1504C0.75 16.034 1.46634 16.7504 2.35 16.7504H13.55C14.4337 16.7504 15.15 16.034 15.15 15.1504V8.75039C15.15 7.86673 14.4337 7.15039 13.55 7.15039Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.1499 7.15V3.15C3.1499 2.51348 3.40276 1.90303 3.85285 1.45294C4.30293 1.00286 4.91338 0.75 5.5499 0.75H10.3499C10.9864 0.75 11.5969 1.00286 12.047 1.45294C12.497 1.90303 12.7499 2.51348 12.7499 3.15V3.95"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
