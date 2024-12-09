import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";
import { LandingPage } from "./components/preLogins/LandingPage";
import React from "react";
import ResetComponent from "./components/preLogins/ResetPassword/ResetPasswordComponent";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" exact element={<LandingPage loader="login" />} />
          <Route
            path="/signup"
            exact
            element={<LandingPage loader="signup" />}
          />
          <Route
            path="/reset-password/:userId/:token"
            element={<ResetComponent />}
          />
          <Route
            path="/forget-password"
            exact
            element={<LandingPage loader="forget-password" />}
          />
          <Route path="*" element={<PrivateRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
