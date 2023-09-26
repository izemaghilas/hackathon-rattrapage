import { Box, Button, styled } from "@mui/material";
import FlexBox from "../../components/FlexBox";
import SearchInput from "../../components/SearchInput";
import UserListColumnShape from "../../components/userManagement/columnShape";
import CustomTable from "../../components/userManagement/CustomTable";
import { userListFakeData } from "../../components/userManagement/fakeData";
import useTitle from "../../hooks/useTitle";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import AddNewEvents from "./AddNewEvents";
import  EventListColumnShape from "../../components/events/columnShapeEvents";

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
  // Change le titre de la navbar
  useTitle("Évènements");

  const api = useApi();
  const navigate = useNavigate();
  const handleAddEvent = () => navigate("/dashboard/add-event");

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    api.getEvents()
      .then((response) => {
        setEvents(response.data as any);
        setFilteredEvents(response.data as any);
      });
  }, []);

  const handleSearch = (event: any) => {
    const searchValue = event.target.value;
    const filteredEvents = events.filter((event: any) => {
      // Remplacez les propriétés par celles correspondantes dans les données d'événement
      const eventName = event.title;
      return eventName.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredEvents(filteredEvents);
  };

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput onChange={handleSearch} placeholder="Recherche d'un évènement..." />
        <Button variant="contained" onClick={handleAddEvent}>
          Ajouter un Évènement
        </Button>
      </StyledFlexBox>

      <CustomTable columnShape={EventListColumnShape} data={filteredEvents} /> {/* Assurez-vous d'utiliser la colonne et la table correctes */}
    </Box>
  );
};

export default EventList;
