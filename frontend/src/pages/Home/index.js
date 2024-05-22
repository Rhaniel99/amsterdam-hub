import { Link } from 'react-router-dom';
function Home(){
    return (
        <div>
            <h1>Home</h1>
            <hr/>
            <Link to="/produto/1234">Acessar o produto 1234</Link>
            <br/>
        </div>
    )
}

export default Home;