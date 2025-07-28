import { Box, Button, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "react-oauth2-code-pkce"
import { useDispatch } from "react-redux"
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router"
import { setCredentials } from "./store/authSlice"
import { ActivityForm } from "./components/ActivityForm"
import { ActivityList } from "./components/ActivityList"
import { ActivityDetail } from "./components/ActivityDetail"

const ActivitiesPage = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => {
    // Toggle flag to trigger re-fetch
    setRefreshFlag(prev => !prev);
  };
  return (<Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
    <ActivityForm onActivities={() => window.location.reload} onRefresh={triggerRefresh} />
    <ActivityList flag={refreshFlag} />
  </Box>)
}
function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext)
  const dispatch = useDispatch(false);
  const [authReady, setAuthReady] = useState()
  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch])

  return (
    <Router>
      {!token ? (
        <Box sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}>
          <Typography variant="h4" gutterBottom> Welcome to the AI Fitness Tracker App</Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}> Please login to access your activities</Typography>
          <Button variant="contained" color="primary" size="large" onClick={() => logIn()}>Login</Button>
        </Box>) : (
        // <div>
        // </div>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Button variant="contained" color="secondary" onClick={logOut}>
            LogOut
          </Button>
          <Routes>
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/" element={token ? <Navigate to="/activities" replace /> : <div>Welcome to please again</div>} />
          </Routes>
        </Box>
      )}
    </Router>
  )
}

export default App
