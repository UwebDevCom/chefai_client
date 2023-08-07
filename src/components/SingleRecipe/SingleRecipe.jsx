import React, { useEffect, useState } from 'react';
import style from './SingleRecipe.module.scss';
import demoRecipe from '../../assets/example-recipe.jpg'

function SingleRecipe({ recipe }) {
    const [img, setImg] = useState(null);
    useEffect(() => {
        try {
            setImg(require('../../assets/' + recipe._id + '_img.jpg'));
        } catch (error) {
            console.log(error);
            setImg(demoRecipe);
        }
    }, [img]);

    return (img && <div style={{ backgroundImage: `url(${img})` }} className={style.container}>{ }</div>);
}

export default SingleRecipe;