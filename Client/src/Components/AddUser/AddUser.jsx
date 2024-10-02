import React, { useState } from "react";
import "./AddUser.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
  const cricketerData = {
    name: "",
    jerseyNum: "",
    nationality: "",
    format: "",
    innings: "",
    runs: "",
    average: "",
    strikeRate: "",
  };

  const [cricketer, setCricketer] = useState(cricketerData);

  const navigate = useNavigate();

  const inputHandler = function (event) {
    const { name, value } = event.target;

    // console.log(name, value);

    setCricketer({ ...cricketer, [name]: value });
    // console.log(cricketer);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(
        import.meta.env.VITE_POST_ADD_CRICKETERS_ENDPOINT_BASE_URL,
        cricketer
      )
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 5000,
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.errorMessage, {
          position: "top-right",
          duration: 3000,
        });
      });
  };
  return (
    <>
      <div className="add-user">
        <Link to="/" className="btn btn-secondary">
          <div className="d-flex flex-row gap-2">
            <span>
              <FaArrowLeft />
            </span>
            <span>Go Back</span>
          </div>
        </Link>
        <h3>Add New Cricketer</h3>
        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Cricketer Name"
              autoComplete="off"
              onChange={inputHandler}
            />
          </div>
          <div className="input-group">
            <label htmlFor="jerseyNum">Jersey Number:</label>
            <input
              type="number"
              id="jerseyNum"
              name="jerseyNum"
              placeholder="Cricketer Jersey Number"
              autoComplete="off"
              onChange={inputHandler}
            />
          </div>

          <div className="input-group">
            <label htmlFor="nationality">Nationality:</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              placeholder="Cricketer Nationality"
              autoComplete="off"
              onChange={inputHandler}
            />
          </div>
          <div className="input-group">
            <label htmlFor="format">Format:</label>
            <input
              type="text"
              id="format"
              name="format"
              placeholder="Format"
              onChange={inputHandler}
            />
          </div>
          <div className="input-group">
            <label htmlFor="innings">Innings:</label>
            <input
              type="number"
              id="innings"
              name="innings"
              placeholder="Innings Played"
              autoComplete="off"
              onChange={inputHandler}
            />
          </div>
          <div className="input-group">
            <label htmlFor="runs">Runs:</label>
            <input
              type="number"
              id="runs"
              name="runs"
              placeholder="Runs Scored"
              autoComplete="off"
              onChange={inputHandler}
            />
          </div>
          <div className="input-group">
            <label htmlFor="average">Average:</label>
            <input
              type="text"
              id="average"
              name="average"
              placeholder="Average"
              autoComplete="off"
              onChange={inputHandler}
            />
          </div>
          <div className="input-group">
            <label htmlFor="strikeRate">Strike Rate:</label>
            <input
              type="text"
              id="average"
              name="strikeRate"
              placeholder="Strike Rate"
              autoComplete="off"
              onChange={inputHandler}
            />
          </div>

          <div className="input-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
