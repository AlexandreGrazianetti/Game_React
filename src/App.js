import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogIn from './LogIn';
import LogUp from './LogUp';
import Accueil from'./Accueil';
import Home from './Home';
import CreatePlayer from './CreatePlayer';
import PlayerList from './PlayerList';
import { Navigate } from 'react-router-dom';
import { Base64 } from 'js-base64';


function isTokenExpired(token) {
  try {
    // Décoder le token pour récupérer les données de payload
    const payload = JSON.parse(Base64.decode(token.split(".")[1]));
    // Récupérer la propriété 'exp' qui contient un timestamp
    const expiresAt = payload.exp;
    // Transformer le timestamp en date
    const expirationDate = new Date(expiresAt * 1000);
    // Vérifier si la date d'expiration est supérieure à l'heure actuelle
    return expirationDate < new Date();
  } catch (err) {
    console.error(err);
    return true;
  }
}
function ProtectedRoute ({children}){

  const token = localStorage.getItem("access_token");
  
  if (token == null || isTokenExpired(token)){
    return(<Navigate to="/login"></Navigate>)
  }
  return children;
}

function App() {
  const disconnect = () => {
    localStorage.removeItem("access_token");
  }

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/LogIn" element= {<LogIn/>}/>
        <Route path="/LogUp" element= {<LogUp/>}/>
        <Route path="/Accueil" element={<Accueil/>}/>     
        <Route path="/Home" element={<Home/>}/>
        <Route path='/CreatePlayer' element={<CreatePlayer/>}/>
        <Route path="/PlayerList" element={<PlayerList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
