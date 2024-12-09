import React, { useState } from "react";
import { Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dropoutWorkshop } from "../../../store/actions/WorkshopActions";
import WorkshopCard from "../WorkshopCard";

import { deleteEnrolledWorkshop } from "../../../store/reducers/UserReducers";
import ConfirmationDialog from "../ConfirmationDialog";

export default function RegisteredWorkshops() {
  const workshops =
    useSelector((state) => state?.user?.value?.user?.registeredMeetings) ?? [];
  const dispatch = useDispatch();
  const allWorkshops =
    useSelector((state) => state?.workshop?.value?.allWorkshops) ?? [];
  const navigate = useNavigate();

  // State to manage confirmation dialog
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [workshopToDropout, setWorkshopToDropout] = useState(null);

  const handleViewWorkshop = (workshopId) => {
    console.log(workshopId, "ged");
    navigate(`/view-workshop/${workshopId}`);
  };
  const user = useSelector((state) => state?.user?.value?.user);
  const token = user?.session?.sessionId;

  const handleDropOut = async () => {
    if (!workshopToDropout) return;

    try {
      const response = await dropoutWorkshop(workshopToDropout._id, token);
      dispatch(deleteEnrolledWorkshop(workshopToDropout._id));
      setOpenConfirmDialog(false);
      setWorkshopToDropout(null);
    } catch (error) {
      console.log(error);
      setOpenConfirmDialog(false);
      setWorkshopToDropout(null);
    }
  };

  const initiateDropout = (workshop) => {
    setWorkshopToDropout(workshop);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setWorkshopToDropout(null);
  };

  if (!workshops?.length) {
    return (
      <div variant="h6" gutterBottom>
        No registered events
      </div>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container spacing={3}>
        {workshops.map((workshop) => {
          let workshop1 = allWorkshops.find(
            (workshop2) => workshop2._id === workshop.workshopId
          );

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={workshop.workshopId}>
              <WorkshopCard
                imageUrl={workshop1?.image}
                title={workshop1?.title}
                isAlreadyRegistered={true}
                description={workshop1?.description}
                onDropout={() => initiateDropout(workshop1)}
                onRegister={() => console.log("registered")}
                onView={() => handleViewWorkshop(workshop1?._id)}
              />
            </Grid>
          );
        })}
      </Grid>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleDropOut}
        title="Confirm Dropout"
        content={`Are you sure you want to drop out of the workshop "${workshopToDropout?.title}"?`}
      />
    </Container>
  );
}