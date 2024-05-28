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
import ConsultationDetails from "c:/Users/INFOTEC/Desktop/Stage PFE 2023-2024/EMRS - Copie/frontend/src/pages/consultationDetails";

function Routers() {
  return (
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
        path="/todolist"
        element={
          <ProtectedRouter>
            <ToDoList />
          </ProtectedRouter>
        }
      />
    </Routes>
  );
}

export default Routers;
