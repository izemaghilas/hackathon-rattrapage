import styled from "@emotion/styled";
import { Box, Button, Card, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlexBox from "../../components/FlexBox";
import useTitle from "../../hooks/useTitle";
import useApi from "../../hooks/useApi";
import CustomTable from "../../components/trainingManagement/CustomTable";
import TrainingListColumnShape from "../../components/trainingManagement/columnShape";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../constants";
import { H1, H4 } from "../../components/Typography";
import LightTextField from "../../components/LightTextField";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";

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
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        if (user?.role === ROLES.admin) {
            api.getTrainings()
                .then((res) => {
                    setTrainings(res.data as any);
                })
                .catch(() => {});
        } else {
            if (user?.quizCompleted) {
                api.getUserTrainings()
                    .then((res) => {
                        setTrainings(res.data as any);
                    })
                    .catch(() => {});
            } else {
                api.getQuizs()
                    .then((res) => {
                        setQuiz(res.data[0]);
                    })
                    .catch(() => {});
            }
        }
    }, []);

    const handleAddTraining = () => navigate("/dashboard/add-training");

    if (user?.role === ROLES.user && !user?.quizCompleted && quiz != null) {
        return (
            <Quiz
                quiz={quiz}
                onCompleted={() => {
                    location.reload();
                }}
            />
        );
    }

    return (
        <Box pt={2} pb={4}>
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

            <CustomTable
                columnShape={TrainingListColumnShape(
                    user?.role === ROLES.admin
                )}
                data={trainings}
            />
        </Box>
    );
};

const Quiz: FC<{
    quiz: {
        id: string;
        title: string;
        questions: { id: string; text: string; quizId: string }[];
    };
    onCompleted: () => void;
}> = ({ quiz, onCompleted }) => {
    const api = useApi();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    const initialValues = quiz.questions.reduce(
        (a, v) => ({ ...a, ["answer_" + v.id]: "" }),
        {}
    );
    const validationSchema = Yup.object().shape(
        quiz.questions.reduce(
            (a, v) => ({
                ...a,
                ["answer_" + v.id]: Yup.string().required(
                    "la réponse est requise!"
                ),
            }),
            {}
        )
    );
    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values: any) => {
            setLoading(true);
            api.addAnswers({
                userId: user?.id,
                quizId: quiz.id,
                questionsAndAnswers: Object.keys(values).map((k) => ({
                    questionId: k.split("answer_")[1],
                    answer: values[k],
                })),
            })
                .then(() => {
                    toast.success("Réponses envoyées");
                    onCompleted();
                })
                .catch(() => {
                    toast.error("Veuillez réessayer ultérieurement");
                })
                .finally(() => {
                    setLoading(false);
                });
        },
    });

    return (
        <Card sx={{ padding: 4 }}>
            <H1>Quiz</H1>
            <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                    <form onSubmit={handleSubmit}>
                        {quiz.questions.map((q) => (
                            <Grid
                                key={q.id}
                                sx={{ marginBlock: "2rem" }}
                                item
                                xs={12}
                            >
                                <H4 sx={{ fontWeight: "bold" }}>{q.text}</H4>
                                <LightTextField
                                    multiline
                                    fullWidth
                                    rows={3}
                                    name={"answer_" + q.id}
                                    value={(values as any)["answer_" + q.id]}
                                    onChange={handleChange}
                                    error={Boolean(
                                        (touched as any)["answer_" + q.id] &&
                                            (errors as any)["answer_" + q.id]
                                    )}
                                    helperText={
                                        (touched as any)["answer_" + q.id] &&
                                        (errors as any)["answer_" + q.id]
                                    }
                                    sx={{
                                        "& .MuiOutlinedInput-root textarea": {
                                            padding: 0,
                                        },
                                        marginTop: "1rem",
                                    }}
                                />
                            </Grid>
                        ))}

                        <Grid item xs={12} marginTop="2rem">
                            {loading ? (
                                <LoadingButton loading variant="contained">
                                    Envoyer
                                </LoadingButton>
                            ) : (
                                <Button
                                    sx={{
                                        backgroundColor: "#282B2A",
                                        ":hover": {
                                            backgroundColor: "#282B2A",
                                            opacity: 0.9,
                                        },
                                    }}
                                    type="submit"
                                    variant="contained"
                                >
                                    Envoyer
                                </Button>
                            )}
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Card>
    );
};

export default TrainingList;
