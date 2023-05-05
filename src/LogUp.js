//page pour créer son compte utilisateur
//Progression : Créé fonctionne mais manque juste la connexion à l'API
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
function LogUp(props) {

    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });     
    }

    const onSubmit = () => {
      console.log('submit')
    }
  
    const [formData, setFormData] = useState({email:'',password:''})
      return (
        <body >
          <div className="LogUp" > 
            <form class="card" onSubmit={(event)=> onSubmit(event)}>
              <h1 >Inscription</h1>
              <h3 >Votre Email :</h3>
              <div class="form-input-login">
                <TextField id="outlined-basic" label="Email" variant="outlined" />
              </div>
              <h3 >Votre Nom :</h3>
              <div class="form-input">
                <TextField type="outlined-basic" id="outlined-basic" label="Nom" variant="outlined" />
              </div>   
              <h3 >Votre Prénom :</h3>
              <div class="form-input-login">
                <TextField type="outlined-basic" id="outlined-basic" label="Prénom" variant="outlined" />
              </div>  
              <h3 >Votre nom d'utilisateur:</h3>
              <div class="form-input-login">
                <TextField type="tel" id="outlined-basic" label="Nom d'utilisateur" variant="outlined" />
              </div>   
              <h3 >Veuillez saisir un mot de passe :</h3>
              <div class="form-input-login">
                <TextField type="password" id="outlined-basic" label="Mot de passe" variant="outlined" />
              </div>
              <h3 >Veuillez confirmer votre mot de passe :</h3>  
              <div class="form-input-login">
                <TextField type="password" id="outlined-basic" label="Mot de passe" variant="outlined" />
              </div>
              <div class="subscribe-logup-buttons">
              <Button variant="outlined" color="inherit">Enregistrer</Button>
              </div> 
              <h3>Si vous avez déjà un compte, Connectez-vous :</h3>
                <div class="lien-inscription">
                  <Button variant="outlined" component={Link} to="/LogIn">Se connecter</Button>             
                </div>
            </form>
          </div>
        </body>
      );
    }
    export default LogUp;