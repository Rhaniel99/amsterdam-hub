import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import "./style.css";
function Movie(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovie (){
            await api.get(`movie/${id}`, {
                params: {
                    api_key: "21e05b16cc4230db64212138922c0de0",
                    language: "pt-BR",
                }
            }).then((response) => {
                setMovie(response.data);
                setLoading(false);
            }).catch(() => {
                console.log("Filme não encontrado!");
                navigate("/", { replace: true });
                return;
            });
        }
        loadMovie();
        return()=>{
            console.log("Componente foi desmontado");
        }
    }, [navigate, id]);

    if(loading){
        return(
            <div className="movie-info">
                <h2>Carregando detalhes...</h2>
            </div>
        );
    }

    function saveMovie(){
        const myList = localStorage.getItem("@primefilmesrhans");
        let moviesSaves = JSON.parse(myList) || [];
        const hasMovie = moviesSaves.some((movieSave) => movieSave.id === movie.id);
        if(hasMovie){
            alert("Esse filme já está na lista");
            return;
        }
        moviesSaves.push(movie);
        localStorage.setItem("@primefilmesrhans", JSON.stringify(moviesSaves));
        alert("Filme salvo com sucesso");
    }

    return (
        <div className="movie-info">
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>
            <strong>Avaliação: {movie.vote_average} | Total de votos: {movie.vote_count}</strong>

            <div className="area-buttons">
                <button onClick={saveMovie}>Salvar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>
                    Trailer
                    </a>
                    </button>
            </div>
        </div>
    )
}

export default Movie;