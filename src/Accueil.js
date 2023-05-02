//Page d'accueil permettant d'ajouter et de créer des évènements
//Progression: Page fonctionne on peut modifier, créer et même 
//supprimer des évènements et manque plus qu'à créer la liaison avec l'API
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, TextField, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, FormGroup } from '@mui/material';
import '@mui/material/styles';
import LogUp from './LogUp';
import Menu from './Menu';
import { CheckBox } from '@mui/icons-material';


moment.locale('fr');

const localizer = momentLocalizer(moment);
//Page d'accueil du projet, dès qu'un utilisateur se connecte, l'application affiche 
// le calendrier vierge et il pourra saisir des évènements tels que des matchs ou des 
// entraînements
//Il pourra même gérer son équipe, c'est-à-dire qui sont les joueurs (ajouter, supprimer et modifier)
//pour qu'ils puissent recevoir une notification concernant le match ou l'entraînement.
function App() {
  const [events, setEvents] = useState([
    {
      start: new Date(),
      end: new Date(),
      title: 'Un événement'
    }
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [isAllDay, setIsAllDay] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

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

  const handleSaveEvent = () => {
    const newEvent = { title, start, end };

    if (selectedEvent) {
      const index = events.indexOf(selectedEvent);
      setEvents([...events.slice(0, index), newEvent, ...events.slice(index + 1)]);
    } else {
      setEvents([...events, newEvent]);
    }

    setSelectedEvent(null);
    setModalIsOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div class="Calendar">
        <div class="card">
            <Menu/>
            <Calendar
                localizer={localizer}
                events={events}
                on
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleCreateEvent} />
            <Modal
                open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                aria-labelledby={selectedEvent ? 'Modifier un événement' : 'Créer un événement'}
            >
                <div className="modal-wrapper">
                    <div className="modal">
                        <h2 id="modal-title">{selectedEvent ? 'Modifier un événement' : 'Créer un événement'}</h2>
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
                          value={moment(end).format('YYYY-MM-DDTHH:mm')}
                          onChange={(event) => setEnd(new Date(event.target.value))}
                          fullWidth
                          margin="normal"
                          InputLabelProps={{ shrink: true }} />
                        <div class="checkbox">
                          <FormGroup>
                        <FormControl control={<CheckBox defaultChecked />} label="Match" />
                        <FormControl required control={<Checkbox/>} label="Entraînement" />
                        </FormGroup>
                        </div>                      
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