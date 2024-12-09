import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import clark_logo from '../../assets/clark_logo.png';
import { LoginComponent } from './Login/LoginComponent';
import SignUpComponent from './SignUp/SignUpComponent';
import ForgetPasswordComponent from './ForgetPassword/ForgetPasswordComponent';
import './LandingPage.css';
export const LandingPage = (props) => {
  return (
    <Container maxWidth="xl" className="landing_page" id="landing_page" automationId="landing_page" >
      <Grid container sx={{ minHeight: '6vh' }}>
        <Grid item container justifyContent="center" alignItems="center">
          <Typography sx={{ mb: 2, bgcolor:"#4baac2" }} id='landing_page_header' automationId='landing_page_header'>
            EventHub
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ minHeight: '93vh' }} >
         <Grid item xs={12} md={8} lg={8} className="landing_page_left_image" id='landing_page_left_image' automationId='landing_page_left_image' > </Grid>
        <Grid item xs={12} md={4} lg={4} container direction="column" alignItems="center" justifyContent="space-between">
          <Grid item container justifyContent="center" alignItems="center" sx={{ mb: 4 }} className='grid_item' automationId = "landing_page_right_header" id="landing_page_right_header" >
            {/* <img src={clark_logo} alt='Logo' className="landing_page_logo" id='landing_page_logo' automationId='landing_page_logo' /> */}
          </Grid>

          <Grid item container justifyContent="center" alignItems="center" sx={{ mb: 4 }} className='grid_item'>
            {props.loader === 'login' ? <LoginComponent /> : props.loader === 'signup' ? <SignUpComponent /> : props.loader === 'forget-password' ? <ForgetPasswordComponent /> : <LoginComponent />}
          </Grid>

          <Grid></Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

