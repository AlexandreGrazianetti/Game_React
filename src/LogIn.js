//page pour se connecter
//Progression : Créé fonctionne mais manque juste la connexion à l'API
import { Route } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import LogUp from "./LogUp";
import { Link, useNavigate } from "react-router-dom";


function LogIn(props) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({email:'',password:''})

  const onSubmit =(event)=> {
    event.preventDefault();
    

    axios.post("https://localhost:5001/auth/login", formData)
      .then((res) => {
            localStorage.setItem("access_token",res.data.token);
            navigate("/accueil")
      })
      .catch(()=> {
        console.log("Identifiants incorrects.");
      });
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    
  }

    return (
      <body >
          <div className="LogIn" >
            
            <form class="card" onSubmit={(event)=> onSubmit(event)}>
              <h1 >Connexion</h1>
              <div class="form-input-login">
                <TextField name="email" onChange={(event) => handleChange(event)} id="outlined-basic" label="Email" variant="outlined" />
              </div>
              <div class="form-input-login">
                <TextField name="password" onChange={(event) => handleChange(event)} type="password" id="outlined-basic" label="Password" variant="outlined" />
              </div>         
              <div class="login-buttons">
                <div class="subscribe-login-buttons">
                  <Button variant="outlined" color="inherit" type="submit">Connecter</Button>
                </div>                
              </div>  
              <h3>Si vous n'avez pas de compte, Inscrivez-vous :</h3>
                <div class="lien-inscription">
                  <Button variant="outlined" component={Link} to="/LogUp">S'inscrire</Button>             
                </div>
            </form>
          </div>
      </body>
    );
  }
  export default LogIn;
