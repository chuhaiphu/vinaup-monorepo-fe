import * as React from "react"

export default function MenuSquareIcon({
    fill = "#F16406",
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
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect
                x={29.9751}
                y={21.2393}
                width={24.5309}
                height={7.47863}
                rx={3.73931}
                transform="rotate(-180 29.9751 21.2393)"
                fill={fill}
            />
            <rect width={24.5297} height={7.47863} rx={3.73931} fill={fill} />
            <rect
                x={34.9995}
                y={35}
                width={24.5297}
                height={7.47863}
                rx={3.73931}
                transform="rotate(-180 34.9995 35)"
                fill={fill}
            />
            <ellipse
                cx={3.73923}
                cy={31.2607}
                rx={3.73929}
                ry={3.73932}
                transform="rotate(-180 3.73923 31.2607)"
                fill={fill}
            />
            <ellipse
                cx={31.2608}
                cy={3.73932}
                rx={3.73929}
                ry={3.73932}
                fill={fill}
            />
        </svg>
    )
}