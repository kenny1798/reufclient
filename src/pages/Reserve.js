import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReserveConfirm from "./ReserveConfirm";

function Reserve() {
  const [pax, setPax] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSession, setSelectedSession] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [unavailableDates, setUnavalableDates] = useState([]);
  let slicedDate;

  if(!selectedDate){
    slicedDate = ""
  }else{

    slicedDate = String(selectedDate).slice(0, 15);
  }
  



  var today = new Date();
  today.setDate(today.getDate() - 1);
  var threeMonths = new Date(Date.now());
  threeMonths.setMonth(threeMonths.getMonth() + 3);

  const paxChange = () => {
    setSelectedDate(null)
    setSelectedSession("")
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  

  return (
    <div>
      <div
        className="row justify-content-center min-vh-100"
        style={{ backgroundColor: "#ececec" }}
      >
        <div
          className="col-lg-8 min-vh-100"
        >
          <div
            className="min-vh-100 text-center"
          >
            <div className="title"> 
              <div className="subtitle" style={{ paddingTop: "7%" }}>
                Reservation
              </div>
              <h2>@ REUF</h2>
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="card mx-3 mt-3">
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-lg-8 text-start">
                        <div className="mb-4 ">
                            <label>Number of Pax</label>
                            <select className="form-select" onChange={(event) => {
                              setPax(event.target.value)
                              paxChange()
                              }}>
                              <option value="0">Select number of pax..</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                            </select>
                          </div>
                          {parseInt(pax, 10) > 0 ? (<>
                          <div className="mb-3">
                            <label>Select Date</label><br/>
                            <DatePicker
                            showIcon
                            icon="fa fa-calendar"
                            placeholderText="Click Here to Select Date"
                                className="form-control mx-2"
                                selected={selectedDate}
                                inline
                                onChange={handleDateChange}
                                filterDate={date => {
                                    if(date.getMonth)
                                    if (date.getDay() === 1) {                                 
                                    return false;
                                    }
                                    if(date <  today){
                                        return false;
                                    }
                                    if(date >  threeMonths){
                                        return false;
                                    }
                                
                                    const formattedDate = date.toISOString().split('T')[0];
                                    return !unavailableDates.includes(formattedDate);
                                }}
                                
                                />
                          <input type="text" className="form-control mt-3" value={slicedDate} disabled />
                          </div>
                          </>) : (<></>)}
                          {!selectedDate ? (<></>) : (<><div className="mb-3">
                            <label>Select Session</label>
                            <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='3-5PM' onClick={(event) => {setSelectedSession(event.target.value)}}/>
                            <label className="form-check-label">
                                3-5PM
                            </label>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value='6-8PM' onClick={(event) => {setSelectedSession(event.target.value)}}/>
                            <label className="form-check-label">
                                6-8PM
                            </label>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value='9-11PM' onClick={(event) => {setSelectedSession(event.target.value)}}/>
                            <label className="form-check-label">
                                9-11PM
                            </label>
                            </div>
                          </div> </>)}
                          {selectedSession === "" ?(<></>) : (<><div className="mb-3">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={(event) => {setName(event.target.value)}} required/>
                          </div>
                          <div className="mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" onChange={(event) => {setEmail(event.target.value)}} required/>
                          </div>
                          <div className="mb-3">
                            <label>Phone Number</label>
                            <input type="number" className="form-control" onChange={(event) => {setPhoneNumber(event.target.value)}}  required/>
                          </div>  </>)}
                          {name === "" || phoneNumber === "" || email === "" || selectedSession === "" || !selectedDate || parseInt(pax, 10) < 1 ? (<></>): (<div className="col-lg-12 text-center"><ReserveConfirm data={{pax: pax, selectedDate: String(selectedDate), selectedSession: selectedSession, name: name, email: email, phoneNumber: phoneNumber}} />  </div>) }
                                               
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reserve;
