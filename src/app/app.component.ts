import { Component, OnInit } from '@angular/core'
import { PokemonService } from 'src/app/services/pokemon.service'
import { Pokemon } from './models/pokemon'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private pokemonService: PokemonService) { }

  title = 'pokedex'
  pokemons: Pokemon[]

  ngOnInit(): void {
    this.pokemonService.getPokemons()
      .subscribe(res => { this.pokemons = res; console.log(res) })
  }
}
