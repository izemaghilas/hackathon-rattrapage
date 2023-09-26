import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlexBox from "../../components/FlexBox";
import useTitle from "../../hooks/useTitle";
import useApi from "../../hooks/useApi";
import CustomTable from "../../components/trainingManagement/CustomTable";
import TrainingListColumnShape from "../../components/trainingManagement/columnShape";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../constants";

const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
    justifyContent: "flex-end",
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

const TrainingList: FC = () => {
    useTitle("Formations");

    const api = useApi();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        if (user?.role === ROLES.admin) {
            api.getTrainings()
                .then((res) => {
                    setTrainings(res.data as any);
                })
                .catch(() => {});
        } else {
            api.getUserTrainings()
                .then((res) => {
                    setTrainings(res.data as any);
                })
                .catch(() => {});
        }
    }, []);

    const handleAddTraining = () => navigate("/dashboard/add-training");

    return (
        <Box pt={2} pb={4}>
            <StyledFlexBox>
                <Button
                    sx={{ backgroundColor: "#282B2A" }}
                    variant="contained"
                    onClick={handleAddTraining}
                >
                    Ajouter une Formation
                </Button>
            </StyledFlexBox>

            <CustomTable
                columnShape={TrainingListColumnShape(
                    user?.role === ROLES.admin
                )}
                data={trainings}
            />
        </Box>
    );
};

export default TrainingList;
