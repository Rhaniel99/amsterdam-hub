
import { Link } from 'react-router-dom';
import './style.css';

function Header(){
    return (
        <header>
                <Link className="logo" to="/">Prime Filmes Rhans</Link>
                <Link className="favoritos" to="/favorite">Meus filmes</Link>
        </header>
    )
}

export default Header;