import React, { useEffect } from "react";
import { Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WorkshopCard from "./WorkshopCard";
import {
  getAllWorkshops,
  registerWorkshop,
} from "../../store/actions/WorkshopActions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllWorkshops,
  saveAllWorkshops,
} from "../../store/reducers/WorkshopReducers";
import { updateRegisteredWorkshops } from "../../store/reducers/UserReducers";

const WorkshopList = ({ workshops }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleViewWorkshop = (workshopId) => {
    navigate(`/view-workshop/${workshopId}`);
  };
  const meetings = workshops
    ?.filter((meeting) => new Date(meeting?.startTime) >= new Date())
    ?.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    ?.slice(0, 20);
  const user = useSelector((state) => state?.user?.value?.user);
  const token = user?.session?.sessionId;
  const handleRegisterWorkshop = async (id) => {
    const res = await registerWorkshop(id, token);
    dispatch(updateRegisteredWorkshops({ data: res.data.userMeetings }));
    const data2 = await getAllWorkshops();
    dispatch(clearAllWorkshops());
    dispatch(saveAllWorkshops(data2));

    toast.success("Workshop registered successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      closeButton: false,
      draggable: false,
    });
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container spacing={3}>
        {meetings.map((workshop) => {
          let isAlreadyRegistered = false;
          const meetings = user?.registeredMeetings?.find((meeting) =>
            meeting?.workshopId?.includes(workshop._id)
          );
          if (meetings) {
            isAlreadyRegistered = true;
          }
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={workshop._id}>
              <WorkshopCard
                imageUrl={workshop?.image}
                title={workshop.title}
                from="list"
                isAlreadyRegistered={isAlreadyRegistered}
                description={workshop.description}
                onRegister={() => handleRegisterWorkshop(workshop._id)}
                onView={() => handleViewWorkshop(workshop._id)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default WorkshopList;
