import React from 'react';
import style from './SingleRecipe.module.scss';
import demoRecipe from '../../assets/example-recipe.jpg'

function SingleRecipe({recipe}) {

    return ( <div style={{backgroundImage: `url(${demoRecipe})`}} className={style.container}>{ }</div> );
}

export default SingleRecipe;