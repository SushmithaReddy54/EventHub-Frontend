import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Grid, Avatar, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import {
  clearAllWorkshops,
  saveAllWorkshops,
} from "../../store/reducers/WorkshopReducers";
import {
  deleteWorkshop,
  dropoutWorkshop,
  getAllWorkshops,
  registerWorkshop,
} from "../../store/actions/WorkshopActions";
import { toast } from "react-toastify";
import {
  deleteEnrolledWorkshop,
  updateRegisteredWorkshops,
} from "../../store/reducers/UserReducers";
import { LoadingPage } from "../Loading/Loading";
import ConfirmationDialog from "./ConfirmationDialog";

const WorkshopDetails = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [openDropoutConfirm, setOpenDropoutConfirm] = useState(false);

  const allWorkshops =
    useSelector((state) => state?.workshop?.value?.allWorkshops) ?? [];
  const workshop = allWorkshops.find((workshop) => workshop._id === Id);
  const user = useSelector((state) => state?.user?.value?.user);
  const token = user?.session?.sessionId;

  const showEditFields = useMemo(() => {
    return user?.firstName + " " + user.lastName === workshop?.createdUser;
  }, [user?.firstName, user?.lastName, workshop?.createdUser]);

  useEffect(() => {
    if (allWorkshops?.length) {
      setLoading(false);
    }
  }, [allWorkshops]);

  const dispatch = useDispatch();

  const handleDropOut = async () => {
    try {
      const response = await dropoutWorkshop(workshop._id, token);
      dispatch(deleteEnrolledWorkshop(workshop._id));
      setOpenDropoutConfirm(false);
      toast.success("Successfully dropped out of the workshop!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to drop out of the workshop", {
        position: "top-right",
        autoClose: 3000,
      });
      setOpenDropoutConfirm(false);
    }
  };

  let isAlreadyRegistered = false;
  const meetings = user?.registeredMeetings?.find((meeting) =>
    meeting?.workshopId?.includes(Id)
  );
  if (meetings) {
    isAlreadyRegistered = true;
  }

  if (loading) return <LoadingPage />;
  if (!workshop) return <Typography>Workshop not found</Typography>;

  const handleDltWorkshop = async () => {
    setOpenDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteWorkshop(Id);
      setOpenDeleteConfirm(false);
      navigate("/home");
      toast.success("Workshop deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to delete workshop");
    }
  };

  const handleUpdateWorkshop = async () => {
    navigate(`/update-workshop/${Id}`);
  };

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

  // Compare current time with workshop start time
  const currentTime = new Date();
  const workshopStartTime = new Date(workshop.startTime);
  const canRegisterOrDropOut = currentTime < workshopStartTime;

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        content="Are you sure you want to delete this workshop? This action cannot be undone."
      />

      {/* Dropout Confirmation Dialog */}
      <ConfirmationDialog
        open={openDropoutConfirm}
        onClose={() => setOpenDropoutConfirm(false)}
        onConfirm={handleDropOut}
        title="Confirm Dropout"
        content={`Are you sure you want to drop out of the workshop "${workshop.title}"?`}
      />

      <Grid container spacing={3} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={9}>
          <Box p={3} sx={{ border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {workshop.title}
            </Typography>
            <Typography variant="body1" mt={2}>
              {workshop.description}
            </Typography>
            <Typography variant="subtitle1" mt={3}>
              <strong>Start Date:</strong> {workshop.startTime}
            </Typography>
            <Typography variant="subtitle1">
              <strong>End Date:</strong> {workshop.endTime}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Venue:</strong> {workshop.venue}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Total slots:</strong> {workshop.capacity}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Registered Users:</strong>{" "}
              {workshop.registeredUsers?.length}
            </Typography>
            {canRegisterOrDropOut && (
              <>
                {isAlreadyRegistered ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setOpenDropoutConfirm(true)}
                    sx={{ borderRadius: 1, textTransform: "none" }}
                  >
                    Drop out
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRegisterWorkshop(Id)}
                    sx={{
                      borderRadius: 1,
                      textTransform: "none",
                      bgcolor: "#4baac2",
                    }}
                  >
                    Enroll
                  </Button>
                )}
              </>
            )}
            {showEditFields && (
              <>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleUpdateWorkshop}
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                    marginLeft: 2,
                    bgcolor: "#4baac2",
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDltWorkshop}
                  sx={{ borderRadius: 1, textTransform: "none", marginLeft: 2 }}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
        </Grid>

        {/* Right Side Registered Users */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Registered Users
            </Typography>
            {workshop?.registeredUsers?.map((user, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                mb={2}
                sx={{ width: "100%" }}
              >
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  {user?.userName?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    {user.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.emailId}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default WorkshopDetails;