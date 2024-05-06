import React, { Component } from 'react';

class Equipe extends Component{
  render(){
    return(
      <div>
        <Sobre {...this.props}/>
        <hr/>
      </div>
    )
  }
}

class Sobre extends Component {
  render() {
    return (
      <div>
        <h2> Ola sou o {this.props.nome} </h2>
        <h3> Cargo:  {this.props.cargo} </h3>
        <h3> Idade:  {this.props.idade} anos</h3>
      </div>
    )
  }
}

// const Social = (props) => {
//   return(
//     <div>
//       <a>Facebook</a>    
//       <a>Linkedin</a>    
//     </div>
//   )
// }
 
function App() {
  return (
  <div>
    <h1>Conheça nossa equipe: </h1>
    <Equipe nome="Rhans" cargo="Desenvolvedor" idade="22"/>
  </div>
  )
}

export default App;