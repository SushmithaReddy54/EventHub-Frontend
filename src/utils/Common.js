import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const convertTimetoLocalDateTime = (dateTo, time) => {
  const hrMM = new Date(time);
  const [hours, minutes] = [hrMM.getHours(), hrMM.getMinutes()];
  const inputDate = new Date(dateTo);
  const date = new Date();
  date.setMonth(String(inputDate.getMonth()));
  date.setDate(String(inputDate.getDate()));
  date.setFullYear(inputDate.getFullYear());
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  const USDateTime = date.toLocaleString("en-US");
  const finalDate = new Date(USDateTime);
  const formattedDate = `${finalDate.getFullYear()}-${padZero(
    finalDate.getMonth() + 1
  )}-${padZero(finalDate.getDate())}T${padZero(finalDate.getHours())}:${padZero(
    finalDate.getMinutes()
  )}:${padZero(finalDate.getSeconds())}`;

  function padZero(number) {
    return number.toString().padStart(2, "0");
  }
  return formattedDate;
};

export const convertToDateFormat = (dateTo) => {
  const date = new Date(dateTo);
  return date.toISOString();
};

export const sessionUnAuthCheck = (error) => {
  return error?.response?.data?.status === 401;
};

export const convertTOWorkshopDateFormat = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);

  const formattedDateTime = dateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDateTime;
};

export const getDuration = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const durationInMilliseconds = end - start;

  // Convert the duration to hours and minutes
  const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  let durationString = "";
  if (hours > 0) {
    durationString += `${hours} hr`;
  }
  if (minutes > 0) {
    durationString += ` ${minutes} min`;
  }

  return durationString.trim();
};

export const DefaultColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterClick = (e) => {
    e.stopPropagation();
  };

  return (
    <TextField
      size="small"
      fullWidth
      variant="standard"
      placeholder="search"
      value={filterValue || ""}
      onChange={handleFilterChange}
      onClick={handleFilterClick}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export function getTimelineStatus(startTime, endTime) {
  const currentTime = new Date();
  if (startTime < currentTime && endTime <= currentTime) {
    return "Completed";
  } else if (startTime <= currentTime && endTime >= currentTime) {
    return "Ongoing";
  } else {
    return "Upcoming";
  }
}

export const displayName = (name) => {
  if (name.length > 28) {
    return name.slice(0, 28) + "...";
  } else {
    return name;
  }
};
