import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";


const changeAvailability = async (req,res) => {
    try{
        const { docId } = req.body;

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available });
        res.json({success:true, message:'Availability Changed'});
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}


//API for getting all the doctors list
const doctorList = async (req,res) => {
    try{
        const doctors = await doctorModel.find({}).select('-password');
        res.json({success:true,doctors})
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//API for doctor login
const loginDoctor = async (req,res) => {
    try {
        const { email, password} = req.body;
        const doctor = await doctorModel.findOne({email});

        if(!doctor){
            return res.json({success:false, message:"Invalid doctor email."})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if(isMatch){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET);

            res.json({success:true,token})
        } else {
            return res.json({success:false, message:"Invalid doctor password."})
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req,res) =>{
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });

            res.json({success:true, appointments});

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//API to mark appointment completed
const appintmentComplete = async (req,res) => {
    try{
        const {docId, appointmentId} = req.body;
        const appintmentData = await appointmentModel.findById(appointmentId);

        if(appintmentData && appintmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true});
            return res.json({success:true,message:"Appointment completed"});
        }else{
            return res.json({success:false,message:"Mark Failed"});
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//API to cancel appointment 
const cancelAppointment = async (req,res) => {
    try{
        const {docId, appointmentId} = req.body;
        const appintmentData = await appointmentModel.findById(appointmentId);

        if(appintmentData && appintmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});
            return res.json({success:true,message:"Appointment Cancelled"});
        }else{
            return res.json({success:false,message:"Cancellation Failed"});
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//API to get Doctor Dashboard data
const doctorDashboard = async (req,res) => {
    try{
        const {docId} = req.body;
        const appointments = await appointmentModel.find({docId});
        let earnings = 0;

        appointments.map((item) => {
            if(item.isCompleted || item.payment){
                earnings += item.amount;
            }
        })

        let patients = [];
        appointments.map((item) => {
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData});

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// API to get docter profile
const doctorProfile = async (req,res) => {
    try{
        const {docId} = req.body;
        const docProfile = await doctorModel.findById(docId).select('-password');

        res.json({success:true,docProfile})

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//API to update docProfile data
const updateDocProfile = async (req,res) => {
    try{
        const {docId, fees, address, available} = req.body;
        await doctorModel.findByIdAndUpdate(docId, {fees, address, available});

        res.json({success:true,message:"Profile Updated"})

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appintmentComplete, cancelAppointment, doctorDashboard, doctorProfile, updateDocProfile } 