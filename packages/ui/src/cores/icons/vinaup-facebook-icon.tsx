import * as React from "react"

export default function VinaupFacebookIcon({
    fill = "#BDE5C0",
    size = 42,
    className,
}: {
    fill?: string;
    size?: number | string;
    className?: string;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M34.6667 0H4.33333C1.95 0 0 1.95 0 4.33333V34.6667C0 37.0522 1.95 39 4.33333 39H19.5V23.8333H15.1667V18.4708H19.5V14.0292C19.5 9.3405 22.126 6.04717 27.6597 6.04717L31.5662 6.0515V11.6957H28.9727C26.819 11.6957 26 13.312 26 14.8113V18.473H31.564L30.3333 23.8333H26V39H34.6667C37.05 39 39 37.0522 39 34.6667V4.33333C39 1.95 37.05 0 34.6667 0Z"
                fill={fill}
            />
        </svg>
    )
}