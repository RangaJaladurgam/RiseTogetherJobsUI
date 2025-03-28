import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function AdminShowJobs() {
  const navigate = useNavigate();
  const [jobsList, setJobsList] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/jobs", {
          validateStatus: (status) =>
            status === 200 || status === 302 || status === 404,
        });
        console.log(response.data.data);
        if (response.data?.data) {
          const sortedJobs = response.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setJobsList(sortedJobs);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobPostId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        "http://localhost:8080/jobs/" + jobPostId,
        {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: (status) => status === 200 || status === 201,
        }
      );
      if (response.status === 200) {
        setJobsList((prevJobs) =>
          prevJobs.filter((job) => job.jobPostId !== jobPostId)
        );
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (jobPostId) => {
    navigate(`/admins/update-job/${jobPostId}`);
  };

  const trimToTwoLines = (text, maxWords = 10) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };
  console.log(jobsList);
  return (
    <div>
      <div className="show-jobs-container">
        {showSuccessAlert && (
          <Alert severity="success">Job Post Deleted Successfully.</Alert>
        )}
        <h2>Jobs Posted</h2>
        <div className="show-jobs">
          <table border={1} className="show-jobs-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Location</th>
                <th>Qualification</th>
                <th>YOP</th>
                <th>Image Link</th>
                <th>Posted At</th>
                <th>Expire Date</th>
                <th>Apply Link</th>
                <th>Category</th>
                <th>Admin Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {jobsList.map((job) => (
                <tr key={job.jobPostId}>
                  <td className="multi-line-text">
                    <Tooltip title={job.title} arrow>
                      <span>{job.title}</span>
                    </Tooltip>
                  </td>
                  <td className="multi-line-text">
                    <Tooltip title={job.description} arrow>
                      <span>{trimToTwoLines(job.description)}</span>
                    </Tooltip>
                  </td>
                  <td className="multi-line-text">{job.location}</td>
                  <td className="multi-line-text">{job.qualifications?.map((item, index) => (
                      <span key={index}>
                        {item}
                        {index < job.qualifications.length - 1 ? ", " : ""}
                      </span>
                    ))}</td>
                  <td className="multi-line-text">
                    {job.passOutYears?.map((year, index) => (
                      <span key={index}>
                        {year}
                        {index < job.passOutYears.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </td>{" "}
                  <td className="multi-line-text">{job.imageUrl}</td>
                  <td className="multi-line-text">
                    {new Date(job.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="multi-line-text">
                    {" "}
                    {new Date(job.expireDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="multi-line-text">{job.applyLink}</td>
                  <td className="multi-line-text">{job.category.name}</td>
                  <td className="multi-line-text">
                    {job.adminResponse.username}
                  </td>
                  <td>
                    <Button
                      color="primary"
                      variant="text"
                      onClick={() => handleUpdate(job.jobPostId)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="error"
                      variant="text"
                      onClick={() => handleDelete(job.jobPostId)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminShowJobs;
