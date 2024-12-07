import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Divider,
  IconButton,
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getVenues } from "../../store/actions/AdminActions";
import { saveVenues } from "../../store/reducers/AdminReducers";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SaveIcon from "@mui/icons-material/Save";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {
  deleteWorkshop,
  enrollWorkshop,
  getWorkshop,
  unEnrollWorkshop,
  updateWorkshop,
} from "../../store/actions/WorkshopActions";
import {
  DefaultColumnFilter,
  convertTimetoLocalDateTime,
  convertToDateFormat,
  sessionUnAuthCheck,
} from "../../utils/Common";
import { LoadingPage } from "../Loading/Loading";
import {
  saveUpdatedWorkshop,
  saveWorkshop,
  updateDeleteWorkshop,
  updateLocalWorkshop,
} from "../../store/reducers/WorkshopReducers";
import NotifyWorkshop from "./NotifyWorkshop";
import UsersTable from "./UsersTable";
import ConfirmationDialog from "./ConfirmationDialog";

const ViewWorkshop = () => {
  const location = useLocation();
  const { workshopId } = location.state || {};
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const workshop = useSelector((state) => state.workshop.value.workshopDetails);
  const [updatedWorkshop, setUpdatedWorkshop] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const userState = useSelector((state) => state.user.value);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [openNotifyMessageDialog, setOpenNotifyMessageDialog] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "firstName",
        Filter: DefaultColumnFilter,
        width: "200px",
      },
      {
        Header: "Email Id",
        accessor: "emailId",
        Filter: DefaultColumnFilter,
        width: "180px",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await getWorkshop(workshopId);
        dispatch(saveWorkshop(response));
        setUpdatedWorkshop(response.data);
        setIsEnrolled(response.data.isUserEnrolled);
        setIsLoading(false);
      } catch (error) {
        console.error("Error : ", error);
        setIsLoading(true);
      }
    };
    if (isLoading) {
      fetchWorkshop();
    }
  }, [isLoading, workshopId]);
  const handleEditClick = () => {
    setIsLoading(true);
    setIsEditMode(true);
  };

  const openConfirmationDialog = () => {
    setOpenSaveDialog(true);
  };

  const openDeleteConfirmationDialog = () => {
    setOpenDeleteDialog(true);
  };

  const checkAnyFieldsChange = () => {
    return (
      workshop.workshopName !== updatedWorkshop.workshopName ||
      workshop.description !== updatedWorkshop.description ||
      workshop.workshopDate !== updatedWorkshop.workshopDate ||
      workshop.startTime !== updatedWorkshop.startTime ||
      workshop.endTime !== updatedWorkshop.endTime ||
      workshop.selectedSkills !== updatedWorkshop.selectedSkills ||
      workshop.capacity !== updatedWorkshop.capacity ||
      workshop.venue !== updatedWorkshop.venue ||
      workshop.meetingURL !== updatedWorkshop.meetingURL
    );
  };

  const handleSaveClick = () => {
    openConfirmationDialog();
  };

  const handleDeleteClick = () => {
    // openDeleteConfirmationDialog();
    setOpenDeleteDialog(true);
  };

  const handleCloseNotifyMessage = () => {
    setOpenNotifyMessageDialog(false);
  };

  const handleNotifyClick = () => {
    setOpenNotifyMessageDialog(true);
  };

  const handleSaveConfirmation = async () => {
    setOpenSaveDialog(false);
    setIsEdited(true);
  };

  const confirmDelete = async () => {
    setOpenDeleteDialog(false);
    try {
      const response = await deleteWorkshop(updatedWorkshop);
      if (response.data === true) {
        toast.success("Workshop Successfully Deleted!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          closeButton: false,
          draggable: false,
        });
        dispatch(updateDeleteWorkshop(updatedWorkshop));
        navigate("/workshop");
        setIsLoading(false);
      } else {
        setIsEdited(false);
        toast.error("Workshop Failed to Delete", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: false,
        });
        setUpdatedWorkshop(workshop);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating Workshop :", error);
      sessionUnAuthCheck(error) && navigate("/logout");
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: false,
      });
      setUpdatedWorkshop(workshop);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setOpenSaveDialog(false);
    setUpdatedWorkshop(workshop);
    setIsEditMode(false);
    setOpenDeleteDialog(false);
  };

  const handleUnEnroll = async () => {
    setIsEnrolling(true);
    try {
      const response = await unEnrollWorkshop(workshop);
      if (response.data === true) {
        toast.success("Workshop UnEnrolled Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          closeButton: false,
          draggable: false,
        });
        setIsEnrolling(false);
        setIsEnrolled(false);
      } else {
        toast.error("Failed to Enroll", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: false,
        });
        setIsEnrolling(false);
      }
    } catch (error) {
      console.error("Error enrolling Workshop :", error);
      sessionUnAuthCheck(error) && navigate("/logout");
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: false,
      });
      setIsEnrolling(false);
    }
  };

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      const response = await enrollWorkshop(workshop);
      if (response.data === true) {
        toast.success("Workshop Enrolled Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          closeButton: false,
          draggable: false,
        });
        setIsEnrolling(false);
        setIsEnrolled(true);
      } else {
        toast.error("Failed to Enroll", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: false,
        });
        setIsEnrolling(false);
      }
    } catch (error) {
      console.error("Error enrolling Workshop :", error);
      sessionUnAuthCheck(error) && navigate("/logout");
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: false,
      });
      setIsEnrolling(false);
    }
  };

  const userSkills = useSelector((state) => state?.user?.value?.user?.skills);
  const venues = useSelector((state) => state?.admin?.value?.venues);
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venues = await getVenues();
        dispatch(saveVenues(venues));
        setIsLoading(false);
      } catch (error) {
        console.error("Error : ", error);
        setIsLoading(false);
      }
    };

    const saveWorkshop = async () => {
      setIsLoading(true);
      try {
        const response = await updateWorkshop(updatedWorkshop);
        if (response.data === true) {
          toast.success("Workshop Successfully Updated!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            closeButton: false,
            draggable: false,
          });
          dispatch(saveUpdatedWorkshop(updatedWorkshop));
          dispatch(updateLocalWorkshop(updatedWorkshop));
          setIsLoading(false);
        } else {
          setUpdatedWorkshop(workshop);
          toast.error("Workshop Failed to Update", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: false,
          });
        }
        setIsEdited(false);
        setIsLoading(false);
      } catch (error) {
        console.error("Error updating Workshop :", error);
        setIsEdited(false);
        sessionUnAuthCheck(error) && navigate("/logout");
        toast.error(error?.response?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: false,
        });
        setUpdatedWorkshop(workshop);
        setIsLoading(false);
      }
    };
    if (isEdited && workshop && checkAnyFieldsChange()) {
      saveWorkshop();
      setIsEditMode(false);
      setIsEdited(false);
    }
    if (isLoading && isEditMode && !venues) {
      fetchVenues();
    }
    if (venues && workshop) {
      setIsLoading(false);
    }
    if (!workshop) {
      setIsLoading(true);
    }
    if (!isEditMode && workshop) {
      setIsLoading(false);
    }
    if (!updatedWorkshop) {
      setIsLoading(true);
    }
  }, [
    dispatch,
    isEditMode,
    isEdited,
    isLoading,
    updatedWorkshop,
    venues,
    workshop,
  ]);

  const handleChange = (name, value) => {
    if (name === "startTime" || name === "endTime") {
      setUpdatedWorkshop((prevWorkshop) => ({
        ...prevWorkshop,
        [name]: convertTimetoLocalDateTime(prevWorkshop.workshopDate, value),
      }));
    }
    setUpdatedWorkshop((prevWorkshop) => ({
      ...prevWorkshop,
      [name]: value,
    }));
    if (name === "workshopDate") {
      setUpdatedWorkshop((prevWorkshop) => ({
        ...prevWorkshop,
        [name]: convertToDateFormat(value).split("T")[0],
      }));
      setUpdatedWorkshop((prevWorkshop) => ({
        ...prevWorkshop,
        startTime: convertTimetoLocalDateTime(
          convertToDateFormat(value).split("T")[0],
          prevWorkshop.startTime
        ),
        endTime: convertTimetoLocalDateTime(
          convertToDateFormat(value).split("T")[0],
          prevWorkshop.endTime
        ),
      }));
    }
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      <ConfirmationDialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        content="Are you sure you want to delete this workshop? This action cannot be undone."
      />
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 0,
          margin: 0,
          width: "100%",
        }}
      >
        <Container maxWidth="md" sx={{ marginTop: 4, minWidth: "60%" }}>
          <Paper elevation={3} sx={{ padding: 3, position: "relative" }}>
            {userState.user.userId === workshop.createdUserId ? (
              <div style={{ position: "absolute", top: 10, right: 10 }}>
                <IconButton
                  aria-label="notify"
                  onClick={handleNotifyClick}
                  title="Notify"
                >
                  <ForwardToInboxIcon />
                </IconButton>
                {!isEditMode && (
                  <IconButton
                    aria-label="edit"
                    onClick={handleEditClick}
                    title="Edit Workshop"
                  >
                    <EditIcon />
                  </IconButton>
                )}
                {isEditMode && (
                  <IconButton
                    color="primary"
                    aria-label="save"
                    onClick={handleSaveClick}
                    title="Update Workshop"
                  >
                    <SaveIcon />
                  </IconButton>
                )}

                <IconButton
                  color="error"
                  aria-label="delete"
                  onClick={handleDeleteClick}
                  title="Delete Workshop"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : (
              <div style={{ position: "absolute", top: 10, right: 10 }}>
                {isEnrolled ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleUnEnroll}
                    sx={{ fontWeight: "bold" }}
                  >
                    {isEnrolling ? (
                      <CircularProgress
                        style={{
                          color: "white",
                          height: "25px",
                          width: "25px",
                        }}
                      />
                    ) : (
                      "Drop out"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleEnroll}
                    sx={{ fontWeight: "bold" }}
                  >
                    {isEnrolling ? (
                      <CircularProgress
                        style={{
                          color: "white",
                          height: "25px",
                          width: "25px",
                        }}
                      />
                    ) : (
                      "Enroll"
                    )}
                  </Button>
                )}
              </div>
            )}
            <Typography variant="h4" gutterBottom>
              {" "}
              {isEditMode ? (
                <TextField
                  name="workshopName"
                  variant="standard"
                  fullWidth
                  id="edit_workshop_title_field"
                  inputProps={{ automationId: "edit_workshop_title_field" }}
                  label="Workshop title"
                  value={updatedWorkshop.workshopName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  sx={{ marginTop: 2 }}
                />
              ) : (
                updatedWorkshop.workshopName
              )}
            </Typography>
            {!isEditMode && (
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Instructor : {workshop.createdUser}
              </Typography>
            )}
            <Typography variant="body1" gutterBottom>
              {" "}
              {isEditMode ? (
                <TextField
                  name="description"
                  fullWidth
                  id="edit_workshop_description_field"
                  inputProps={{
                    automationId: "edit_workshop_description_field",
                  }}
                  label="Description"
                  multiline
                  value={updatedWorkshop.description}
                  rows={4}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              ) : (
                updatedWorkshop.description
              )}
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {isEditMode ? (
                  <Autocomplete
                    className="edit_workshop_autocomplete"
                    multiple
                    id="selectedSkills"
                    componentName="selectedSkills"
                    options={userSkills}
                    getOptionLabel={(option) => option.skillName}
                    getOptionSelected={(option, value) =>
                      option.skillId === value.skillId
                    }
                    value={updatedWorkshop.selectedSkills}
                    onChange={(e, newValue) => {
                      handleChange("selectedSkills", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="standard"
                        id="edit_workshop_skills_field"
                        inputProps={{
                          automationId: "edit_workshop_skills_field",
                        }}
                        {...params}
                        label="Skills"
                        fullWidth
                      />
                    )}
                  />
                ) : (
                  <Typography variant="body1">
                    Skills :{" "}
                    {updatedWorkshop.selectedSkills
                      .map((skill) => skill.skillName)
                      .join(", ")}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {isEditMode ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Workshop Date"
                      value={dayjs(updatedWorkshop.workshopDate)}
                      onChange={(date) =>
                        handleChange(
                          "workshopDate",
                          new Date(date).toLocaleDateString()
                        )
                      }
                      slotProps={{
                        textField: {
                          inputProps: {
                            automationId: "edit_workshop_date_field",
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                ) : (
                  <Typography variant="body1">
                    Workshop Date :{" "}
                    {new Date(
                      `${updatedWorkshop.workshopDate}T12:00:00Z`
                    ).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {isEditMode ? (
                  <Autocomplete
                    className="create_workshop_autocomplete"
                    id="venue"
                    options={venues}
                    getOptionLabel={(option) => option.venueName}
                    getOptionSelected={(option, value) =>
                      option.venueId === value.venueId
                    }
                    value={venues.find(
                      (venue) => venue.venueName === updatedWorkshop.venue
                    )}
                    onChange={(e, newValue) => {
                      handleChange("venue", newValue.venueName);
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="standard"
                        id="edit_workshop_location_field"
                        inputProps={{
                          automationId: "edit_workshop_location_field",
                        }}
                        {...params}
                        label="Location"
                        fullWidth
                      />
                    )}
                  />
                ) : (
                  <Typography variant="body1">
                    Location : {updatedWorkshop.venue}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {isEditMode ? (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    locale="en"
                    timeZone="America/New_York"
                  >
                    <TimePicker
                      label="Start Time"
                      value={dayjs(updatedWorkshop.startTime)}
                      onChange={(date) =>
                        handleChange("startTime", new Date(date))
                      }
                      slotProps={{
                        textField: {
                          inputProps: {
                            automationId: "edit_workshop_start_time_field",
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                ) : (
                  <Typography variant="body1">
                    Start Time :{" "}
                    {new Date(updatedWorkshop.startTime).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {isEditMode ? (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    locale="en"
                    timeZone="America/New_York"
                  >
                    <TimePicker
                      label="End Time"
                      value={dayjs(updatedWorkshop.endTime)}
                      onChange={(date) =>
                        handleChange("endTime", new Date(date))
                      }
                      slotProps={{
                        textField: {
                          inputProps: {
                            automationId: "edit_workshop_end_time_field",
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                ) : (
                  <Typography variant="body1">
                    End Time :{" "}
                    {new Date(updatedWorkshop.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {isEditMode ? (
                  <TextField
                    variant="standard"
                    id="edit_workshop_capacity_field"
                    inputProps={{
                      automationId: "edit_workshop_capacity_field",
                    }}
                    label="Capacity"
                    type="number"
                    value={updatedWorkshop.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                  />
                ) : (
                  <Typography variant="body1">
                    Capacity : {updatedWorkshop.enrollCount}/
                    {updatedWorkshop.capacity}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {isEditMode && updatedWorkshop.venue === "Online" && (
                  <TextField
                    variant="standard"
                    fullWidth
                    id="edit_workshop_meetingURL_field"
                    inputProps={{
                      automationId: "edit_workshop_meetingURL_field",
                    }}
                    label="Meeting URL"
                    type="text"
                    value={updatedWorkshop.meetingURL}
                    onChange={(e) => handleChange("meetingURL", e.target.value)}
                  />
                )}
                {!isEditMode && workshop.venue === "Online" && (
                  <Typography variant="body1">
                    Meeting URL :
                    <a
                      href={workshop.meetingURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join here
                    </a>
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
          <ToastContainer />
          <NotifyWorkshop
            open={openNotifyMessageDialog}
            onClose={handleCloseNotifyMessage}
            workshopId={workshopId}
          />
        </Container>
        {userState.user.userId === workshop.createdUserId && (
          <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Paper
              elevation={3}
              sx={{ marginTop: "10px", padding: 3, position: "relative" }}
            >
              <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                {" "}
                Registered Users{" "}
              </Typography>
              {/* <UsersTable data={workshop.registeredUsers} columns={columns} /> */}
            </Paper>
          </Container>
        )}
      </Container>
    </>
  );
};

export default ViewWorkshop;
