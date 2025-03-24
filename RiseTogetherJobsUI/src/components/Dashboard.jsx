import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [jobsList, setJobsList] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/jobs", {
          validateStatus: (status) => status === 200 || status === 302 || status === 404,
        });
        console.log(response.data.data)
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

  return (
    <div className="dashboard-container">
      <div className="dashboard-left-container">
        <div className="card-container">
          {jobsList.length > 0 ? (
            jobsList.map((job) => (
              <div className="card" key={job.jobPostId}>
                <div className="card-image">
                  <img src={job.imageUrl} alt="Company Logo" />
                  <div className="card-text">
                    <h2>{job.title}</h2>
                    <p>{new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                    <span className="card-category-label">{job.category.name}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No job postings available.</p>
          )}
        </div>
      </div>

      <div className="dashboard-right-container">
        <div className="card-container">
          {[...Array(6)].map((_, index) => (
            <div className="card-sm" key={index}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
    