const columns = [{
    id: 'position',
    label: 'Pos',
    format: v => v.toLocaleString(),
}, {
    id: 'player',
    label: 'Name',
    format: v => v.toLocaleString(),
}, {
    id: 'matchesWon',
    label: 'Wins',
    format: v => v.toLocaleString(),
}, {
    id: 'matchesLost',
    label: 'Loses',
    format: v => v.toLocaleString(),
}, {
    id: 'winRatio',
    label: 'Wins / Loses',
    format: v => v.toLocaleString(),
}, {
    id: 't1',
    label: 'T1',
    format: v => v.toLocaleString(),
}, {
    id: 't2',
    label: 'T2',
    format: v => v.toLocaleString(),
}, {
    id: 't3',
    label: 'T3',
    format: v => v.toLocaleString(),
}, {
    id: 'points',
    label: 'Points',
    format: v => v.toLocaleString(),
}];

export default columns;
