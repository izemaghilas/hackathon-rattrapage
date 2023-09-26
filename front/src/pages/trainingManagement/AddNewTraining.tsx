import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Card,
    FormControl,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    SelectProps,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import LightTextField from "../../components/LightTextField";
import { SKILLS } from "../../constants";
import useApi from "../../hooks/useApi";
import useTitle from "../../hooks/useTitle";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initialValues = {
    title: "",
    description: "",
    skills: [],
    userId: "",
};
const validationSchema = Yup.object().shape({
    title: Yup.string().required("l'intitulé est requis!"),
    description: Yup.string().required("la description est requise!"),
    skills: Yup.array().min(1, "les compétences associées sont requises!"),
    userId: Yup.string().required("le consultant est requis!"),
});

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
    "& .MuiOutlinedInput-input": {
        fontWeight: 500,
        color: theme.palette.text.primary,
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "8px",
        border: "2px solid",
        borderColor:
            theme.palette.mode === "light"
                ? theme.palette.secondary[300]
                : theme.palette.divider,
    },
    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.secondary[300],
    },
}));

const AddNewTraining: FC = () => {
    useTitle("Ajouter une Formation");

    const api = useApi();

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        touched,
        setFieldValue,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values: any) => {
            setLoading(true);
            api.addTraining(values)
                .then(() => {
                    toast.success("Formation ajoutée");
                    navigate("/dashboard/training-list");
                })
                .catch(() => {
                    toast.error("Veuillez réessayer ultérieurement");
                })
                .finally(() => {
                    setLoading(false);
                });
        },
    });

    useEffect(() => {
        api.getUsersOnly().then((response) => {
            setUsers(response.data as any);
        });
    }, []);

    const handleSelectSkill = (event: SelectChangeEvent<typeof skills>) => {
        const {
            target: { value },
        } = event;
        setSkills(typeof value === "string" ? value.split(",") : value);
        setFieldValue(
            "skills",
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleSelectUser = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        setUser(value as any);
        setFieldValue("userId", (value as any).id);
    };

    return (
        <Box pt={2} pb={4}>
            <Card sx={{ padding: 4 }}>
                <Grid container spacing={3}>
                    <Grid item md={8} xs={12}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={6}>
                                <Grid item sm={6} xs={12}>
                                    <LightTextField
                                        fullWidth
                                        name="title"
                                        placeholder="Intitulé"
                                        value={values.title}
                                        onChange={handleChange}
                                        error={Boolean(
                                            touched.title && errors.title
                                        )}
                                        helperText={
                                            touched.title && errors.title
                                        }
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <LightTextField
                                        fullWidth
                                        name="description"
                                        placeholder="Description"
                                        value={values.description}
                                        onChange={handleChange}
                                        error={Boolean(
                                            touched.description &&
                                                errors.description
                                        )}
                                        helperText={
                                            touched.description &&
                                            errors.description
                                        }
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <StyledSelect
                                            MenuProps={MenuProps}
                                            value={skills}
                                            onChange={handleSelectSkill}
                                            multiple
                                            fullWidth
                                            displayEmpty
                                            renderValue={(selected) => {
                                                if (selected.length === 0) {
                                                    return (
                                                        <em
                                                            style={{
                                                                color: "#94A4C4",
                                                            }}
                                                        >
                                                            Compétences
                                                            Associées
                                                        </em>
                                                    );
                                                }

                                                return selected.join(", ");
                                            }}
                                            error={Boolean(
                                                touched.skills && errors.skills
                                            )}
                                        >
                                            {SKILLS.map((s, i) => (
                                                <MenuItem key={i} value={s}>
                                                    {s}
                                                </MenuItem>
                                            ))}
                                        </StyledSelect>
                                        {touched.skills && errors.skills && (
                                            <FormHelperText
                                                sx={{ color: "#FD396D" }}
                                            >
                                                {errors.skills}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <StyledSelect
                                            MenuProps={MenuProps}
                                            value={user}
                                            displayEmpty
                                            fullWidth
                                            onChange={handleSelectUser}
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return (
                                                        <em
                                                            style={{
                                                                color: "#94A4C4",
                                                            }}
                                                        >
                                                            Consultant
                                                        </em>
                                                    );
                                                }

                                                return (
                                                    (selected as any).lastname +
                                                    " " +
                                                    (selected as any).firstname
                                                );
                                            }}
                                            error={Boolean(
                                                touched.userId && errors.userId
                                            )}
                                        >
                                            {users.map((u, i) => (
                                                <MenuItem key={i} value={u}>
                                                    {(u as any).lastname +
                                                        " " +
                                                        (u as any).firstname}
                                                </MenuItem>
                                            ))}
                                        </StyledSelect>
                                        {touched.userId && errors.userId && (
                                            <FormHelperText
                                                sx={{ color: "#FD396D" }}
                                            >
                                                {errors.userId}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} marginTop="2rem">
                                {loading ? (
                                    <LoadingButton loading variant="contained">
                                        Ajouter
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
                                        Ajouter
                                    </Button>
                                )}
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default AddNewTraining;
