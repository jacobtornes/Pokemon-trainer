import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { PokemonAPI } from '../models/pokemonAPI.model';

const { apiPokemon } = environment;
@Injectable({
  providedIn: 'root',
})
export class PokemonCatalogueService {
  private _pokemons: Pokemon[] = [];
  private _error: string = '';
  private _loading: boolean = false;
  private _apiDone = false;

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {
    this._pokemons = [];
  }
  public findAllPokemons(): void {
    if (!this._apiDone) {
      this._loading = true;
      this.http
        .get<PokemonAPI>(apiPokemon)
        .pipe(
          map((response: PokemonAPI) => response.results))
        .pipe(
          finalize(() => {
            this._loading = false;
          })
          )
          .subscribe((results: Pokemon[]) => {
          for (let result of results) {
            this.pokemons.push(result);
            for(let i = 0 ; i <results.length;i++){
            results[i].image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 151}.png`
            }
          }


        }),

        { error: (error: HttpErrorResponse) => {} };
    }
    this._apiDone = true;
  }
}
