import { Pokemon } from "./pokemon.model";


export interface User {
    id: number;
    username: string;
    favourites: Pokemon[];
}



//NOTE to self:  Kanskje lage en trainer model.