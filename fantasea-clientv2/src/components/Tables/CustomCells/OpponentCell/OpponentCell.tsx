export function OpponentCell(params): JSX.Element {
    if (!params.value) return <div>-</div>
    // Assuming the value getter combines opponent name and home/away in the format "Opponent Name (H)"
    const parts = params.value.split(' ');
    const homeOrAway = parts.pop(); // This removes the last element (e.g., "(H)") and returns it
    const opponentName = parts.join(' '); // Joins the remaining parts back into a string

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-2 text-base font-normal">{opponentName}</div>
            <div className="text-sm font-semibold">{homeOrAway}</div>
        </div>
    )
    
}