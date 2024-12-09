import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "../Home/Home.css";
import EH_logo from "../../assets/EH_logo.png";
import {
  userNavLeftPages,
  userNavRightPages,
  userNavMenu,
} from "../../utils/UserAccess";
import { useState } from "react";
import { useNavigate } from "react-router";
import RequestWorkshop from "../Workshop/Request/RequestWorkshop";
import { requestWorkshop } from "../../store/actions/WorkshopActions";
import { ToastContainer, toast } from "react-toastify";
import { sessionUnAuthCheck } from "../../utils/Common";
import { Logout } from "../preLogins/Logout";

function NavigationBar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCont, setAnchorElCont] = useState(null);
  const [content, setContent] = useState(null);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const { user } = props;
  let pages;
  let profiles;
  let navMenu;
  if (user) {
    pages = Object.entries(userNavLeftPages[user?.userRole]);
    profiles = Object.entries(userNavRightPages);
    navMenu = Object.entries(userNavMenu[user?.userRole]);
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenContMenu = (event) => {
    setAnchorElCont(event.currentTarget);
  };

  const handleCloseContMenu = (event) => {
    setAnchorElCont(null);
    setAnchorElNav(null);
  };

  const handleMenuItemClick = (data, menu, isContent) => {
    if (isContent) {
      setContent(Object.entries(data));
    } else {
      if (data === "/request-workshop") {
        handleOpenDialog();
      } else {
        navigate(data);
      }
    }
    menu();
  };

  const handleRequestWorkshop = async (data) => {
    try {
      const response = await requestWorkshop(data);
      if (response.data === true) {
        toast.success("Workshop Requested Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: true,
          closeOnClick: true,
          closeButton: false,
          draggable: false,
        });
      } else {
        toast.error("Workshop Request Failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: true,
          closeOnClick: true,
          closeButton: false,
          draggable: false,
        });
      }
    } catch (error) {
      console.error("Error : ", error);
      sessionUnAuthCheck(error) && navigate("/logout");
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: true,
        pauseOnHover: true,
        closeOnClick: false,
        closeButton: true,
        draggable: false,
      });
    }
    handleCloseDialog();
  };

  return (
    <AppBar id="home_navbar" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={EH_logo}
            alt="LOGO"
            id="home_logo"
            className="home_logo"
            automationId="home_logo"
          />
          <Typography
            key="1"
            className="home_app_name"
            automationId="home_app_name"
            variant="h6"
            href={"/home"}
            component={"a"}
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EventHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navMenu.map(([page, url]) => (
                <MenuItem
                  key={page}
                  onClick={() =>
                    handleMenuItemClick(url, handleCloseNavMenu, false)
                  }
                >
                  <Typography key="7" textAlign="center">
                    {page.replace("_", " ")}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            key="3"
            className="home_app_name"
            automationId="home_app_name"
            variant="h5"
            href="/home"
            component="a"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SKILL WORKSHOP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(([page, content]) =>
              content[0] === "/" ? (
                <Button
                  className="button_navbar"
                  key={page}
                  onClick={() => {
                    handleMenuItemClick(content, handleCloseNavMenu, false);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ) : (
                <Button className="button_navbar" onClick={handleOpenContMenu}>
                  <Button
                    className="in_button_navbar"
                    key={page}
                    onClick={() =>
                      handleMenuItemClick(content, handleCloseContMenu, true)
                    }
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                </Button>
              )
            )}
          </Box>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElCont}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElCont)}
            onClose={handleCloseContMenu}
          >
            {content?.map(([page, url]) => (
              <MenuItem
                key={page}
                onClick={() =>
                  handleMenuItemClick(url, handleCloseContMenu, false)
                }
              >
                <Typography key="6" textAlign="center">
                  {page.replace("_", " ")}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user?.firstName}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                automationId="home_user_avatar_button"
                onClick={handleOpenUserMenu}
              >
                <Avatar
                  automationId="home_user_avatar"
                  alt={user?.firstName}
                  src="/broken-image.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {profiles.map(([page, url]) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleMenuItemClick(url, handleCloseUserMenu, false);
                  }}
                >
                  <Typography
                    key="5"
                    textAlign="center"
                    automationId={`home_user_` + page}
                  >
                    {page.replace("_", " ")}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      <ToastContainer />
    </AppBar>
  );
}
export default NavigationBar;
