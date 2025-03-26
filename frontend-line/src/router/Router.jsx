import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import BloodResults from "../pages/BloodResults/BloodResults";
import Appointment from "../pages/Appointment/Appointment";
import Contacts from "../pages/Contacts/Contacts";
import PatientManual from "../pages/PatientManual/PatientManual";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AppointmentDetails from "../pages/Appointment/AppointmentDetails";
import PostponeAppointment from "../pages/Appointment/PostponeAppointment";
import FillResults from "../pages/BloodResults/FillResults";
import AddEffects from "../pages/Effects/AddEffects";
import Effects from "../pages/Effects/Effects";
import DetailEffect from "../pages/Effects/DetailEffect";
import DisplayBloodResults from "../pages/BloodResults/DisplayBloodResults";
import DisplayOtherResults from "../pages/BloodResults/DisplayOtherResults";
import Weight from "../pages/Effects/Weight";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Login/>
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
          path: "DisplayOtherResults",
          element: <DisplayOtherResults/>
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
          path: "/Appointment/PostponeAppointment/:appointId",
          element: <PostponeAppointment/>,
        },
        {
          path: "/Contacts",
          element: <Contacts/>
        },
        {
          path: "/AddEffects",
          element: <AddEffects/>
        },
        {
          path: "/Effects",
          element: <Effects/>
        },
        {
          path: "/DetailEffect/:feedbackId",
          element: <DetailEffect/>
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
        },
        {
          path: "/menu",
          element: <Home/>,
        },
        {
          path: "/weight",
          element: <Weight/>,
        },
      ]
    }
  ]);

export default router;