import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Menu from "./Menu";
import { TableCell, TableHead, TableRow, Button } from "@mui/material";
import { Link } from "react-router-dom";
const PlayersList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://mon-api.com/joueurs")
      .then((response) => response.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <div class="Calendar">
      <div class="card">
        <Menu/>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Liste des joueurs
            </Typography>
            <table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell align="right">Prénom</TableCell>
                <TableCell align="right">Date de naissance</TableCell>
                <TableCell align="right">Numéro de licence</TableCell>
                <TableCell align="right">Numéro de téléphone</TableCell>
              </TableRow>
            </TableHead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.id}>
                    <td>{player.nom}</td>
                    <td>{player.prenom}</td>
                    <td>{player.dateNaissance}</td>
                    <td>{player.numeroLicence}</td>
                    <td>{player.numeroTelephone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Button variant="outlined" component={Link} to="/CreatePlayer">Ajouter un Nouveau Joueur</Button>
      </div>
    </div>
  );
};

export default PlayersList;
