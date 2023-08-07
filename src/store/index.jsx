import { proxy } from "valtio";

export const state = proxy( {
    recipes: [],
    ingredients: [],
} );