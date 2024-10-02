import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./User.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const [cricketers, setCricketers] = useState([]);

  useEffect(() => {
    const fetchData = async function () {
      try {
        const res = await axios.get(
          import.meta.env.VITE_GET_CRICKETERS_ENDPOINT_BASE_URL
        );
        console.log(res.data);
        setCricketers(res.data);
      } catch (error) {
        console.log(`${error} while fetching the data`);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async function (userID) {
    await axios
      .delete(
        `${
          import.meta.env.VITE_DELETE_DELETE_CRICKETERS_ENDPOINT_BASE_URL
        }${userID}`
      )
      .then((response) => {
        setCricketers((prevCricketers) =>
          prevCricketers.filter((cricketers) => cricketers._id !== userID)
        );
        toast.success(response.data.message, {
          position: "top-right",
          duration: 5000,
        });
      })
      .catch((error) => {
        toast.error(`Couldnt Delete User. Something Went Wrong`, {
          position: "top-right",
          duration: 5000,
        });
        console.log(error);
      });
  };
  return (
    <>
      <div className="user-table">
        <Link to="/addUser" type="button" className="btn btn-primary">
          <div className="d-flex flex-row justify-content-around align-items-center gap-2">
            <span>Add Cricketer</span>
            <span>
              <FaUserPlus size={22} />
            </span>
          </div>
        </Link>
        {cricketers.length ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Sl No</th>
                <th scope="col">Player Name</th>
                <th scope="col">Jersey</th>
                <th scope="col">Nationality</th>
                <th scope="col">Format</th>
                <th scope="col">Runs</th>
                <th scope="col">Innings</th>
                <th scope="col">Average</th>
                <th scope="col">Strike Rate</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cricketers.map((cricketer, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{cricketer.name}</td>
                    <td>{cricketer.jerseyNum}</td>
                    <td>{cricketer.nationality}</td>
                    <td
                      style={
                        cricketer.format === "t20i"
                          ? { textTransform: "uppercase" }
                          : null
                      }
                    >
                      {cricketer.format}
                    </td>
                    <td>{cricketer.runs}</td>
                    <td>{cricketer.innings}</td>
                    <td>{cricketer.average}</td>
                    <td>{cricketer.strikeRate}</td>
                    <td className="d-flex flex-row align-items-center gap-2">
                      <Link
                        to={`/updateUser/` + cricketer._id}
                        className="btn btn-warning"
                      >
                        <TiEdit size={20} />
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUser(cricketer._id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="noData">
            <h3>No Data To Display</h3>
            <p>Enter Cricketers</p>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
