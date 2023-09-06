import style from './SingleRecipe.module.scss';

function RecipeHeader({ title }) {
    const emojis = ['😋', '😍', '😎', '😇', '🤑', '👃', '👑', '🌿'];

    return (<div className={style.recipeHeader}>
        <span>{title}<span className={style.emoji}>{emojis[Math.floor(Math.random() * emojis.length)]}</span></span>
    </div>);
}

export default RecipeHeader;