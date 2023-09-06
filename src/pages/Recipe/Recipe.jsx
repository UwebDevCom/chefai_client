import style from './Recipe.module.scss';

function Recipe({ recipe }) {
    const instructionsArray = recipe.instructions.split('\n');

    return (<div className={style.recipeContainer}>
        <div className={style.recipeHead}>
            <h2 className={style.title}>{recipe.name}</h2>
            <span className={style.cooktime}><span className={style.cooktimelabel}>🕑 Cooking time:</span> {recipe.cookingTime} <span>min</span></span>
        </div>
        <img className={style.recipeImg} src={recipe.imageUrl} alt={recipe.title} />
        <p className={style.description}>{recipe.description}</p>
        <ul className={style.instructionsList}>
            {instructionsArray.map((instruction, index) => <li key={index}>
                <div>
                    <span className={style.cookStep}>{instruction.split('. ')[0]}</span>
                    <span className={style.cookStepContent}>{instruction.split('. ')[1]}</span>
                </div>
                <div className={style.divider}></div>
            </li>)}
        </ul>
    </div>);
}

export default Recipe;