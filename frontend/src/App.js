import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/Navbar";
import { Tabela } from "./components/Tables";
import { Button, Alert } from "react-bootstrap";
import Global from "./styles/global.js";

function App() {
  return (
    <>
      <Global />
      <div className="App">
          <NavBar />
          <Tabela />
      </div>
    </>
  );
}

export default App;
