//Page d'accueil permettant d'ajouter et de créer des évènements
//Progression: Page fonctionne on peut modifier, créer et même 
//supprimer des évènements et manque plus qu'à créer la liaison avec l'API pour que la personne qui se connecte à son comtpe puisse retrouver tout ce qu'il a créer
//c'est à dire les évnèments créés, la liste de ses joueurs.
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, TextField, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, FormGroup } from '@mui/material';
import '@mui/material/styles';
import LogUp from './LogUp';
import Menu from './Menu';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import { CheckBox, Label, Sports } from '@mui/icons-material';
import SportsIcon from '@mui/icons-material/Sports';
//Importation de la bibliothèque javascript pour effectuer des appels HTTP
import axios from 'axios';



moment.locale('fr');
const localizer = momentLocalizer(moment);
//Page d'accueil du projet, dès qu'un utilisateur se connecte, l'application affiche 
// le calendrier vierge et il pourra saisir des évènements tels que des matchs ou des 
// entraînements
//Il pourra même gérer son équipe, c'est-à-dire qui sont les joueurs (ajouter, supprimer et modifier)
//pour qu'ils puissent recevoir une notification concernant le match ou l'entraînement.
function App() {
  //Fonction permettant d'afficher un message lorsque l'on survole un élément avec la souris

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const [events, setEvents] = useState([
    {
      eventId: 1,
      start: new Date(),
      end: new Date(),
      title: 'Un événement'
    }
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [matches, setMatches] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setStart(event.start);
    setEnd(event.end);
    setModalIsOpen(true);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event !== selectedEvent));
    setSelectedEvent(null);
    setModalIsOpen(false);
  };

  const handleCreateEvent = ({ start, end }) => {
    setSelectedEvent(null);
    setTitle('');
    setStart(start);
    setEnd(end);
    setModalIsOpen(true);
  };

  useEffect(() => {
    axios.get("https://localhost:5001/api/match", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    }).then((res) => {
      setMatches(res.data)
    })
  }, [])

  const handleSaveEvent = () => {
    const newEvent = { title, start, end };

    if (selectedEvent) {
      const index = events.indexOf(selectedEvent);
      setEvents([...events.slice(0, index), newEvent, ...events.slice(index + 1)]);
    } else {
      setEvents([...events, newEvent]);
    }

    setSelectedEvent(null);
    console.log(type);

    // api call

     axios.post(type == 1 ? "https://localhost:5001/api/training" : "https://localhost:5001/api/match", {
      timeDebMatch: start,
      timeFinMatch: end,
      egalMatch: false,
      winMatch: false,
      loseMatch: false
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })

    setModalIsOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false)
  }

  function handleDateClick(date) {
    const eventType = window.prompt("Voulez-vous créer un match ou un entraînement ?");

    if (eventType === "match") {
      showMatchForm(date);
    } else if (eventType === "entraînement") {
      showTrainingForm(date);
    } else {
      window.alert("Type d'événement invalide");
    }
  }

  function showMatchForm(date) {
    setSelectedEvent(null);
    setTitle('');
    setStart(date);
    setEnd(date);
    setModalIsOpen(true);
  }

  function showTrainingForm(date) {
    setSelectedEvent(null);
    setTitle('');
    setStart(date);
    setEnd(date);
    setModalIsOpen(true);
  }

  return (
    <div className="Calendar">
      <div className="card">
        <Menu/>
        <Calendar
          localizer={localizer}
          events={matches == null ? events : matches}
          on
          startAccessor="timeDebMatch"
          titleAccessor="matchId"
          endAccessor="timeFinMatch"
          style={{ height: 500 }}
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleCreateEvent}
          onDateClick={handleDateClick}
        />
        <Modal
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          aria-labelledby={selectedEvent ? 'Modifier un événement' : 'Créer un événement'}
        >
          <div className="modal-wrapper">
            <div className="modal">
              <h2 id="modal-title">{selectedEvent ? 'Modifier un événement' : 'Créer un événement'}</h2>
              <FormControl fullWidth>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type"
                  label="Type"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem id={1} value={1}>Entraînement</MenuItem>
                  <MenuItem id={2} value={2}>Match</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="event-title"
                label="Titre"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
                margin="normal" />
              <TextField
                id="event-start"
                label="Début"
                type="datetime-local"
                value={moment(start).format('YYYY-MM-DDTHH:mm')}
                onChange={(event) => setStart(new Date(event.target.value))}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }} />
              <TextField
                id="event-end"
                label="Fin"
                type="datetime-local"
                value={moment(start).format('YYYY-MM-DDTHH:mm')}
                onChange={(event) => setEnd(new Date(event.target.value))}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }} />
              <div className="modal-buttons">
                {selectedEvent && (
                  <Button color="error" variant="contained" onClick={handleDeleteEvent}>
                    Supprimer
                  </Button>
                )}
                <Button color="primary" variant="contained" onClick={handleSaveEvent}>
                  Sauvegarder
                </Button>
                <Button color="error" variant="contained" onClick={() => closeModal()}>
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
export default App;