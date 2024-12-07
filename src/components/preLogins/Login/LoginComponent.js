import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory
import './Login.css';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Typography, Button, Grid } from '@mui/material';
import { doLogin } from '../../../store/actions/PreLoginActions'
import { useDispatch } from 'react-redux';
import { saveUser } from '../../../store/reducers/UserReducers'

export const LoginComponent = () => {
    const schema = yup.object().shape({
        emailId: yup.string().required("Please enter email Id").email("Please enter valid email Id"),
        password: yup.string().required("Please enter password").min(8, "Password must be at least 8 characters")
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [responseError, setResponseError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const response = await doLogin(data);
            if(response.status === 402){
                alert(`User not found, please signup`);
                navigate("/signup");
            }
            if(response.status === 401){
                alert(`Invalid password, please retry`);
            }
            if(response.status === 200){
                const {status, data} = response;
                dispatch(saveUser({status, data: data.user}));
                navigate("/home");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setResponseError(error?.response?.data);
            setTimeout(() => {
                setResponseError({});
            }, 10000);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" automationId="login_container" className="login_container">
            <Grid item xs={12}>
                <Typography id="login_container_header" className="login_container_header" automationId="login_container_header" variant="h6" align="center" gutterBottom>
                    Login, please enter your email Id & password
                </Typography>
                <Typography id="login_container_errors" className="login_container_errors" automationId="login_container_errors" align="center" color="error" gutterBottom>
                    {responseError?.message}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} id="login_container_form" className="login_contianer_form" automationId="login_container_form" noValidate>
                    <TextField
                        key="Email Id"
                        inputProps={{ automationId: "login_form_email_id" }}
                        required
                        fullWidth
                        id="login_form_email"
                        className="login_form_fields"
                        variant="outlined"
                        label="Email Id"
                        placeholder="useremail@email.com"
                        size='small'
                        error={!!errors.emailId}
                        helperText={errors.emailId?.message}
                        {...register('emailId')}
                    />
                    <TextField
                        key="Password"
                        required
                        fullWidth
                        id="login_form_password"
                        className="login_form_fields"
                        inputProps={{ automationId: "login_form_password" }}
                        variant="outlined"
                        margin='normal'
                        label="Password"
                        type="password"
                        size="small"
                        placeholder="********"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register('password')}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        id="login_form_signin"
                        automationId="login_form_signin"
                        style={{ marginTop: '16px' }}
                    >
                        Sign In
                    </Button>
                </form>
                <Grid container justifyContent="space-around" alignItems="center" id="login_container_links" className="login_container_links" automationId="login_container_links">
                    <Grid item>
                        First time here? <Link automationId="sign_up_link" to={'/signup'}>Sign Up</Link>
                    </Grid>
                    <Grid item>
                        <Link to={'/forget-password'}>Forget Password?</Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};