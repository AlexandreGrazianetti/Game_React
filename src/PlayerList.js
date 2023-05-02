import { Link, Route, Routes } from 'react-router-dom';
import CreatePlayer from './CreatePlayer';
import { Button, Icon } from '@mui/material';
import { orange } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
function PlayerList(){  
  document.getElementById('myButton').addEventListener('click', function() {
    window.location.href = './CreatePlayer';
  });
  return(
  
  <div class="">
 /* A y rajouter avec un bouton qui nous amène directement sur la page pour ajouter un joueurs dans la liste*/
  <Button component ={Link} to="/CreatePlayer" id="AddButton" startIcon ={<AddIcon/>}>
  Ajouter Nouveau Joueur
  
  </Button>
  </div>
  );
}
export default PlayerList ;