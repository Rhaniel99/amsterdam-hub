import React, { Component } from 'react';

class Membros extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: props.nome
        };
        this.entrar = this.entrar.bind(this)

    }

    entrar(nome){
        let state = this.state;
        state.nome = nome;
        this.setState(state);
    }

    render() {
        return (
            <div>
                <h1>Bem vindo: {this.state.nome}</h1>
                <button onClick={() => this.entrar('Rhanis')}>
                    Entrar como Rhanis
                </button>
                <button onClick={() => this.setState({ nome : ''}) }>
                    Sair
                </button>
            </div>
        );
    }
}


export default Membros;