import React, { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import style from './CreateRecipe.module.scss';
import { useProxy } from 'valtio/utils';
import { state } from '../../store';
import axios from 'axios';
import { Button } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { useGetUserId } from "../../hooks/useGetUserId";

function CreateRecipe() {
    const [ingredients, setIngredients] = React.useState([]);
    const [selectedIngredients, setSelectedIngredients] = React.useState([]);
    const [generatedRecipe, setGeneratedRecipe] = React.useState(null);
    const [cookies, setCookies] = useCookies(['access_token']);
    const snap = useProxy(state);
    const navigate = useNavigate();
    const userId = useGetUserId();

    const getAllIngredients = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/ingredients');
            snap.ingredients = data;
            setIngredients(data);
        } catch (error) {
            console.log(error);
        }
    };

    const createRecipe = async () => {
        try {
            await axios.post('http://localhost:3001/recipes',
            { ...generatedRecipe }, { headers: { authorization: cookies.access_token } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const generateRecipe = async () => {
        try {
            const { data } = await axios.post('http://localhost:3001/generate-recipe',
            { ingredients: selectedIngredients }, { headers: { authorization: cookies.access_token } });
            console.log(data.prompt)
            setGeneratedRecipe({ name: data.prompt.title,
                description: data.prompt.description,
                ingredients: data.prompt.ingredients,
                instructions: data.prompt.instructions,
                imageUrl: data.image_url,
                cookingTime: data.prompt.cookingTime,
                userOwner: userId });

        } catch (error) {
            console.log(error);
        }
    };

    const handleSelection = (e, value) => {
        e.preventDefault();
        setSelectedIngredients(() => [...value]);
    };

    useEffect(() => {
        getAllIngredients();
        console.log(generatedRecipe)
    }, [generatedRecipe]);

    return (
        <div className={style.createRecipeWrapper}>
            {ingredients.length > 0 && <div className={style.createRecipeContainer}>
               <Stack spacing={3} sx={{ width: 500 }}>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={ingredients}
                        getOptionLabel={(option) => option.ingredient}
                        filterSelectedOptions
                        onChange={(e, value) => handleSelection(e, value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selected ingredients"
                                placeholder="Select ingredients..."
                            />
                        )}
                    />
                </Stack>
                <div className={style.centerdBtn}>
                    { generatedRecipe
                    ? <Button variant="contained" onClick={createRecipe}>Save Recipe</Button>
                    : <Button variant="contained" onClick={generateRecipe}>Generate Recipe</Button> }
                </div>
            </div>}
        </div>
    );
}

export default CreateRecipe;