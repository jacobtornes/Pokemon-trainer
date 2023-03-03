import {Pokemon} from "./pokemon.model";

export interface PokemonAPI {
    count:number,
    next:string,
    previous:string,
    results:Pokemon[]
}
