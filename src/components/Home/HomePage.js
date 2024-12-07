import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWorkshops } from "../../store/actions/WorkshopActions";
import { saveAllWorkshops } from "../../store/reducers/WorkshopReducers";
import { LoadingPage } from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import HomeAppContent from "./HomeAppContent";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import WorkshopList from "../Workshop/WorkshopList";

const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state?.user?.value.user) ?? [];
  const allWorkshops =
    useSelector((state) => state?.workshop?.value?.allWorkshops) ?? [];

  const navigate = useNavigate();

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const workshops = await getAllWorkshops();
        dispatch(saveAllWorkshops(workshops));
        setIsLoading(false);
      } catch (error) {
        console.error("Error : ", error);
        setIsLoading(false);
      }
    };
    getWorkshops();
  }, [isLoading]);

  const handleCardClick = (workshopData) => {
    navigate("/view-workshop", {
      state: { workshopId: workshopData.workshopId },
    });
  };

  const sortedWorkshops = isLoading
    ? []
    : [...allWorkshops]
        // .filter((data) => data.createdBy !== user._id)
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return (
    <div>
      <HomeAppContent />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Container
          className="mt-4"
          style={{
            padding: "10px",
            marginBottom: "20px",
            borderTopColor: "#4baac2",
            borderTopStyle: "solid",
          }}
        >
          <h5>Upcoming Workshops</h5>
          <WorkshopList workshops={sortedWorkshops}></WorkshopList>
        </Container>
      )}
    </div>
  );
};

export default HomePage;
