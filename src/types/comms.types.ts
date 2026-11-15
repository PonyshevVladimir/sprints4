export type CommCategory = 'idea' | 'fix' | 'fact' | 'question'

export interface IComm {
    id: number
    book_id: number
    parent_id: number
    category: CommCategory
    created_at: string
    replies: IComm[]
}