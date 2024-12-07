import React from 'react';
import {
    Avatar,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Chip,
    Divider,
    Grid,
    Button,
    Box,
} from '@mui/material';

import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EditIcon from '@mui/icons-material/Edit';
import './Profile.css';

const ProfileView = ({ user, isPasswordShow, handleShowPassword }) => {
    const { firstName, lastName, emailId, phoneNumber, userRole, skills } = user;

    return (
        <Box p={2} className="profile-page">
            <Grid container spacing={3} justifyContent="center">
                <Grid item minWidth={'650px'} xs={12} md={6}>
                    <Card elevation={3}>
                        <CardHeader style={{position:'relative'}}
                            title={
                                <div className='user-prof-avatar' >
                                    <div style={{ position: 'absolute', top: 10, right: 10 }}>
                                        <Button
                                            startIcon={<EditIcon />}
                                            onClick={() => console.log('Edit clicked')}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                    <Avatar alt={firstName} sx={{ width: 100, height: 100, marginRight: '20px' }} />
                                </div>
                            }
                        >


                        </CardHeader>
                        <CardContent className='profile-content'>
                            <Typography variant="h4" className='user-prof-name' gutterBottom>
                                {`${firstName} ${lastName}`}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" className='user-prof-type' gutterBottom>
                                <WorkOutlineOutlinedIcon /> {userRole}
                            </Typography>
                            <Divider className="user-prof-divider" style={{ margin: '20px 0' }} />

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>

                                <Typography variant="body1" className="user-prof-email">
                                    <EmailOutlinedIcon /> {emailId}
                                </Typography>
                                <Typography variant="body1" className='user-prof-phone' style={{ marginLeft: '20px' }}>
                                    <PhoneAndroidOutlinedIcon /> {phoneNumber}
                                </Typography>
                            </div>

                            {userRole !== 'USER' && <>
                                <Divider className="user-prof-divider" style={{ margin: '20px 0' }} />
                                <Typography variant="h6" className='user-prof-skills'>Skills:</Typography>
                                {skills.map((skill) => (
                                    <Chip
                                        key={skill.skillId}
                                        label={skill.skillName}
                                        color={skill.status === 'Approved' ? 'primary' : 'default'}
                                        style={{ margin: 5 }}
                                    />
                                ))}
                            </>}
                            
                            {!isPasswordShow && (
                                <>
                                    <Divider className="user-prof-divider" style={{ margin: '20px 0' }} />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleShowPassword}
                                        className='user-prof-change-pass'
                                    >
                                        Change Password
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfileView;
