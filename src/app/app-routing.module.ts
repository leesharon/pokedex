import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component'
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component'

const routes: Routes = [
  {
    path: 'pokemon/:idx',
    component: PokemonDetailsComponent
  },
  {
    path: 'pokemon',
    component: PokemonListComponent
  },
  {
    path: '',
    component: PokemonListComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
