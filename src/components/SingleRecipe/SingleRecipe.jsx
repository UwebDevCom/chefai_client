import React, { useEffect, useState } from 'react';
import style from './SingleRecipe.module.scss';

import RecipeHeader from './RecipeHeader';

function SingleRecipe({ recipe, randomizeSize }) {
    const [img, setImg] = useState(null);

    useEffect(() => {
        try {
            setImg(require('../../assets/' + (recipe.name).replaceAll(' ', '_').replaceAll(',', '') + '.jpg'));
        } catch (error) {
            console.log(error);
            setImg(recipe.imageUrl);
        } finally {

        }
    }, [recipe]);

    return (img && <div style={{ backgroundImage: `url(${img})`, gridColumn: 'span ' + randomizeSize, gridRow: 'span ' + randomizeSize }} className={style.container}>
        <RecipeHeader title={recipe.name} />
    </div>);
}

export default SingleRecipe;