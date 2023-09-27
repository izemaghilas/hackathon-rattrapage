import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { set } from 'nprogress';
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import toast from 'react-hot-toast';
import { ROLES } from '../../constants';
import { H4 } from '../../components/Typography';

const CalendarView = ({ events }: any) => {
    const [displayEventDetails, setDisplayEventDetails] = useState(false);
    const [clickedEvent, setClickedEvent] = useState({} as any);
    const api = useApi();
    const { user } = useAuth();
    console.log('clickedEvent', clickedEvent)

    let doesParticipate = clickedEvent?.participants?.filter((participant: any) => {
        return participant.id === user?.id;
    });
    console.log('txt', doesParticipate);

    const calendarEvents = events.map((event: any) => {
        return {
            id: event.id,
            title: event.title,
            start: event.startDate,
            end: event.endDate,
            allDay: false,
        };
    });

    const joinEvent = async () => {
        await api.joinEvent({ eventId: clickedEvent.id, userId: user?.id }).then((response) => {
            toast.success("Vous avez rejoint l'événement avec succès !");
        }).catch((error) => {
            console.log(error);
            toast.error("Erreur lors de la participation à l'événement");
        });
    }

    const EventDetails = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
                <Card sx={{ minWidth: 275, width: 450 }}>
                    <CardContent>
                        <div>
                            <Typography variant="h5" component="div">
                                {clickedEvent.title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="gray">
                                {clickedEvent.description}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.primary">
                                Début : {new Date(clickedEvent.startDate).toLocaleString('fr-FR', { timeZone: 'UTC' })}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.primary">
                                Fin : {new Date(clickedEvent.endDate).toLocaleString('fr-FR', { timeZone: 'UTC' })}
                            </Typography>
                        </div>
                        {user?.role === ROLES.admin && <div>
                            <Typography variant="h6" component="div">
                                Partcipants
                                {console.log(clickedEvent)}
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "1rem",
                                    }}
                                >
                                    {clickedEvent.participants.map((p: any) => (
                                        <div
                                            style={{
                                                backgroundColor: "#f5f5f5",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <Box padding={1} key={p.id}>
                                                <H4 fontWeight={100}>{`${p.firstname} ${p.lastname}`}</H4>
                                            </Box>
                                        </div>
                                    ))}
                                </div>
                            </Typography></div>}
                    </CardContent>
                    <CardActions>
                        {user?.role === ROLES.user && doesParticipate?.length == 0 && <Button onClick={joinEvent} size="small">Participer</Button>}
                    </CardActions>
                </Card>
            </div>
        );
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                locale={"fr"}
                height={550}
                aspectRatio={1.5}
                buttonText={{
                    today: "Aujourd'hui",
                    month: "Mois",
                    week: "Semaine",
                    day: "Jour",
                    list: "Liste",
                }}
                eventClick={(info) => {
                    setDisplayEventDetails(true);
                    const currentEvent = events.find((event: any) => event.id === info.event.id);
                    setClickedEvent(currentEvent);
                    doesParticipate = clickedEvent?.participants?.filter((participant: any) => {
                        return participant.id === user?.id;
                    });
                }}
                editable={true}
                eventDisplay='block'
                displayEventEnd={true}
                timeZone='UTC'
            />
            {displayEventDetails && <EventDetails />}
        </>
    );
};

export default CalendarView;