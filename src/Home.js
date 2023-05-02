import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

function Home() {
    const [loading,setLoading] = useState(true);
  useEffect(() => {
    // Simulate loading for 3 seconds
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      <h2>Bienvenue sur Game Day !</h2>
        <div class="wrapper" style={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress/>
            <span style={{ marginLeft: '1rem' }}>
            Veuillez patienter pour que l'application se charge ...
            </span>
        </div>
    </div>
  );
}

export default Home;
