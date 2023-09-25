import { Box, Button, styled } from "@mui/material";
import FlexBox from "../../components/FlexBox";
import SearchInput from "../../components/SearchInput";
import UserListColumnShape from "../../components/userManagement/columnShape";
import CustomTable from "../../components/userManagement/CustomTable";
import { userListFakeData } from "../../components/userManagement/fakeData";
import useTitle from "../../hooks/useTitle";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { set } from "nprogress";

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

const UserList: FC = () => {
  // change navbar title
  useTitle("Consultants");

  const api = useApi();

  const navigate = useNavigate();
  const handleAddUser = () => navigate("/dashboard/add-user");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.getUsers()
      .then((response) => {
        setUsers(response.data as any);
      });
  }, []);


  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Recherche d'un consultant..." />
        <Button variant="contained" onClick={handleAddUser}>
          Ajouter un Consultant
        </Button>
      </StyledFlexBox>

      <CustomTable columnShape={UserListColumnShape} data={users} />
    </Box>
  );
};

export default UserList;
