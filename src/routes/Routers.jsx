import Dashboard from "../pages/Dashboard";

import Login from "../pages/Login";

import { Routes, Route } from "react-router-dom";
import ToDoList from "../pages/ToDoList";
import PatientsList from "../pages/PatientsList";
import AddPatient from "../pages/AddPatient";
import ProtectedRouter from "../components/ProtectedRouter";
import PublicRoute from "../components/PublicRoute";
import Calendar from "../pages/Calendar";
import Appointement from "../pages/Appointement";
import PatientsProfiles from "../pages/PatientsProfiles";
import PatientDetails from "../pages/PatientDetails";
import EditPatient from "../pages/EditPatient";
import AddConsultation from "../pages/AddConsultation";
import UpdateConsultation from "./../pages/UpdateConsultation";
import CalenderAddAppointement from "../pages/CalendarAddAppointement";
import ConsultationDetails from "../pages/ConsultationDetails";
import PatientDashboard from "../pages/PatientDashboard";
import DoctorProfile from "../pages/DoctorProfile";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

import ProviderList from "../pages/ProviderList";
import AssistantList from "../pages/AssistantList";
import Predict from "../pages/Predict";
import PatientProfile from "../pages/PatientProfile";

function Routers() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouter>
                <DoctorProfile />
              </ProtectedRouter>
            }
          />
          <Route
            path="/predict"
            element={
              <ProtectedRouter>
                <Predict />
              </ProtectedRouter>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouter>
                <Dashboard />
              </ProtectedRouter>
            }
          />
          <Route
            path="/calender"
            element={
              <ProtectedRouter>
                <Calendar />
              </ProtectedRouter>
            }
          />
          <Route
            path="/calenderAddAppointement/:patientId"
            element={
              <ProtectedRouter>
                <CalenderAddAppointement />
              </ProtectedRouter>
            }
          />
          <Route
            path="/patientslist"
            element={
              <ProtectedRouter>
                <PatientsList />
              </ProtectedRouter>
            }
          />
          <Route
            path="/patient/:patientId"
            element={
              <ProtectedRouter>
                <PatientDetails />
              </ProtectedRouter>
            }
          />
          <Route
            path="/profilePatient/:patientId"
            element={
              <ProtectedRouter>
                <PatientProfile />
              </ProtectedRouter>
            }
          />
          <Route
            path="/consultation/:consultationId"
            element={
              <ProtectedRouter>
                <ConsultationDetails />
              </ProtectedRouter>
            }
          />
          <Route
            path="/consultations/edit/:consultationId"
            element={
              <ProtectedRouter>
                <UpdateConsultation />
              </ProtectedRouter>
            }
          />
          <Route
            path="/patient/:patientId/add-consultation"
            element={
              <ProtectedRouter>
                <AddConsultation />
              </ProtectedRouter>
            }
          />

          <Route
            path="/appointement"
            element={
              <ProtectedRouter>
                <Appointement />
              </ProtectedRouter>
            }
          />
          <Route
            path="/addpatient"
            element={
              <ProtectedRouter>
                <AddPatient />
              </ProtectedRouter>
            }
          />
          <Route
            path="/edit-patient/:id"
            element={
              <ProtectedRouter>
                <EditPatient />
              </ProtectedRouter>
            }
          />
          <Route
            path="/patientsprofiles"
            element={
              <ProtectedRouter>
                <PatientsProfiles />
              </ProtectedRouter>
            }
          />
          <Route
            path="/providerList"
            element={
              <ProtectedRouter>
                <ProviderList />
              </ProtectedRouter>
            }
          />
          <Route
            path="/todolist"
            element={
              <ProtectedRouter>
                <ToDoList />
              </ProtectedRouter>
            }
          />
          <Route
            path="/assistantlist"
            element={
              <ProtectedRouter>
                <AssistantList />
              </ProtectedRouter>
            }
          />
          <Route
            path="/patient/:patientId/patientDashboard"
            element={
              <ProtectedRouter>
                <PatientDashboard />
              </ProtectedRouter>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default Routers;
