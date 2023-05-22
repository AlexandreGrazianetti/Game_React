//page pour créer son compte utilisateur
//Progression : Créé fonctionne mais manque juste la connexion à l'API
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//Importation de la bibliothèque javascript pour effectuer des appels HTTP
import axios from 'axios';
import { WidthFullOutlined, WidthNormal } from "@mui/icons-material";

function LogUp(props) {
  const [type, setType] = useState(null);
  const [teams, setTeams] = useState(null);
  const [formData, setFormData] = useState(null);

  const navigate = useNavigate();

    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });     
    }

    useEffect(() => {
      axios.get("https://localhost:5001/api/teams",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      }).then((response) => {
        setTeams(response.data)
      })
    }, [])

    const onSubmit = (e) => {
      e.preventDefault();
      axios.post("https://localhost:5001/auth/signup", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      }).then(() => {
        navigate("login");
      }).catch((error) => {
        console.log(error)
      })
    }

      return (
        <body >
          <div className="LogUp" > 
            <form class="card" onSubmit={(event)=> onSubmit(event)}>
              <h1 >Inscription</h1>
              <h3 >Votre Email :</h3>
              <div class="form-input-login">
                <TextField name="email" onChange={(e) => handleChange(e)} id="outlined-basic" label="Email" variant="outlined" />
              </div>
              <h3 >Votre Nom :</h3>
              <div class="form-input">
                <TextField name="name" onChange={(e) => handleChange(e)} type="outlined-basic" id="outlined-basic" label="Nom" variant="outlined" />
              </div>   
              <h3 >Votre Prénom :</h3>
              <div class="form-input-login">
                <TextField name="nickname" onChange={(e) => handleChange(e)} type="outlined-basic" id="outlined-basic" label="Prénom" variant="outlined" />
              </div>     
              <h3 >Veuillez saisir un mot de passe :</h3>
              <div class="form-input-login">
                <TextField name="password" onChange={(e) => handleChange(e)} type="password" id="outlined-basic" label="Mot de passe" variant="outlined" />
              </div>
              <h3 >Veuillez confirmer votre mot de passe :</h3>  
              <div class="form-input-login">
                <TextField name="password" onChange={(e) => handleChange(e)} type="password" id="outlined-basic" label="Mot de passe" variant="outlined" />
              </div>

              <h3>Etes-vous un joueur ou un coach :</h3>
              <FormControl className="select-role">
                <InputLabel id="type-label">Type</InputLabel>
                <Select name="role"
                    labelId="type"
                    label="Type"
                    onChange={(e) => handleChange(e)}
                  >
                    <MenuItem id={1} value={"Coach"}>Coach</MenuItem>
                    <MenuItem id={2} value={"Joueur"}>Joueur</MenuItem>
                  </Select>
              </FormControl>

              <h3>Dans quelle équipe faites-vous partie:</h3>
              <FormControl className="select-role">
                <InputLabel id="type-label">Équipe</InputLabel>
                <Select name="teamId" onChange={(e) => handleChange(e)}>
                {
                      teams?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.teamId}>{item.name}</MenuItem>
                        )
                      })
                    }
                </Select>
              </FormControl>
              <div class="subscribe-logup-buttons">
              <Button variant="outlined" color="inherit" type="submit">Enregistrer</Button>
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