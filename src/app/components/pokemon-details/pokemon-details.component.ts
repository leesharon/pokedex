import { PokemonService } from 'src/app/services/pokemon.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PokemonDetails } from 'src/app/models/pokemon-details'

@Component({
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private router: Router) { }

  pokemon!: PokemonDetails

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokemonService.getPokemon(+params.idx + 1)
        .subscribe(res => { this.pokemon = res })
    })
  }

  goBack() {
    this.router.navigateByUrl("/pokemon")
  }
}
