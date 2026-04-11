import React from 'react';

export default function LocationIcon({
  fill = '#00E1FF',
  size = 22,
  className,
}: {
  fill?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_16_952"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="22"
      >
        <path
          d="M3.78255 15.3785C2.06305 15.9215 1 16.6715 1 17.5C1 19.157 5.25315 20.5 10.5 20.5C15.7468 20.5 20 19.157 20 17.5C20 16.6715 18.9365 15.9215 17.2174 15.3785"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5002 16.5C10.5002 16.5 16.6752 12.252 16.6752 7.341C16.6752 3.839 13.9107 1 10.5002 1C7.0897 1 4.3252 3.839 4.3252 7.341C4.3252 12.252 10.5002 16.5 10.5002 16.5Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 10C11.1299 10 11.734 9.73661 12.1794 9.26777C12.6248 8.79893 12.875 8.16304 12.875 7.5C12.875 6.83696 12.6248 6.20107 12.1794 5.73223C11.734 5.26339 11.1299 5 10.5 5C9.87011 5 9.26602 5.26339 8.82062 5.73223C8.37522 6.20107 8.125 6.83696 8.125 7.5C8.125 8.16304 8.37522 8.79893 8.82062 9.26777C9.26602 9.73661 9.87011 10 10.5 10Z"
          fill="black"
          stroke="black"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_16_952)">
        <path d="M-0.899902 -1H21.9001V23H-0.899902V-1Z" fill={fill} />
      </g>
    </svg>
  );
}
