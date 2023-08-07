import { NavLink } from 'react-router-dom';
import style from './Header.module.scss';

function Header() {
    return ( <header className={style.container}>
        <div>
            <NavLink to={'/'} className={style.logo}>Chef Ai</NavLink>
        </div>
    </header>);
}

export default Header;