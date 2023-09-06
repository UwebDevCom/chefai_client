import style from './Navbar.module.scss';
// import searchIcon from '../../assets/search-icon.svg';
// import plusIcon from '../../assets/plus-icon.svg';
// import likeIcon from '../../assets/like-icon.svg';
import CreateRecipe from '../../pages/CreateRecipe/CreateRecipe';
import { motion } from 'framer-motion';
// import { NavLink } from 'react-router-dom';
import { state } from "../../store";
import { useProxy } from "valtio/utils";

function Navbar() {
    const snap = useProxy(state);

    return (<motion.nav initial={{ y: 300, x: '-50%', opacity: 0, scale: 0.5 }} animate={{ y: -300, x: '-50%', opacity: 1, scale: 1, boxShadow: '0 0 1000px 300px rgb(0,0,0)' }} transition={{ duration: 0.8, ease: 'easeOut' }} className={style.navContainer}>
        {/* <div className={style.createRecipeContainer}> */}
        {/* <NavLink to="/create-recipe" className={style.createRecipeBtn}><img className={style.green} src={plusIcon} alt='create recipe icon' /></NavLink>
            <NavLink to="/saved-recipe" className={style.createRecipeBtn}><img className={style.pink} src={likeIcon} alt='create recipe icon' /></NavLink> */}
        {/* </div> */}
        {snap.recipes?.length && <CreateRecipe />}
        {/* <form className={style.searchForm}>
            <input className={style.searchInput} type="text" id="search" placeholder="Search..." />
            <button className={style.searchBtn}>
                <img src={searchIcon} alt="search icon" />
            </button>
        </form> */}
    </motion.nav>);
}

export default Navbar;