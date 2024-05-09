import React, { Component } from 'react';
class App extends Component{
    constructor (props) {
        super(props);
        this.state = {

        }
        this.frases = ['O riso é a menor distância entre duas pessoas.', 
        'Deixe de lado as preocupações e seja feliz.',
        'Realize o óbvio, pense no improvável e conquiste o impossível.',
        'Acredite em milagres, mas não dependa deles.',
        'A maior barreira para o sucesso é o medo do fracasso.'];

    }

    render () {
        return (
            <div>
              <img src={require('./assets/cinema.jpg')} />
              <Botao />
              <h3>Filme número 1 aleatorio</h3>
            </div>
        )
    }
}

class Botao extends Component {

    render () {
        return (
            <div>
              <button>Abrir o filme</button>
            </div>
        )
    }      
}

export default App;