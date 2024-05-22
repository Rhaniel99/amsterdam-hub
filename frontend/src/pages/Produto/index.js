import {useParams} from 'react-router-dom';

function Produto(){
    const {id} = useParams();

    return (
        <div>
            <h1>PAGINA DO PRODUTO</h1>
            <span> Meu produto é {id}</span>
            <br/>
        </div>
    )
}

export default Produto;