import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { Icon } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Menu() {
  const [value, setValue] = React.useState(0);

  return (
    
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
           <BottomNavigationAction label="Accueil" component={Link} to="/Accueil" icon={<HomeIcon />} />
           <BottomNavigationAction component={Link} to="/PlayerList"  label="Joueurs" icon={<GroupsTwoToneIcon />}  />
           <BottomNavigationAction label="Paramètres" icon={<SettingsIcon />} />
           <BottomNavigationAction label="Ajouter un Joueur" component={Link} to="/CreatePlayer" icon={<PersonAddIcon/>}/>
          </BottomNavigation>
        </Box>
  );
}