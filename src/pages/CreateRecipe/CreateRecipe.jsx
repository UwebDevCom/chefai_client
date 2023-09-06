import React, { useEffect, useRef } from 'react';
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
import spinner from '../../assets/spinner.gif';
import Recipe from '../Recipe/Recipe';
import jsPDF from 'jspdf';

// https://chef-ai-sxiz.onrender.com
const path = 'http://localhost:3001'

function CreateRecipe() {
    const [ingredients, setIngredients] = React.useState([]);
    const [selectedIngredients, setSelectedIngredients] = React.useState([]);
    const [generatedRecipe, setGeneratedRecipe] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [cookies, setCookies] = useCookies(['access_token']);
    const snap = useProxy(state);
    const navigate = useNavigate();
    const userId = useGetUserId();
    const reportTemplateRef = useRef(null);
    const [isPrint, setIsPrint] = React.useState(false);

    const getAllIngredients = async () => {
        try {
            const { data } = await axios.get(path + '/ingredients');
            snap.ingredients = data;
            setIngredients(data);
        } catch (error) {
            console.log(error);
        }
    };

    const createRecipe = async () => {
        setIsPrint(true);
        const doc = new jsPDF({
            format: 'a4',
            unit: 'px',
        });

        await doc.html(reportTemplateRef.current, {
            async callback(doc) {
                console.log(reportTemplateRef.current)
                await doc.save(generatedRecipe.name);
            },
        });
        setIsPrint(false);
        // try {
        //     await axios.post(path + '/recipes',
        //         { ...generatedRecipe }, { headers: { authorization: cookies.access_token } });
        //     setGeneratedRecipe(null);
        //     navigate('/');
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const generateRecipe = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(path + '/generate-recipe',
                { ingredients: selectedIngredients }, { headers: { authorization: cookies.access_token } });
            setGeneratedRecipe({
                name: data.prompt.title,
                description: data.prompt.description,
                ingredients: data.prompt.ingredients,
                instructions: data.prompt.instructions,
                imageUrl: data.image_url,
                cookingTime: data.prompt.cookingTime,
                userOwner: userId
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);

        } finally {
            setIsLoading(false);
        };
    };

    const handleSelection = (e, value) => {
        e.preventDefault();
        setSelectedIngredients(() => [...value]);
    };

    useEffect(() => {
        getAllIngredients();
    }, [generatedRecipe]);

    const PrintEl = () => (<div style={{ margin: 30, width: '80%' }}>
        <h4>{generatedRecipe.name}</h4>
        <p style={{ fontSize: 10 }}>{generatedRecipe.description}</p>
        <h5>Ingredients</h5>
        <ul>
            {generatedRecipe.ingredients.map((ingredient, index) => <li style={{ fontSize: 10 }} key={index}>{ingredient}</li>)}
        </ul>
        <h5>Instructions</h5>
        <ol>
            {generatedRecipe.instructions.split('\n').map((instruction, index) => <li style={{ fontSize: 10 }} key={index}>{instruction.split('. ')[1]}</li>)}
        </ol>

    </div>)

    return (
        <div className={style.createRecipeWrapper}>
            {ingredients.length > 0 && <div className={style.createRecipeContainer}>

                {!isLoading ? <>
                    {!generatedRecipe && <h2 className={style.headline}>Generate Recipe Now</h2>}
                    {!generatedRecipe && <Stack spacing={3}>
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
                                    label="Select ingredients"
                                    placeholder="Select ingredients..."
                                />
                            )}
                        />
                    </Stack>}
                </> : <>
                    <h2 className={style.headline}>Generating...</h2><div style={{ textAlign: 'center' }} className={style.loader}><img src={spinner} alt="spinner" /></div>
                </>}
                <div className={style.centerdBtn}>
                    {!isLoading && (generatedRecipe
                        ? <>
                            <Recipe recipe={generatedRecipe} />
                            <div style={{ height: 0 }} ref={reportTemplateRef}>
                                {isPrint && <PrintEl />}
                            </div>
                            <div className={style.buttonsContainer}>
                                <Button style={{ marginTop: 20 }} className={style.primaryBtn} variant="contained" onClick={createRecipe}>Save Recipe(PDF)</Button>
                                <button className={style.secondBtn} onClick={() => { setGeneratedRecipe(null); navigate('/') }}>Back</button>
                            </div>
                        </>
                        : selectedIngredients.length > 1 && <Button className={style.primaryBtn} onClick={generateRecipe}>😋 Generate Recipe </Button>)}
                </div>
                {selectedIngredients.length <= 1 && <div className={style.warning}>Please select at least 2 ingredients</div>}
            </div>}
        </div>
    );
}

export default CreateRecipe;