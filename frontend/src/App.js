import GlobalStyle from './styles/global';
import { toast, ToastContainer } from "react-toastify";

import Form from "./components/Form/Form.js";
import Grid from "./components/Grid/Grid.js";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
      width: 100%;
      max-width: 800px;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
`;  

const Title = styled.h2``;

function App() {
  const [tools, setTools] =  useState([]);
  const [onEdit, setOnEdit] =  useState(null);

  const getTools = async () => {
    try{
      const res = await axios.get("http://localhost:6060/api/app/get-tools");
      setTools(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    }catch(err){
      toast.error(err);
    }
  };

  useEffect(() => {
    getTools();
  }, [setTools]);

  return (
    <>
    <Container>
        <Title>Cadastrar Ferramentas</Title>
        <Form getTools={getTools}/>
        <Grid tools={tools}/>
    </Container>
    <ToastContainer autoClose={3000} position="bottom-left"  />
    <GlobalStyle />
    </>
    );
  }

export default App;
