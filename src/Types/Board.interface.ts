export interface BoardColumn {
    id: Number,
    value: String
}

export interface BoardRow {
    rowId: Number,
    columns: BoardColumn[]
}