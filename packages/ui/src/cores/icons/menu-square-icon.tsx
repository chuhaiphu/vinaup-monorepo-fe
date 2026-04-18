import * as React from "react"

export default function MenuSquareIcon({
    fill = "#fff",
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
            viewBox="0 0 57 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect
                x={56.0985}
                y={32.9539}
                width={56.0985}
                height={10.908}
                rx={5.45402}
                transform="rotate(-180 56.0985 32.9539)"
                fill="#F16406"
            />
            <rect
                x={56.0985}
                y={55}
                width={38.9573}
                height={10.908}
                rx={5.45402}
                transform="rotate(-180 56.0985 55)"
                fill="#F16406"
            />
            <ellipse
                cx={5.454}
                cy={49.546}
                rx={5.45402}
                ry={5.45402}
                transform="rotate(-180 5.454 49.546)"
                fill="#F16406"
            />
            <rect
                x={0.00012207}
                width={38.9573}
                height={10.908}
                rx={5.45401}
                fill="#F16406"
            />
            <ellipse
                cx={50.6445}
                cy={5.45402}
                rx={5.45402}
                ry={5.45402}
                fill="#F16406"
            />
        </svg>
    )
}