import { Injectable } from '@angular/core'
import { Pokemon } from '../models/pokemon'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://pokeapi.co/api/v2/pokemon/'

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<{ results: Pokemon[] }>(this.apiUrl + `?offset=0&limit=100`).pipe(
      map(res => {
        return res.results.map((pokemon, idx) => {
          return {
            name: pokemon.name.at(0).toUpperCase() + pokemon.name.slice(1),
            imageURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
            idx
          }
        })
      })
    )
  }

  getPokemon(idx: number): Observable<Pokemon> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${idx}`).pipe(
      map(res => {
        return {
          idx,
          name: res.name,
          height: res.height,
          weight: res.weight,
          type: res.types[0].type.name,
          abilities: res.abilities.map(ability => ability.ability.name),
          imageURL: res.sprites.front_default
        }
      })
    )
  }
}