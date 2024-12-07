import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  Box,
  Typography,
  Autocomplete,
  Paper,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useDispatch, useSelector } from "react-redux";
import { LoadingPage } from "../Loading/Loading";
import {
  convertTimetoLocalDateTime,
  convertToDateFormat,
  sessionUnAuthCheck,
} from "../../utils/Common";
import { createWorkshop } from "../../store/actions/WorkshopActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const AddWorkshop = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  //   const userSkills = useSelector((state) => state?.user?.value?.user?.skills);
  const user = useSelector((state) => state?.user?.value?.user);
  const instructor = user.firstName + " " + user.lastName;
  const venues = useSelector((state) => state?.admin?.value?.venues);
  const getSession = useSelector(
    (state) => state?.user?.value?.user?.session?.sessionId
  );
  // Form field states
  const [workshopName, setWorkshopName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [venue, setVenue] = useState(null);
  const [workshopDate, setWorkshopDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [capacity, setCapacity] = useState(30);
  const [showOtherSkillField, setShowOtherSkillField] = useState(false);
  const [otherSkill, setOtherSkill] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!workshopName) newErrors.workshopName = "Title is required";
    if (description.length > 3000)
      newErrors.description = "Description cannot exceed 3000 characters";
    if (selectedSkills.length < 1)
      newErrors.selectedSkills = "At least 1 skill should be selected";
    if (!venue) newErrors.venue = "Location is required";
    if (!workshopDate) newErrors.workshopDate = "Date is required";
    if (!startTime) newErrors.startTime = "Start Time is required";
    if (!endTime) {
      newErrors.endTime = "End Time is required";
    } else if (new Date(endTime) <= new Date(startTime)) {
      newErrors.endTime = "End time should be after Start time";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Save the file object itself for sending to backend
      setPreview(URL.createObjectURL(file)); // Generate URL for preview
    }
  };

  const onSubmit = async () => {
    if (!validateForm()) return;
    console.log(workshopDate, startTime, "workshopDate, startTime");
    const data = {
      title: workshopName,
      description,
      createdUser: instructor,
      selectedSkills,
      venue: venue?.venueName,
      date: convertToDateFormat(workshopDate).split("T")[0],
      startTime: convertTimetoLocalDateTime(workshopDate, startTime),
      endTime: convertTimetoLocalDateTime(workshopDate, endTime),
      capacity: isNaN(capacity) ? 30 : Number.parseInt(capacity),
      image: image,
    };
    try {
      const response = await createWorkshop(data, getSession);
      // dispatch(addToWorkshops(response));
      toast.success("Workshop Created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        closeButton: false,
        draggable: false,
      });
      clearForm();
      navigate(`/home`);
    } catch (error) {
      console.error("Error creating Workshop :", error);
      sessionUnAuthCheck(error) && navigate("/logout");
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
  };

  const userSkills = [
    { skillId: "1", skillName: "JavaScript" },
    { skillId: "2", skillName: "React" },
    { skillId: "3", skillName: "Python" },
    { skillId: "4", skillName: "Angular" },
    { skillId: "5", skillName: "AWS" },
    { skillId: "6", skillName: "NodeJS" },
    { skillId: "7", skillName: "Other" },
  ];

  // const handleRegister = () => {
  //   alert("Registered for Workshop!");
  // };

  // const handleView = () => {
  //   alert("Viewing Workshop Details!");
  // };
  const clearForm = () => {
    setWorkshopName("");
    setDescription("");
    setSelectedSkills([]);
    setVenue(null);
    setWorkshopDate(null);
    setStartTime(null);
    setEndTime(null);
    setCapacity(30);
    setErrors({});
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <Box p={2} className="workshop_page">
          <Typography variant="h6" gutterBottom>
            Create Workshop
          </Typography>
          <Paper elevation={5} style={{ padding: 20, textAlign: "center" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Workshop Title *"
                    value={workshopName}
                    onChange={(e) => setWorkshopName(e.target.value)}
                    error={!!errors.workshopName}
                    helperText={errors.workshopName}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Description"
                    multiline
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={!!errors.description}
                    helperText={errors.description}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Button
                    fullWidth
                    variant="contained"
                    component="label"
                    sx={{ display: "block", textAlign: "center", py: 2 }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                  {image && (
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ marginTop: "10px", maxWidth: "35%" }}
                    />
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    multiple
                    options={userSkills}
                    getOptionLabel={(option) => option.skillName}
                    value={selectedSkills}
                    onChange={(e, newValue) => {
                      const otherSelected = newValue.some(
                        (skill) => skill.skillName === "Other"
                      );

                      // Remove "Other" if already present and a custom skill is being entered
                      if (otherSelected && otherSkill.trim()) {
                        const customSkill = {
                          skillId: Date.now().toString(), // Unique ID
                          skillName: otherSkill.trim(),
                        };
                        setSelectedSkills([
                          ...newValue.filter(
                            (skill) => skill.skillName !== "Other"
                          ),
                          customSkill,
                        ]);
                        setOtherSkill(""); // Clear custom skill field
                      } else {
                        setSelectedSkills(newValue);
                      }

                      setShowOtherSkillField(otherSelected);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Skills *"
                        error={!!errors.selectedSkills}
                        helperText={errors.selectedSkills}
                      />
                    )}
                  />
                </FormControl>
                {showOtherSkillField && (
                  <TextField
                    label="Enter Custom Skill"
                    value={otherSkill}
                    onChange={(e) => setOtherSkill(e.target.value)}
                    onBlur={() => {
                      if (otherSkill.trim()) {
                        const customSkill = {
                          skillId: Date.now().toString(), // Unique ID
                          skillName: otherSkill.trim(),
                        };
                        setSelectedSkills([
                          ...selectedSkills.filter(
                            (skill) => skill.skillName !== "Other"
                          ),
                          customSkill,
                        ]);
                        setOtherSkill(""); // Clear input
                        setShowOtherSkillField(false); // Hide input
                      }
                    }}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={venues || []} 
                    getOptionLabel={(option) => option.venueName || ""} 
                    value={venue}
                    onChange={(e, newValue) => setVenue(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Location *"
                        error={!!errors.venue}
                        helperText={errors.venue}
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Capacity"
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    error={!!errors.capacity}
                    helperText={errors.capacity}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Workshop Date *"
                      disablePast
                      value={workshopDate}
                      onChange={(date) => setWorkshopDate(date)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.workshopDate}
                          helperText={errors.workshopDate}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Start Time *"
                      value={startTime}
                      onChange={(time) => {
                        setStartTime(time);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.startTime}
                          helperText={errors.startTime}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="End Time *"
                      value={endTime}
                      onChange={(time) => setEndTime(time)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.endTime}
                          helperText={errors.endTime}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              style={{ marginTop: 20 }}
            >
              Submit
            </Button>
            <ToastContainer />
          </Paper>
        </Box>
      </form>
    </>
  );
};

export default AddWorkshop;
