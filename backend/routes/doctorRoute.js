import express from "express";
import { doctorList, loginDoctor, appointmentsDoctor, appintmentComplete, cancelAppointment, doctorDashboard, doctorProfile, updateDocProfile } from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";


const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor);
doctorRouter.post('/complete-appointment', authDoctor, appintmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, cancelAppointment);
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);
doctorRouter.get('/profile', authDoctor, doctorProfile);
doctorRouter.post('/profile-update', authDoctor, updateDocProfile);


export default doctorRouter;