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
            viewBox="-1 -1 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ overflow: 'visible' }} // Đảm bảo không bị cắt cạnh
            preserveAspectRatio="xMidYMid meet" // Giữ đúng tỉ lệ khi thay đổi size
        >
            <rect
                x={36}
                y={22}
                width={36}
                height={7}
                rx={3.5}
                transform="rotate(-180 36 22)"
                fill={fill}
            />
            <rect
                x={36}
                y={36}
                width={25}
                height={6.99999}
                rx={3.5}
                transform="rotate(-180 36 36)"
                fill={fill}
            />
            <ellipse
                cx={3.5}
                cy={32.5}
                rx={3.5}
                ry={3.5}
                transform="rotate(-180 3.5 32.5)"
                fill={fill}
            />
            <rect width={25} height={6.99999} rx={3.5} fill={fill} />
            <ellipse cx={32.5} cy={3.5} rx={3.5} ry={3.5} fill={fill} />
        </svg>
    )
}