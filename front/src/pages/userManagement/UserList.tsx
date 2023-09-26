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
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    api.getUsersOnly()
      .then((response) => {
        setUsers(response.data as any);
        setFilteredUsers(response.data as any);
      });
  }, []);

  const handleSearch = (event: any) => {
    const searchValue = event.target.value;
    const filteredUsers = users.filter((user: any) => {
      const fullname = `${user.firstname} ${user.lastname}`;
      return fullname.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredUsers(filteredUsers);
  };


  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput onChange={handleSearch} placeholder="Recherche d'un utilisateur..." />
        <Button variant="contained" onClick={handleAddUser} style={{ backgroundColor: "black", color: "white" }}>
          Ajouter un Consultant 
        </Button>
      </StyledFlexBox>

      <CustomTable columnShape={UserListColumnShape} data={filteredUsers} />
    </Box>
  );
};

export default UserList;
