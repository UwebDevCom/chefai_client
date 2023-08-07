import { useProxy } from "valtio/utils";
import axios from "axios";
import { state } from "../../store";
import { useEffect, useState } from "react";
import SingleRecipe from "../SingleRecipe/SingleRecipe";
import style from './RecipesGallery.module.scss'; 

function RecipesGallery() {
    
    const snap = useProxy(state);
    const [recipes, setRecipes] = useState([]);


    const getAllRecipes = async () => {
        try {
            const { data } = await axios.get('https://chef-ai-sxiz.onrender.com/recipes');
            snap.recipes = data;
            setRecipes(Array.from(snap.recipes));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect( () => {
        getAllRecipes();
    }, [] );

    return ( <div className={style.galleryGrid}>
    {recipes.length > 0 && recipes.map((recipe) => <SingleRecipe key={recipe._id} recipe={recipe} />) }
    </div> );
}

export default RecipesGallery;