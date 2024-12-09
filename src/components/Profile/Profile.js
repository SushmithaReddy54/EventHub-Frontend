import React from 'react';
import { Container, Grid } from '@mui/material';
import ProfilePage from './ProfilePage';
import ChangePassword from './ChangePassword';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Profile = () => {
  const user = useSelector((state) => state?.user?.value?.user);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleToggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={showChangePassword ? 7 : 12}>
          <ProfilePage
            user={user}
            isPasswordShow={showChangePassword}
            handleShowPassword={handleToggleChangePassword}
          />
        </Grid>
        {showChangePassword && (
          <Grid item xs={5}>
            <ChangePassword handleClose={handleToggleChangePassword} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Profile;
