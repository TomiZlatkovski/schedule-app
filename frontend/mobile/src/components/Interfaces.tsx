export interface iNote {
    name: string
    description: string
    date: string
    time?: string
    id?: number
}

export interface iResponse {
    result: iNote[]
    successMessage: string
    errorMessage: string
}