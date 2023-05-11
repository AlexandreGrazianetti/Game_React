import React, { useState } from 'react';
import {Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";

//Importation de la bibliothèque javascript pour effectuer des appels HTTP
import axios from 'axios';


const PlayerForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [teamplayer, setTeamPlayer] = useState ('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitted: ${firstName} ${lastName}, born on ${birthdate}, phone number ${phoneNumber}`);
  };

  return (
    <div class="LogIn">
        <div class="card">
            <form onSubmit={handleSubmit}>
                <h3>Ajouter un joueur dans l'équipe !!</h3>
                <h4> Toutes les champs affichés doivent être <i>OBLIGATOIREMENT</i> rempli</h4>
                <label>
                    <h3>Prénom du Joueur :</h3>
                    <TextField id="outlined-basic" label="Prénom" variant="outlined" />
                </label>
                <br />
                <label>
                    <h3>Nom du Joueur :</h3>
                    <TextField id="outlined-basic" label="Nom" variant="outlined" />
                </label>
                <br />
                <label>
                    <h3>Date de Naissance du Joueur :</h3>
                    <TextField id="outlined-basic" label="Date de Naissance" variant="outlined" />
                </label>
                <br />
                <label>
                <h3>Numéro de téléphone du Joueur :</h3>
                    <TextField id="outlined-basic" label="Numéro de téléphone" variant="outlined" />
                </label>
                <label>
                <h3>Numéro de licence du Joueur :</h3>
                    <TextField id="outlined-basic" label="Numéro de licence" variant="outlined" />
                </label>
                <br/>
                <br/>
                <Button variant="outlined">Enregistrer</Button>
                <div style={{ marginLeft: '10px' }}><br/></div>
                <Button variant="outlined" component={Link} to="/PlayerList">Retour</Button>
            </form>
        </div>
    </div>
    
  );
};

export default PlayerForm;
