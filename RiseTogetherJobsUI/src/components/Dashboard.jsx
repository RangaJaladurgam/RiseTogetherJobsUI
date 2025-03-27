import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "../assets/rtn-logo-1.jpeg";

function Dashboard() {
  const [jobsList, setJobsList] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setInterval(() => 3000);
      setTimeout(async () => {
        try {
          const response = await axios.get("http://localhost:8080/jobs", {
            validateStatus: (status) =>
              status === 200 || status === 302 || status === 404,
          });

          if (response.data?.data) {
            const sortedJobs = response.data.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setJobsList(sortedJobs);
            setInternships(
              sortedJobs.filter(
                (job) => job.category.name.toLowerCase() === "internship"
              )
            ); // Filter internships
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false); // Hide loading
        }
      }, 3000); // Delay API call by 3 seconds
    };

    fetchJobs();
  }, []);
  const trimToTwoLines = (text, maxWords) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-left-container">
        <h3>Job Notifications</h3>
        <div className="card-container">
          {loading ? (
            // Show grey placeholder cards while loading
            [...Array(6)].map((_, index) => (
              <div className="card skeleton-card" key={index}></div>
            ))
          ) : jobsList.length > 0 ? (
            jobsList.map((job) => (
              <div className="card" key={job.jobPostId}>
                <div className="card-image">
                  <img src={Image} alt="Company Logo" />
                  <div className="card-text">
                    <h2>{job.title.toUpperCase()}</h2>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ textAlign: "left", fontSize: "12px" }}>
                        {job.adminResponse.username.charAt(0).toUpperCase() +
                          job.adminResponse.username.slice(1).toLowerCase()}
                      </p>
                      <p style={{ textAlign: "left", fontSize: "12px" }}>
                        - &nbsp;
                        {new Date(job.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span className="card-category-label">
                    {job.category.name}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No job postings available.</p>
          )}
        </div>
      </div>

      <div className="dashboard-right-container">
        <h3>Internships</h3>
        <div className="card-container">
          {loading
            ? // Show grey placeholder cards while loading
              [...Array(6)].map((_, index) => (
                <div className="card-sm skeleton-card" key={index}></div>
              ))
            : jobsList.length > 0
            ? internships.map((internship) => (
                <div className="card-sm" key={internship.jobPostId}>
                  <div className="card-sm-image">
                    <img src={Image} alt="company logo" />
                  </div>
                  <div className="card-sm-body">
                    <div>
                      <h4>
                        {trimToTwoLines(internship.title.toUpperCase(), 5)}
                      </h4>
                      <div className="card-description">
                        <p style={{fontSize:"13px"}}>{trimToTwoLines(internship.description, 10)}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ textAlign: "right", fontSize: "12px" }}>
                        {internship.adminResponse.username
                          .charAt(0)
                          .toUpperCase() +
                          internship.adminResponse.username
                            .slice(1)
                            .toLowerCase()}
                      </p>
                      <p style={{ textAlign: "right", fontSize: "12px" }}>
                        - &nbsp;
                        {new Date(internship.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
