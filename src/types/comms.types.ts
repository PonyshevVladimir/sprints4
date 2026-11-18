export type CommCategory = 'alternative' | 'edit' | 'lore' | 'question'

export interface IComm {
  id: number
  book_id: number
  parent_id: number
  category: CommCategory
  author: string
  text: string
  created_at: string
  children: IComm[]
}