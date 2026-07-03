import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [token, setToken] = useState("");

  const [patients, setPatients] = useState([]);

  const [showForm, setShowForm] = useState(false);


  async function fetchData() {

    const response = await axios.get(
      "http://localhost:5000/patients"
    );

    setPatients(response.data);

  }



  useEffect(function () {

    fetchData();

  }, []);


  async function addPatient() {

    if (patient === "") {
      return;
    }

    await axios.post(
      "http://localhost:5000/patient",
      {
        patient: patient,
        doctor: doctor,
        token: token,
        status: "Waiting"
      }
    );

    setPatient("");
    setDoctor("");
    setToken("");

    setShowForm(false);

    fetchData();
  }


  async function updateStatus(id, status) {

    await axios.put(
      "http://localhost:5000/patient/" + id,
      {
        status: status
      }
    );

    fetchData();
  }


  async function deletePatient(id) {

    await axios.delete(
      "http://localhost:5000/patient/" + id
    );

    fetchData();
  }


  return (

    <div className="mainContainer">

      <div className="sidebar">

        <div>

          <h1>
            MediQueue
          </h1>

        </div>


        <div className="quoteBox">

          <h3>
            Healthcare Note
          </h3>

          <p>
            “Wherever the art of medicine
            is loved, there is also a love
            of humanity.”
          </p>

          <p>
            Efficient queue management
            improves patient experience
            and hospital workflow.
          </p>

        </div>

      </div>


      <div className="content">

        <div className="hero">

          <div>

            <h1>
              Welcome Back, Admin 
            </h1>

            <p>
              Smart Hospital Queue
              Management System
            </p>

          </div>



          <button
            className="addBtn"
            onClick={function () {

              setShowForm(!showForm);

            }}
          >
            + Register Patient
          </button>

        </div>

        {
          showForm && (

            <div className="formPopup">

              <input
                type="text"
                placeholder="Patient Name"
                value={patient}
                onChange={function (e) {

                  setPatient(e.target.value);

                }}
              />



              <input
                type="text"
                placeholder="Doctor Name"
                value={doctor}
                onChange={function (e) {

                  setDoctor(e.target.value);

                }}
              />



              <input
                type="number"
                placeholder="Token Number"
                value={token}
                onChange={function (e) {

                  setToken(e.target.value);

                }}
              />



              <button onClick={addPatient}>
                Add Patient
              </button>

            </div>
          )
        }


        <div className="section">

          <h2>
            Waiting Area
          </h2>


          {
            patients.filter(function (item) {

              return item.status === "Waiting";

            }).length === 0 && (

              <div className="empty">

                No Patients Waiting

              </div>
            )
          }



          {
            patients.map(function (item) {

              if (item.status === "Waiting") {

                return (

                  <div
                    className="queueCard"
                    key={item._id}
                  >

                    <div>

                      <h3>
                        {item.patient}
                      </h3>

                      <p>
                        Doctor:
                        {item.doctor}
                      </p>

                    </div>



                    <div className="rightSide">

                      <span>
                        {item.token}
                      </span>

                      <button
                        onClick={function () {

                          updateStatus(
                            item._id,
                            "Consultation"
                          );

                        }}
                      >
                        Start
                      </button>

                    </div>

                  </div>

                );

              }

              return null;

            })
          }

        </div>

        <div className="section">

          <h2>
            Consultation Room
          </h2>


          {
            patients.filter(function (item) {

              return item.status ===
              "Consultation";

            }).length === 0 && (

              <div className="empty">

                No Active Consultation

              </div>
            )
          }



          {
            patients.map(function (item) {

              if (
                item.status ===
                "Consultation"
              ) {

                return (

                  <div
                    className="queueCard blueCard"
                    key={item._id}
                  >

                    <div>

                      <h3>
                        {item.patient}
                      </h3>

                      <p>
                        Doctor:
                        {item.doctor}
                      </p>

                    </div>



                    <div className="rightSide">

                      <span>
                        {item.token}
                      </span>

                      <button
                        onClick={function () {

                          updateStatus(
                            item._id,
                            "Completed"
                          );

                        }}
                      >
                        Complete
                      </button>

                    </div>

                  </div>

                );

              }

              return null;

            })
          }

        </div>


        <div className="section">

          <h2>
            Completed Visits
          </h2>


          {
            patients.filter(function (item) {

              return item.status ===
              "Completed";

            }).length === 0 && (

              <div className="empty">

                No Completed Visits

              </div>
            )
          }



          {
            patients.map(function (item) {

              if (
                item.status ===
                "Completed"
              ) {

                return (

                  <div
                    className="queueCard greenCard"
                    key={item._id}
                  >

                    <div>

                      <h3>
                        {item.patient}
                      </h3>

                      <p>
                        Doctor:
                        {item.doctor}
                      </p>

                    </div>



                    <div className="rightSide">

                      <span>
                        {item.token}
                      </span>

                      <button
                        className="deleteBtn"
                        onClick={function () {

                          deletePatient(item._id);

                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                );

              }

              return null;

            })
          }

        </div>


      </div>

    </div>
  );
}

export default App;
