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
import { H4, Small } from "../../components/Typography";
import useApi from "../../hooks/useApi";
import useTitle from "../../hooks/useTitle";

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
]

const AddNewUser: FC = () => {
  // change navbar title
  useTitle("Ajouter un Consultant");
  const [loading, setLoading] = useState(false);
  const api = useApi()
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([])

  const initialValues = {
    lastname: "",
    firstname: "",
    jobTitle: "",
    email: "",
    password: "",
    skills: [],
  };

  const validationSchema = Yup.object().shape({
    lastname: Yup.string().required("le nom est requis!"),
    firstname: Yup.string().required("le prénom est requis!"),
    jobTitle: Yup.string().required("l'intitulé du poste est requis!"),
    email: Yup.string().email().required("l'adresse mail est requise!"),
    password: Yup.string().required("le mot de passe est requis!"),
    skills: Yup.array().min(1, "les compétences sont requises!")
  });

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: any) => {
      setLoading(true)
      api.addUser(values)
        .then(() => {
          toast.success("Consultant ajouté")
          navigate("/dashboard/user-list")
        })
        .catch(() => {
          toast.error("Veuillez réessayer ultérieurement")
        })
        .finally(() => {
          setLoading(false)
        })
    },
  });

  const handleSelectSkill = (event: SelectChangeEvent<typeof skills>) => {
    const {
      target: { value },
    } = event;
    setSkills(
      typeof value === 'string' ? value.split(',') : value,
    );
    setFieldValue("skills", typeof value === 'string' ? value.split(',') : value)
  };

  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <form onSubmit={handleSubmit}>
              <Card sx={{ padding: 3, boxShadow: 2 }}>
                  <Grid item md={8} xs={12}>
                    <H4>Informations Personnelles</H4>
                  </Grid>
                  <Grid sx={{marginTop: "1px"}} container spacing={3}>
                    <Grid item sm={6} xs={12}>
                      <LightTextField
                        fullWidth
                        name="lastname"
                        placeholder="Nom"
                        value={values.lastname}
                        onChange={handleChange}
                        error={Boolean(touched.lastname && errors.lastname)}
                        helperText={touched.lastname && errors.lastname}
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <LightTextField
                        fullWidth
                        name="firstname"
                        placeholder="Prénom"
                        value={values.firstname}
                        onChange={handleChange}
                        error={Boolean(touched.firstname && errors.firstname)}
                        helperText={touched.firstname && errors.firstname}
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <LightTextField
                        fullWidth
                        name="email"
                        placeholder="Adresse mail"
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <LightTextField
                        fullWidth
                        name="jobTitle"
                        placeholder="Intitulé du Poste"
                        value={values.jobTitle}
                        onChange={handleChange}
                        error={Boolean(touched.jobTitle && errors.jobTitle)}
                        helperText={touched.jobTitle && errors.jobTitle}
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <LightTextField
                        fullWidth
                        name="password"
                        placeholder="Mot de passe"
                        type="password"
                        onChange={handleChange}
                        value={values.password || ""}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                  </Grid>
              </Card>
              
              <Card sx={{ padding: 3, boxShadow: 2, marginTop: "2rem" }}>
                <Grid item md={8} xs={12}>
                  <H4>Compétences</H4>
                  <Grid sx={{marginTop: "1rem"}} item sm={6} xs={12} md={12}>
                      <Skill skills={skills}/>
                      <FormControl sx={{marginTop: "1.5rem"}} fullWidth>
                        <StyledSelect 
                          MenuProps={MenuProps}
                          value={skills}
                          onChange={handleSelectSkill}
                          multiple 
                          fullWidth
                          error={Boolean(touched.skills && errors.skills)}
                        >
                          {definedSkills.map((s, i) => <MenuItem key={i} value={s}> {s} </MenuItem>)}
                        </StyledSelect>
                        {touched.skills && errors.skills && <FormHelperText sx={{color: "#FD396D"}}>{errors.skills}</FormHelperText>}
                      </FormControl>
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

const Skill: FC<{skills: string[]}> = ({skills}) => {
  return (
    <Grid 
      sx={{marginTop: "1rem"}} 
      container 
      item 
      xs={12}
    >
      {skills.map((skill, i)=>(
        <Small key={i}
          sx={{
            borderRadius: 10,
            padding: ".2rem 1rem",
            color: "background.paper",
            backgroundColor: "#00BB7E",
            marginInline: "0.2rem",
            marginBlock: "0.3rem",
          }}
        >
          {skill}
        </Small>
      ))}
    </Grid>
  )
}

const ITEM_HEIGHT = 25;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default AddNewUser;
