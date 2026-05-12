
// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());



mongoose.connect(
  "mongodb://localhost:27017/hospitalDB"
);




const Patient = mongoose.model("Patient", {

  patient: String,

  doctor: String,

  token: String,

  status: String

});




// CREATE
app.post("/patient", async function (req, res) {

  const newPatient = new Patient({

    patient: req.body.patient,

    doctor: req.body.doctor,

    token: req.body.token,

    status: req.body.status

  });

  await newPatient.save();

  res.json(newPatient);

});




// GET
app.get("/patients", async function (req, res) {

  const patients = await Patient.find();

  res.json(patients);

});




// UPDATE
app.put("/patient/:id", async function (req, res) {

  await Patient.findByIdAndUpdate(

    req.params.id,

    {
      status: req.body.status
    }

  );

  res.json({
    message: "Updated"
  });

});




// DELETE
app.delete("/patient/:id", async function (req, res) {

  await Patient.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted"
  });

});




// STATS
app.get("/stats", async function (req, res) {

  const patients = await Patient.find();

  let waiting = 0;

  let consultation = 0;

  let completed = 0;



  patients.forEach(function (item) {

    if (item.status === "Waiting") {

      waiting++;

    }

    if (
      item.status === "In Consultation"
    ) {

      consultation++;

    }

    if (item.status === "Completed") {

      completed++;

    }

  });




  res.json({

    total: patients.length,

    waiting: waiting,

    consultation: consultation,

    completed: completed

  });

});




app.listen(5000, function () {

  console.log(
    "Server Running On Port 5000"
  );

});

