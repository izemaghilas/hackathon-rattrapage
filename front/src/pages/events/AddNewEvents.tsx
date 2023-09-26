import { LoadingButton } from "@mui/lab";
import {
  alpha,
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  SelectProps,
  styled
} from "@mui/material";
import { useFormik } from "formik";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LightTextField from "../../components/LightTextField";
import { H4 } from "../../components/Typography";
import useApi from "../../hooks/useApi";
import useTitle from "../../hooks/useTitle";

// styled components
const definedSkills = [
  "Javascript",
  "PHP",
  "React",
  "Vue",
  "Angular",
  "Symfony",
  "Nest",
  "Docker",
  "Terraform",
];

const AddNewEvent: FC = () => {
  // change navbar title
  useTitle("Ajouter un Événement");
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    // createdAt: "", // Cette valeur sera générée automatiquement par la base de données
    // updatedAt: "", // Cette valeur sera générée automatiquement par la base de données
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Le titre de l'événement est requis!"),
    description: Yup.string().required("La description de l'événement est requise!"),
    startDate: Yup.date().required("La date de début de l'événement est requise!"),
    endDate: Yup.date().required("La date de fin de l'événement est requise!"),
  });

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: any) => {
      setLoading(true);
      api.addEvent(values)
        .then(() => {
          toast.success("Événement ajouté");
          navigate("/dashboard/event-list");
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
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <form onSubmit={handleSubmit}>
              <Card sx={{ padding: 3, boxShadow: 2 }}>
                <Grid item md={8} xs={12}>
                  <H4>Informations de l'Événement</H4>
                </Grid>
                <Grid sx={{ marginTop: "1px" }} container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="title"
                      placeholder="Titre de l'événement"
                      value={values.title}
                      onChange={handleChange}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="description"
                      placeholder="Description de l'événement"
                      value={values.description}
                      onChange={handleChange}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="startDate"
                      placeholder="Date de début"
                      type="date"
                      value={values.startDate}
                      onChange={handleChange}
                      error={Boolean(touched.startDate && errors.startDate)}
                      helperText={touched.startDate && errors.startDate}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="endDate"
                      placeholder="Date de fin"
                      type="date"
                      value={values.endDate}
                      onChange={handleChange}
                      error={Boolean(touched.endDate && errors.endDate)}
                      helperText={touched.endDate && errors.endDate}
                    />
                  </Grid>
                </Grid>
              </Card>

              <Grid item xs={12} marginTop="2rem">
                {loading ? (
                  <LoadingButton loading variant="contained">
                    Ajouter
                  </LoadingButton>
                ) : (
                  <Button type="submit" variant="contained">
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

// ... (reste du code)

export default AddNewEvent;
