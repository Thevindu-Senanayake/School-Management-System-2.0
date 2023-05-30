import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

// auth imports
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Admin imports
import AdminChat from './components/chat/AdminChat';
import AllUsers from './components/pages/admin/AllUsers';
import UpdateProfile from './components/pages/admin/UpdateProfile';
import Attendance from './components/pages/admin/Attendance';

// User imports
import UserChat from './components/chat/UserChat';
import MarkAttendance from './components/pages/MarkAttendance';
import ViewAttendance from './components/pages/ViewAttendance';

import ProtectedRoutes from './components/routes/ProtectedRoutes';
import NotFound from './components/layout/NotFound';

import { loadUser } from './redux/dispatchers/authDispatcher';
import { store } from './redux/app/store';
import Home from './components/Home';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
            <Route
              exact
              path="/all-users"
              element={
                <ProtectedRoutes isAdmin={true}>
                  <AllUsers />
                </ProtectedRoutes>
              }
            />
            <Route
              exact
              path="/edit-profile"
              element={
                <ProtectedRoutes isAdmin={true}>
                  <UpdateProfile />
                </ProtectedRoutes>
              }
            />
            <Route
              exact
              path="/admin/chat"
              element={
                <ProtectedRoutes isAdmin={true}>
                  <AdminChat />
                </ProtectedRoutes>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <ProtectedRoutes isAdmin={true}>
                  <Register />
                </ProtectedRoutes>
              }
            />
            <Route
              exact
              path="/chat"
              element={
                <ProtectedRoutes>
                  <UserChat />
                </ProtectedRoutes>
              }
            />
            <Route
              exact
              path="/attendance/mark"
              element={
                <ProtectedRoutes>
                  <MarkAttendance />
                </ProtectedRoutes>
              }
            />
            <Route
              exact
              path="/attendance/view"
              element={
                <ProtectedRoutes>
                  <ViewAttendance />
                </ProtectedRoutes>
              }
            />
            <Route
              exact
              path="/attendance"
              element={
                <ProtectedRoutes>
                  <Attendance />
                </ProtectedRoutes>
              }
            />
            <Route exact path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
