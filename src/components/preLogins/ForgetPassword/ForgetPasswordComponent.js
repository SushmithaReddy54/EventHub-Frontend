import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { forgetPassword } from "../../../store/actions/PreLoginActions";
import "./ForgetPassword.css";

const ForgetPasswordComponent = () => {
  const [isSubmitting, SetIsSubmitting] = useState(false);
  const [email, setEmail] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async () => {
    SetIsSubmitting(true);
    try {
      const response = await forgetPassword(email);
      if (response.data) {
        if (response.data?.status.includes("User Not Exists")) {
          setIsSuccess(false);
          setIsError(true);
        } else {
          setIsSuccess(true);
          setIsError(false);
        }
      } else {
        setIsError(true);
        setIsSuccess(false);
      }
      SetIsSubmitting(false);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setErrorMessage(err?.response?.data?.message);
      SetIsSubmitting(false);
    }
  };

  return isSubmitting ? (
    <CircularProgress style={{ color: "red" }} />
  ) : (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      automationId="forget_pass"
      className="forget_pass"
    >
      <Grid item xs={12}>
        {!isSuccess && (
          <Typography
            id="forget_pass_header"
            className="forget_pass_header"
            automationId="forget_pass_header"
            variant="h6"
            align="center"
            gutterBottom
            marginBottom="20px"
          >
            Please provide the registered email Id
          </Typography>
        )}
        {isSuccess && (
          <Typography
            id="forget_pass_form_success"
            className="forget_pass_form_success"
            automationId="forget_pass_form_success"
            align="center"
            color="green"
            marginBottom="20px"
            gutterBottom
          >
            Password reset successfully, please check registered email
          </Typography>
        )}
        {isError && (
          <Typography
            id="forget_pass_form_error"
            className="forget_pass_form_error"
            automationId="forget_pass_form_error"
            align="center"
            color="error"
            gutterBottom
          >
            {errorMessage !== ""
              ? errorMessage
              : "Failed to reset the password, please contact helpdesk"}
          </Typography>
        )}
        {!isSuccess && (
          <form
            onSubmit={() => handleSubmit()}
            id="forget_pass_form"
            className="forget_pass_form"
            automationId="forget_pass_form"
            style={{ textAlign: "center" }}
            noValidate
          >
            <TextField
              key="Email Id"
              inputProps={{ automationId: "forget_pass_form_email_id" }}
              required
              fullWidth
              id="forget_pass_form_email"
              className="forget_pass_form_fields"
              variant="outlined"
              label="Email Id"
              placeholder="useremail@email.com"
              value={email}
              size="small"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              id="forget_pass_form_signin"
              automationId="forget_pass_form_submit"
              // onClick={() => {
              //     handleMenuItemClick(content, handleCloseNavMenu, false);
              //   }}
              style={{ marginTop: "20px", alignItems: "center" }}
            >
              Submit
            </Button>
          </form>
        )}
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          id="forget_pass_container_links"
          className="forget_pass_container_links"
          automationId="forget_pass_container_links"
        >
          <Grid item>
            Go back to <Link to={"/login"}>Login</Link>
          </Grid>
          <Grid item>
            First time here? <Link to={"/signup"}>Sign Up</Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ForgetPasswordComponent;
