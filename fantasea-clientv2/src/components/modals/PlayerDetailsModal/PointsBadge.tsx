interface PointsBadgeProps {
    points: number;
}
export const PointsBadge = ({points}:PointsBadgeProps):JSX.Element => {
    return (
        <div className={`flex items-center justify-center rounded-md bg-gray-800 px-3 py-1.5 text-gray-100 w-8`}>
            <span className="text-sm font-semibold">
                {points}
            </span>
        </div>
    )
}