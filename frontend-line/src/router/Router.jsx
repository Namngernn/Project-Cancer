import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import BloodResults from "../pages/BloodResults/BloodResults";
import Appointment from "../pages/Appointment/Appointment";
import Contacts from "../pages/Contacts/Contacts";
import Effects from "../pages/Effects/Effects";
import PatientManual from "../pages/PatientManual/PatientManual";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AppointmentDetails from "../pages/Appointment/AppointmentDetails";
import PostponeAppointment from "../pages/Appointment/PostponeAppointment";
import FillResults from "../pages/BloodResults/FillResults";
import AddEffects from "../pages/Effects/AddEffects";
import DisplayBloodResults from "../pages/BloodResults/DisplayBloodResults";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/BloodResults",
          element: <BloodResults/>
        },
        {
          path: "/BloodResults/FillResults",
          element: <FillResults/>
        },
        {
          path: "/BloodResults/DisplayBloodResults",
          element: <DisplayBloodResults/>
        },
        {
          path: "/Appointment",
          element: <Appointment/>,
        },
        {
          path: "/Appointment/AppointmentDetails",
          element: <AppointmentDetails/>,
        },
        {
          path: "/Appointment/PostponeAppointment",
          element: <PostponeAppointment/>,
        },
        {
          path: "/Contacts",
          element: <Contacts/>
        },
        {
          path: "/Effects",
          element: <Effects/>
        },
        {
          path: "/Effects/AddEffects",
          element: <AddEffects/>
        },
        {
          path: "/PatientManual",
          element: <PatientManual/>
        },
        {
          path: "/Login",
          element: <Login/>,
        },
        {
          path: "/Register",
          element: <Register/>,
        }
      ]
    }
  ]);

export default router;