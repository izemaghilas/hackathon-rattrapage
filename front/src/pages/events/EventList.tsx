import { Box, Button, styled } from "@mui/material";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import FlexBox from "../../components/FlexBox";
import SearchInput from "../../components/SearchInput";
import EventListColumnShape from "../../components/events/columnShapeEvents";
import CustomTable from "../../components/userManagement/CustomTable";
import { ROLES } from "../../constants";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import { CalendarViewMonth } from "@mui/icons-material";
import CalendarView from "../../components/events/CalendarView";

// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  [theme.breakpoints.down(500)]: {
    width: "100%",
    "& .MuiInputBase-root": { maxWidth: "100%" },
    "& .MuiButton-root": {
      width: "100%",
      marginTop: 15,
    },
  },
}));

const EventList: FC = () => {
  useTitle("Evénements");
  const backToMenu = () => {
    navigate("/dashboard/event-list");
  };
  // Change le titre de la navbar
  <Link to="/dashboard/event-list">useTitle("Évènements")</Link>;

  const api = useApi();
  const navigate = useNavigate();
  const handleAddEvent = () => navigate("/dashboard/add-event");
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const fetchEvents = () => {
    api.getEvents().then((response) => {
      setEvents(response.data as any);
      setFilteredEvents(response.data as any);
    });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {}, [events]);

  const handleSearch = (event: any) => {
    const searchValue = event.target.value;
    const filteredEvents = events.filter((event: any) => {
      // Remplacez les propriétés par celles correspondantes dans les données d'événement
      const eventName = event.title;
      return eventName.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredEvents(filteredEvents);
  };

  // const handleDeleteEvent = (eventId: string) => {
  //     api.deleteEvent(eventId)
  //         .then(() => {
  //             setEvents((prevEvents) =>
  //                 prevEvents.filter((event) => event.id !== eventId)
  //             );
  //             setFilteredEvents((prevFilteredEvents) =>
  //                 prevFilteredEvents.filter((event) => event.id !== eventId)
  //             );
  //             toast.success("Événement supprimé avec succès");
  //         })
  //         .catch((error) => {
  //             toast.error("Erreur lors de la suppression de l'événement");
  //         });
  // };

  return (
    <Box pt={2} pb={4}>
      {user?.role === ROLES.admin && (
        <StyledFlexBox
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={handleAddEvent}
            sx={{
              backgroundColor: "#282B2A",
              ":hover": {
                backgroundColor: "#282B2A",
                opacity: 0.9,
              },
            }}
          >
            Ajouter un Évènement
          </Button>
        </StyledFlexBox>
      )}
      <CalendarView
        events={events}
        refreshEvents={() => {
          fetchEvents();
        }}
      />
      {/* <CustomTable
                columnShape={EventListColumnShape}
                data={filteredEvents}
            />{" "} */}
      {/* Assurez-vous d'utiliser la colonne et la table correctes */}
    </Box>
  );
};

export default EventList;
