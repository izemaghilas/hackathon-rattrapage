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


const EventList:FC = () => {
  // change navbar title
  useTitle("Évènements");

  const navigate = useNavigate();
  const handleAddEvent = () => navigate("/dashboard/add-event");

const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
    const api = useApi();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.getEvents();
            setEvents(response?.data as never[]);
          } catch (error) {
            console.error(error);
          }
        };

      fetchData();
      console.log(event)
    }, []); 


  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Recherche d'un évènement..." />
        <Button variant="contained" onClick={handleAddEvent}>
          Ajouter un Évènement
        </Button>
      </StyledFlexBox>

      <CustomTable columnShape={UserListColumnShape} data={userListFakeData} />
    </Box>
  );
};

export default EventList;
