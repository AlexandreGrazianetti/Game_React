import React, { useState } from 'react';

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
                    Prénom:
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <br />
                <label>
                    Nom :
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
                <br />
                <label>
                    Date de naissance:
                    <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                </label>
                <br />
                <label>
                    Numéro de téléphone:
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </label>
                <br />
                <label>
                    Équipe :
                    <select value={teamplayer} onChange={(e)=> setTeamPlayer(e.target.value)}>

                    </select>
                </label>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    </div>
    
  );
};

export default PlayerForm;
