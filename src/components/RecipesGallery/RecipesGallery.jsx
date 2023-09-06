import { useProxy } from "valtio/utils";
import axios from "axios";
import { state } from "../../store";
import { useEffect, useState } from "react";
import SingleRecipe from "../SingleRecipe/SingleRecipe";
import style from './RecipesGallery.module.scss';



// https://chef-ai-sxiz.onrender.com
const path = 'http://localhost:3001'

function RecipesGallery() {

    const galleryGrid = {
        display: 'grid',
        margin: '0 auto',
        maxWidth: '100%',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridGap: '1rem',
        gridAutoRows: '1fr',
        gridAutoflow: 'row dense'
    };

    const snap = useProxy(state);
    const [recipes, setRecipes] = useState([]);

    const getAllRecipes = async () => {
        try {
            const { data } = await axios.get(path + '/recipes');
            snap.recipes = data;
            setRecipes(Array.from(snap.recipes));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllRecipes();
    }, []);

    return (<div style={galleryGrid} className={style.galleryGrid}>
        {recipes.length > 0 && recipes.map((recipe) => <SingleRecipe randomizeSize={Math.round(Math.random() * 2) + 1} key={recipe._id} recipe={recipe} />)}
    </div>);
}

export default RecipesGallery;