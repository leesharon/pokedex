export interface PokemonDetails {
    name: string
    idx: number
    type: string
    url: string
    height: number
    weight: number
    sprites?: { front_default: string }
    types?: { type: { name: string } }[]
    abilities?: { ability: { name: string } }[]
}