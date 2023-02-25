export interface BoardColumn {
    id: number,
    value: string
}

export interface BoardRow {
    rowId: number,
    columns: BoardColumn[]
}