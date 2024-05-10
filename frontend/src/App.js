import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {

    const [tarefas, setTarefas] = useState(() => {
        const tarefasArmazenadas = localStorage.getItem('tarefas');
        return tarefasArmazenadas ? JSON.parse(tarefasArmazenadas) : [];
    });

    const [input, setInput] = useState('');
    // Quando não há parametros, é executado assim que carrega a tela
    useEffect(() => {
        const tarefasStorage = localStorage.getItem('tarefas');
        if(tarefasStorage){
            setTarefas(JSON.parse(tarefasStorage));
        }
    }, [])
    // Quando há alteração na state abaixo: 
    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }, [tarefas])

    // não executa toda vez o bloco quando há alteração
    const totalTarefas = useMemo(() => tarefas.length, [tarefas]);

    // retorna uma função que é melhor para quando tem algo que precise de muito processamento.
    const handleAdd = useCallback(() => {
        setTarefas([...tarefas, input])
        setInput('');
    }, [tarefas, input])

    return (
        <div>
            <ul>
                {tarefas.map(tarefa => 
                <li key={tarefa}>{tarefa}</li>
                )}
            </ul>
            <br/>
            <strong>{totalTarefas} tarefas</strong><br/>
            <input type="text" value={input} onChange={e => setInput(e.target.value) } />
            <button onClick={handleAdd}>Adicionar </button>
        </div>
    )
}

export default App;