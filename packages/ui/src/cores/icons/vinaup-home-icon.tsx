import React from 'react';

export default function HomeIcon({
  stroke = "#FCBE11",
  size = 17,
  className,
}: {
  stroke?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
    >
      <path
        d="M0.5 8.5L8.5 0.5L16.5 8.5M2.5 7L2.5 15.5C2.5 15.7652 2.60536 16.0196 2.79289 16.2071C2.98043 16.3946 3.23478 16.5 3.5 16.5L6.5 16.5L6.5 13.5C6.5 13.2348 6.60536 12.9804 6.79289 12.7929C6.98043 12.6054 7.23478 12.5 7.5 12.5L9.5 12.5C9.76522 12.5 10.0196 12.6054 10.2071 12.7929C10.3946 12.9804 10.5 13.2348 10.5 13.5L10.5 16.5L13.5 16.5C13.7652 16.5 14.0196 16.3946 14.2071 16.2071C14.3946 16.0196 14.5 15.7652 14.5 15.5L14.5 7"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

