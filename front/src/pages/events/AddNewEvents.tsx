import { PhotoCamera } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  styled,
  Switch,
} from "@mui/material";
import LightTextField from "../../components/LightTextField";
import { Small, Tiny } from "../../components/Typography";
import { useFormik } from "formik";
import useTitle from "../../hooks/useTitle";
import { FC } from "react";
import * as Yup from "yup";
import { useState } from "react";

// styled components
const ButtonWrapper = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[200]
      : alpha(theme.palette.primary[100], 0.1),
}));

const UploadButton = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  border: "2px solid",
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.palette.background.paper,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[400]
      : alpha(theme.palette.background.paper, 0.9),
}));

const SwitchWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: 10,
}));




const AddNewEvents: FC = () => {
  // change navbar title
    useTitle("Ajouter un Évènement");
    
    const boutonStyle = {
  backgroundColor: 'black', 
  color: 'white'
};

  const initialValues = {
    fullName: "",
    email: "",
    zip: "",
    about: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Name is Required!"),
    email: Yup.string().email().required("Email is Required!"),
    phone: Yup.number().min(8).required("Phone is Required!"),
    country: Yup.string().required("Country is Required!"),
    state: Yup.string().required("State is Required!"),
    city: Yup.string().required("City is Required!"),
    address: Yup.string().required("Address is Required!"),
    zip: Yup.string().required("Zip is Required!"),
    about: Yup.string().required("About is Required!"),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
  });

  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
  
         
          <Grid item md={8} xs={12}>
            <Card sx={{ padding: 3, boxShadow: 2 }}>
              <form onSubmit={handleSubmit}>
                              <Grid container spacing={3}>
                                  

                  <Grid item sm={6} lg={12}>
                    <LightTextField
                      fullWidth
                      name="email"
                      placeholder="Titre de l'évènement"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

               

                

                  <Grid item sm={6} lg={12}>
                    <LightTextField
                      fullWidth
                      name="zip"
                      placeholder="Zip/Code"
                      value={values.zip}
                      onChange={handleChange}
                      error={Boolean(touched.zip && errors.zip)}
                      helperText={touched.zip && errors.zip}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <LightTextField
                      multiline
                      fullWidth
                      rows={10}
                      name="Description"
                      placeholder="About"
                      value={values.about}
                      onChange={handleChange}
                      error={Boolean(touched.about && errors.about)}
                      helperText={touched.about && errors.about}
                      sx={{
                        "& .MuiOutlinedInput-root textarea": { padding: 0 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" style={boutonStyle}>
                      Créer un évènement
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
     
      </Card>
    </Box>
  );
};

export default AddNewEvents;
