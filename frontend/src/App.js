import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './style.css';
function App() {
    const [tool, setTool] = useState([]);

    useEffect(() => {
        function loadTools(){
            let url = 'http://localhost:6060/api/app/get-tools';
            fetch(url)
            .then((r) => r.json())
            .then((json) => {
                setTool(json);
            })
        }
        loadTools();
    }, [])
    return (
        <div className="container"> 
            <header>
                <strong>Bem vindo</strong>
            </header>
            {tool.map((item) => {
                return(
                    <article key={item.id} className="post">
                        <strong className="titulo">{item.name}</strong>
                        <img src={item.iconUrl} alt={item.name} className="capa"/>
                        <p className="subtitulo">
                            {item.desc} 
                        </p>
                        <a className="botao">Acessar</a>
                    </article>
                )
            })}
        </div>
    )
}

export default App;