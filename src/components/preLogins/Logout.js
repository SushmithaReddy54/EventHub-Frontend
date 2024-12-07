import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router";
import { doLogout } from "../../store/reducers/UserReducers";
import { doLogout as logout } from "../../store/actions/PreLoginActions";
import { useState } from "react";
import { clearAllWorkshops } from "../../store/reducers/WorkshopReducers";

export const Logout = () => {
  const dispatch = useDispatch();
  const [isLogout, setIsLogout] = useState(false);
  const userState = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      setIsLogout(true);
      dispatch(doLogout());
      dispatch(clearAllWorkshops());
      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 1000);
    };
    if (!isLogout) {
      performLogout();
    }
  }, [isLogout, dispatch, navigate, userState?.user?.session?.sessionId]);

  return <></>;
};
