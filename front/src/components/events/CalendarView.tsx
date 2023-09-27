import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { set } from 'nprogress';

const CalendarView = ({ events }: any) => {
    const [displayEventDetails, setDisplayEventDetails] = useState(false);
    const [clickedEvent, setClickedEvent] = useState({} as any);

    const calendarEvents = events.map((event: any) => {
        return {
            id: event.id,
            title: event.title,
            start: event.startDate,
            end: event.endDate,
            allDay: false,
        };
    });

    const EventDetails = () => {
        return (
            <div style={{ display:'flex', justifyContent:'center', marginTop: 15 }}>
                <Card sx={{ minWidth: 275, width: 450 }}>
                    <CardContent>
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
                    </CardContent>
                    {/* <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions> */}
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
                }}
                editable={true}
                eventDisplay='block'
                displayEventEnd={true}
            />
            {displayEventDetails && <EventDetails />}
        </>
    );
};

export default CalendarView;