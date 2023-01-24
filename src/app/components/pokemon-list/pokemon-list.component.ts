import { Component, OnInit } from '@angular/core'
import { PokemonService } from 'src/app/services/pokemon.service'
import { Pokemon } from 'src/app/models/pokemon'

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  constructor(private pokemonService: PokemonService) { }

  title = 'pokedex'
  pokemons: Pokemon[]

  ngOnInit(): void {
    this.pokemonService.getPokemons()
      .subscribe(res => this.pokemons = res)
  }
}
