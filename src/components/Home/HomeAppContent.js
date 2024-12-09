import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const HomeAppContent = () => {

    const navigate = useNavigate();

    return (
        <Container style={{ color :'white',  textAlign: 'center', padding: '50px', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundImage: 'url(https://s28151.pcdn.co/wp-content/uploads/sites/2/2021/04/shutterstock_1720464691.jpg)' }}>
            <Typography variant='h3' gutterBottom>
                Welcome to EventHub
            </Typography>
            <Typography variant="body1" paragraph>
                Explore and enroll in upcoming workshops to enhance your skills.
            </Typography>
            <Button sx={{ alignSelf: 'center', bgcolor: "#4baac2" }} variant="contained"  onClick={() => navigate('/workshop')}>
                View Workshops
            </Button>
        </Container>
    );
}

export default HomeAppContent;