import AddWorkshop from "./AddWorkshop";
import RegisteredWorkshops from "./Registered/RegisteredWorkshops";
import SearchWorkshop from "./Search/SearchWorkshop";
import ViewWorkshop from "./ViewWorkshop";
import "./Workshop.css";
import RequestedWorkshops from "./Request/RequestedWorkshops";
import WorkshopDetails from "./WorkshopDetails";
import UpdateWorkshop from "./UpdateWorkshop";

const WorkshopComponent = (props) => {
  const { path } = props;
  if (path === "/create-workshop") {
    return <AddWorkshop />;
  } else if (path === "/update-workshop") {
    return <UpdateWorkshop />;
  } else if (path === "/workshop") {
    return <SearchWorkshop />;
  } else if (path === "/view-registered-workshops") {
    return <RegisteredWorkshops />;
  } else if (path === "/view-workshop") {
    return <WorkshopDetails />;
  } else if (path === "/view-requested-workshops") {
    return <RequestedWorkshops />;
  } else {
    return <div>Workshop Component {path}</div>;
  }
};
export default WorkshopComponent;
