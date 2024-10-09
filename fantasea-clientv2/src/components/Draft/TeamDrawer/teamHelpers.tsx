export const getJerseyPath = (teamCode: number): string => {
    return `/assets/images/kits/${teamCode}.png`;
};

export const getTransfersDiff = (transfersIn: number, transfersOut: number): JSX.Element => {
    const transferDiff = transfersIn - transfersOut;
    return (
        <p className={`truncate text-sm ${transferDiff > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {`Transfer Diff : ${transferDiff}`}
        </p>
    );
};

export const countPlayers = (squad, bench) => {
    let squadCount = 0;
    let benchCount = 0;
    for(const position in squad) {
        squad[position].forEach(player => {
            if(!player.isPlaceholder) {
                squadCount++
            }
        })
    }
    bench.forEach(player => {
        if(!player.isPlaceholder) {
            benchCount++
        }
    })
    
    return squadCount + benchCount;
}