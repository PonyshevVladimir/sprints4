import type {IBook} from "@/types/book.types";
import type {IComm} from '@/types/comms.types'

const BASE_URL = " http://48.102.249.95/api";

async function request<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Accept: 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`)
    }

    return response.json() as Promise<T>
}
export function fetchBooksList() {
    return request<IBook[]>(`/books`)
}

export function fetchBookComments(bookId: number) {
    return request<IComm[]>(`/books/${bookId}/comments`)
}
