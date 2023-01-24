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

  searchTerm = ''
  selectedType: string
  types: string[] = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy']
  title = 'pokedex'
  pokemons: Pokemon[]

  ngOnInit(): void {
    this.pokemonService.getPokemons()
      .subscribe(res => this.pokemons = res)
  }

  filterPokemons() {
    if (!this.pokemons) return
    return this.pokemons.filter(pokemon => {
      if (this.selectedType && (this.selectedType.toLowerCase() !== pokemon.type)) return false
      if (this.searchTerm && !pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())) return false
      return true
    })
  }

}
