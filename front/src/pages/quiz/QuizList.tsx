import { Box, Button, Card, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { H4, H6 } from "../../components/Typography";
import useApi from "../../hooks/useApi";
import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../constants";
import FlexBox from "../../components/FlexBox";
import styled from "@emotion/styled";

// styled components

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

const QuizList: FC = () => {
    useTitle("Consulter Quiz");

    const api = useApi();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id: userId } = useParams<{ id: string }>();

    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        api.getUserQuiz(userId)
            .then((res) => {
                setQuiz(res.data);
            })
            .catch(() => {
                console.log("error");
            });
    }, []);

    const handleAddTraining = () => navigate("/dashboard/add-training");

    return (
        <Box pt={2} pb={4}>
            <Card sx={{ padding: 4 }}>
                {user?.role === ROLES.admin && (
                    <StyledFlexBox>
                        <Button
                            sx={{
                                backgroundColor: "#282B2A",
                                ":hover": {
                                    backgroundColor: "#282B2A",
                                    opacity: 0.9,
                                },
                            }}
                            variant="contained"
                            onClick={handleAddTraining}
                        >
                            Ajouter une Formation
                        </Button>
                    </StyledFlexBox>
                )}
                <Grid container spacing={3}>
                    <Grid item md={8} xs={12}>
                        <Card sx={{ padding: 3, boxShadow: 2 }}>
                            <Grid item md={8} xs={12}>
                                <H4>Résultats du Quiz</H4>
                            </Grid>

                            {!quiz ? (
                                <H6 sx={{ marginTop: "2rem" }}>
                                    Le consultant n'a pas encore répondu au quiz
                                </H6>
                            ) : (
                                <Grid
                                    sx={{ marginTop: "1px" }}
                                    container
                                    spacing={3}
                                >
                                    <Grid item sm={6} lg={12}>
                                        {(quiz as any).quiz.questions.map(
                                            (q: any) => (
                                                <Grid
                                                    sx={{ marginBlock: "2rem" }}
                                                    item
                                                    sm={6}
                                                    lg={12}
                                                >
                                                    <H4>{q.text}</H4>
                                                    <H4
                                                        sx={{
                                                            marginTop: "0.5rem",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {q.answer[0].answer}
                                                    </H4>
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                </Grid>
                            )}
                        </Card>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};

export default QuizList;
