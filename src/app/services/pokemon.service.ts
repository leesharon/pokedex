import { Injectable } from '@angular/core'
import { Pokemon } from '../models/pokemon'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/'

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<{ results: any[] }>(this.apiUrl).pipe(
      map(res => {
        return res.results.map((pokemon, idx) => {
          return {
            name: pokemon.name.at(0).toUpperCase() + pokemon.name.slice(1),
            imageURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
            idx: idx + 1
          }
        })
      })
    )
  }
}
