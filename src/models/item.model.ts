export interface Item {
    id: number
    name: string
    price: number
}

export interface SearchFilters {
    name?: string
    minPrice?: number
    maxPrice?: number
}