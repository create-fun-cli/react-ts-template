export {}

declare module global {
  export type ListParams<T> = T & {
    page?: number
    page_size?: number
  }

  export interface ListResponse<T> {
    list: T[]
    page?: number
    page_size?: number
    total: number
  }
}
