import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { getSkills } from "../../../store/actions/AdminActions";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signUpValidationSchema } from "../../../api/validationSchema";
import { signUpUser } from "../../../store/actions/PreLoginActions";
import "./SignUpComponent.css";

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    skills: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sysSkills, setSysSkills] = useState([]);
  const [signUpError, setSignUpError] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await getSkills();
        setSysSkills(skills.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error : ", error);
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchSkills();
    }
  }, [isLoading]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNumber: "",
      isInstrcutor: false,
      skills: [],
      existingSkills: [],
      newSkills: [],
      createPassword: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (form) => {
    const data = {
      firstName: form.firstName,
      lastName: form.lastName,
      emailId: form.emailId,
      phoneNumber: form.phoneNumber,
      userRole: form.isInstrcutor ? "INSTRUCTOR" : "USER",
      existingSkills: formData.skills.filter((item) =>
        item.hasOwnProperty("skillId")
      ),
      newSkills: formData.skills.filter(
        (item) => !item.hasOwnProperty("skillId")
      ),
      createPassword: form.createPassword,
      confirmPassword: form.confirmPassword,
    };
    try {
      const response = await signUpUser(data);
      if (response.status === 403) {
        setSignUpError(true);
        setErrorMessage("User already exists, please login");
        navigate("/login");
      }
      if (response.status === 200) {
        if (response.data) {
          setSignUpSuccess(true);
          setSignUpError(false);
        } else {
          setSignUpError(true);
          setErrorMessage("Failed to Sign-Up, Please contact Helpdesk");
          setSignUpSuccess(false);
        }
      }
    } catch (err) {
      setSignUpError(true);
      setErrorMessage(err?.response?.data?.message);
    }
  };


  return isLoading ? (
    <CircularProgress style={{ color: red }} />
  ) : signUpSuccess ? (
    <div
      id="sign_up_success_container"
      className="sign_up_success_container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        className="sign_up_success_message"
        id="sign_up_success_message"
        automationId="sign_up_success_message"
        variant="h5"
        align="center"
      >
        Successfully registered, you have granted access to the Application
      </Typography>
      <Typography
        className="sign_up_success_secondary"
        id="sign_up_success_secondary"
        automationId="sign_up_success_secondary"
        variant="body1"
        align="center"
      >
        <Link to={"/login"}>Login</Link> to access the workshops and start
        learning
      </Typography>
    </div>
  ) : (
    <div
      id="sign_up_container"
      className="sign_up_container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        id="sign_up_container_header"
        className="sign_up_container_header"
        automationId="sign_up_container_header"
        variant="h6"
        align="center"
      >
        SignUp
      </Typography>
      {signUpError && (
        <Typography
          className="sign_up_container_errors"
          id="sign_up_error_message"
          automationId="sign_up_error_message"
          variant="body1"
          align="center"
        >
          {errorMessage}
        </Typography>
      )}
      <form
        className="sign_up_container_form"
        id="sign_up_container_form"
        onSubmit={formik.handleSubmit}
        style={{ width: "100%", textAlign: "center" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              type="text"
              id="firstName"
              className="sign_up_form_fields"
              name="firstName"
              size="small"
              inputProps={{ automationId: "sign_up_first_name" }}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              className="sign_up_form_fields"
              size="small"
              inputProps={{ automationId: "sign_up_last_name" }}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              required
              fullWidth
            />
          </Grid>
        </Grid>

        <TextField
          name="emailId"
          variant="outlined"
          id="user_prof_email_id"
          className="sign_up_form_fields"
          inputProps={{ automationId: "sign_up_email_id" }}
          label="Email Id"
          size="small"
          required
          value={formik.values.emailId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.emailId && Boolean(formik.errors.emailId)}
          helperText={formik.touched.emailId && formik.errors.emailId}
          fullWidth
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="phoneNumber"
              variant="outlined"
              id="sign_up_phone_number"
              className="sign_up_form_fields"
              size="small"
              required
              inputProps={{ automationId: "sign_up_phone_number" }}
              label="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.isInstrcutor}
                  onChange={formik.handleChange}
                  name="isInstrcutor"
                  inputProps={{ automationId: "sign_up_instructor" }}
                  color="primary"
                />
              }
              label="Instructor?"
            />
          </Grid>
        </Grid>

        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Create Password"
              type="password"
              id="createPassword"
              className="sign_up_form_fields"
              name="createPassword"
              size="small"
              inputProps={{ automationId: "sign_up_create_password" }}
              value={formik.values.createPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.createPassword &&
                Boolean(formik.errors.createPassword)
              }
              helperText={
                formik.touched.createPassword && formik.errors.createPassword
              }
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="sign_up_form_fields"
              size="small"
              inputProps={{ automationId: "sign_up_confirm_password" }}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              required
              fullWidth
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          id="sign_up_form_signin"
          automationId="sign_up_form_submit"
          style={{ marginTop: "16px" }}
        >
          Sign Up
        </Button>
      </form>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        id="sign_up_container_links"
        className="sign_up_container_links"
        automationId="sign_up_container_links"
      >
        <Grid item>
          Already Signed-Up? <Link to={"/login"}>Sign In</Link>
        </Grid>
        <Grid item>
          <Link to={"/forget-password"}>Forget Password?</Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUpComponent;
