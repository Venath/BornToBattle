import React, { useState } from "react";
import axios from "axios";
import "../styles/req.css";

export default function RequestForm() {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const addContent = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!fname.trim() || !lname.trim() || !email.trim() || !address1.trim() || !city.trim() || !state.trim() || !zip.trim() || !description.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const requestform = {
      fname,
      lname,
      email,
      address1,
      address2,
      city,
      state,
      zip,
      description,
    }

    axios
      .post("http://localhost:8020/requestform/add", requestform)
      .then(() => {
        alert("Request sent.");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <div className="overlay111">
        <img src="../../Images/iimg.jpg" alt="IDS" />
        <div className="overlay111-text">
          <h1 className="img_ga111">MEDIA CENTER</h1>
        </div>
      </div>
      <div className="overlay22">
        <div className="overlay22-text">
          <h1>MEDIA CREDENTIAL APPLICATION</h1>
        </div>
      </div>

      <div className="container111">
        <form className="form111" onSubmit={addContent}>
          <div className="row">
            <div className="col">
              <label className="black-label" htmlFor="FirstName">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                id="fname"
                value={fname}
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="black-label" htmlFor="LastName">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                id="lname"
                value={lname}
                onChange={(e) => setLName(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="black-label" htmlFor="inputEmail4">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="black-label" htmlFor="inputAddress">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address1"
              placeholder="1234 Main St"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="black-label" htmlFor="inputAddress2">
              Address 2
            </label>
            <input
              type="text"
              className="form-control"
              id="address2"
              placeholder="Apartment, studio, or floor"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="black-label" htmlFor="inputCity">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="black-label" htmlFor="inputState">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="black-label" htmlFor="inputZip">
                Zip
              </label>
              <input
                type="text"
                className="form-control"
                id="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="black-label" htmlFor="description">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="custom-but" id="submit">
            Submit
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
