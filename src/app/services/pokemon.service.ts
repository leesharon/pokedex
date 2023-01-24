import { Injectable } from '@angular/core'
import { Pokemon } from '../models/pokemon'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { PokemonDetails } from '../models/pokemon-details'

interface ApiResponse {
  name: string
  height: number
  weight: number
  types: { type: { name: string } }[]
  abilities: { ability: { name: string } }[]
  sprites: { front_default: string }
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://pokeapi.co/api/v2/pokemon/'

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<{ results: Pokemon[] }>(this.apiUrl + `?offset=0&limit=100`)
      .pipe(
        map(res => {
          return res.results.map((pokemon, idx) => {
            const data = {
              name: pokemon.name.at(0).toUpperCase() + pokemon.name.slice(1),
              url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
              idx,
              type: ''
            }
            this.http.get(pokemon.url)
              .pipe(map((res: { types }) => res.types[0].type.name))
              .subscribe(res => data.type = res)
            return data
          })
        })
      )
  }

  getPokemon(idx: number): Observable<PokemonDetails> {
    return this.http.get<ApiResponse>(this.apiUrl + idx).pipe(
      map(pokemon => {
        return {
          idx,
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          type: pokemon.types[0].type.name,
          abilities: pokemon.abilities.map(ability => ability.ability.name),
          url: pokemon.sprites.front_default
        } as unknown as PokemonDetails
      })
    )
  }
}