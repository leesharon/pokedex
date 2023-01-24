export interface Pokemon {
    name: string
    imageURL?: string
    idx: number
    sprites?: { front_default: string }
    url?: string
    baseExperience?: number
    base_experience?: number
    height?: number
    weight?: number
    type?: string
    abilities?: string[]
}