interface PointsBadgeProps {
    points: number;
}
export const PointsBadge = ({points}:PointsBadgeProps):JSX.Element => {
    return (
        <div className={`flex items-center justify-center rounded-md bg-gray-800 w-20 py-1 text-gray-100`}>
            <span className="text-xs font-semibold">
                {points}
            </span>
        </div>
    )
}