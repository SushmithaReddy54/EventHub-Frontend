import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

const WorkshopCard = ({
  imageUrl,
  title,
  description,
  isAlreadyRegistered,
  onRegister,
  onDropout,
  from,
  onView,
}) => {
  const [imageUrl1, setImageUrl] = useState("");

  const convertToBase64 = (binaryData, contentType) => {
    try {
      const base64String = btoa(
        new Uint8Array(binaryData).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:${contentType};base64,${base64String}`;
    } catch (error) {
      console.error("Error while encoding image data:", error);
    }
  };

  useEffect(() => {
    if (imageUrl && imageUrl?.data && imageUrl?.contentType) {
      try {
        const base64Image = convertToBase64(
          imageUrl.data.data,
          imageUrl.contentType
        );
        setImageUrl(base64Image);
      } catch (error) {
        console.error("Error while encoding image data:", error);
      }
    }
  }, [imageUrl]);
  return (
    <Card sx={{ maxWidth: 345, margin: "auto", boxShadow: 3, borderRadius: 2 }}>
      <CardMedia component="img" height="140" image={imageUrl1} alt={title} />
      <CardContent sx={{ height: 120, overflow: "hidden" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          color="dark"
          fontWeight="bold"
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ overflow: "hidden" }}
        >
          {description?.length > 20
            ? `${description?.substring(0, 20)}...`
            : description}
        </Typography>
      </CardContent>

      {/* Buttons */}
      <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
        {isAlreadyRegistered ? (
          <Button
            variant="contained"
            color="error"
            // disabled={from === "list"}
            onClick={onDropout}
            sx={{ borderRadius: 1, textTransform: "none" }}
          >
            {from === "list" ? "Enrolled" : "Drop out"}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            onClick={onRegister}
            sx={{ borderRadius: 1, textTransform: "none", bgcolor: "#4baac2" }}
          >
            Enroll
          </Button>
        )}
        <Button
          variant="outlined"
          color="error"
          onClick={onView}
          sx={{
            borderRadius: 1,
            textTransform: "none",
            color: "#4baac2",
            border: "2px solid #4baac2",
          }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default WorkshopCard;
