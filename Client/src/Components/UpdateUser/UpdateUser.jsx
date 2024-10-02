import { useEffect, useState } from "react";
import "./UpdateUser.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {
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
  const { id } = useParams();

  const inputHandler = function (event) {
    const { name, value } = event.target;

    // console.log(name, value);

    setCricketer({ ...cricketer, [name]: value });
    // console.log(cricketer);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/cricketers/${id}`)
      .then((response) => {
        setCricketer(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .put(
        `${import.meta.env.VITE_PUT_UPDATE_CRICKETERS_ENDPOINT_BASE_URL}${id}`,
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
        toast.error(error, {
          position: "top-right",
          duration: 5000,
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
        <h3>Update Cricketer Data</h3>
        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={cricketer.name}
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
              value={cricketer.jerseyNum}
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
              value={cricketer.nationality}
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
              value={cricketer.format}
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
              value={cricketer.innings}
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
              value={cricketer.runs}
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
              value={cricketer.average}
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
              value={cricketer.strikeRate}
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

export default UpdateUser;
