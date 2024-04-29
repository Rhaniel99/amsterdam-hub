import GlobalStyle from './styles/global';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
function App() {
  return (
  <>
  <ToastContainer auytoClose={3000}  position="toast.POSITION.BOTTOM_LEFT" />
  <GlobalStyle />
  </>
  );
}

export default App;
