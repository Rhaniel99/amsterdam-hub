// https://api.themoviedb.org/3/movie/now_playing?api_key=21e05b16cc4230db64212138922c0de0&language=pt-BR
// BASE: https://api.themoviedb.org/3/

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

export default api;