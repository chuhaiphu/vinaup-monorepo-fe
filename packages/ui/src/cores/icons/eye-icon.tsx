import React from 'react';

export default function EyeIcon({
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
            width={size}
            height={size}
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M10.8647 1C5.42069 1 2.39569 5.234 1.32069 7.116C1.09969 7.502 0.98969 7.696 1.00069 7.984C1.01369 8.272 1.14369 8.46 1.40269 8.836C2.68269 10.694 6.15869 15 10.8647 15C15.5707 15 19.0467 10.694 20.3267 8.836C20.5867 8.46 20.7167 8.272 20.7277 7.984C20.7387 7.696 20.6297 7.502 20.4087 7.116C19.3347 5.234 16.3087 1 10.8647 1Z"
                stroke={stroke}
                strokeWidth={2}
            />
            <path
                d="M10.8647 12C13.0738 12 14.8647 10.2091 14.8647 8C14.8647 5.79086 13.0738 4 10.8647 4C8.65555 4 6.86469 5.79086 6.86469 8C6.86469 10.2091 8.65555 12 10.8647 12Z"
                fill={stroke}
            />
        </svg>
    );
}

