import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import dayjs from "dayjs";
import axios from "axios";
import Image1 from "../assets/rtn-logo-3.jpeg";

function UpdatePostJob() {
  const navigate = useNavigate();
  const { jobPostId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [expireDate, setExpireDate] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [expireDateError, setExpireDateError] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCategorySuccessAlert, setShowCategorySuccessAlert] =
    useState(false);
  const [showCategoryErrorAlert, setShowCategoryErrorAlert] = useState(false);

  const validateInputs = () => {
    let isValid = true;

    if (title.trim() === "") {
      setTitleError("Title cannot be blank");
      isValid = false;
    } else {
      setTitleError("");
    }
    if (description.trim() === "") {
      setDescriptionError("Description cannot be blank");
      isValid = false;
    } else {
      setDescriptionError("");
    }
    if (location.trim() === "") {
      setLocationError("Location cannot be blank");
      isValid = false;
    } else {
      setLocationError("");
    }
    if (imageUrl.trim() === "") {
      setImageUrlError("Image URL cannot be blank");
      isValid = false;
    } else {
      setImageUrlError("");
    }
    if (!expireDate) {
      setExpireDateError("Expiry Date cannot be blank");
      isValid = false;
    } else {
      setExpireDateError("");
    }

    return isValid;
  };
  const validateCategoryInputs = () => {
    let isValid = true;
    if (categoryName.trim() === "") {
      setCategoryNameError("Category name cannot be blank");
      isValid = false;
    } else {
      setCategoryNameError("");
    }
    return isValid;
  };

  useEffect(() => {
    const fetchJobPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:8080/jobs/" + jobPostId,
          {
            headers: { Authorization: `Bearer ${token}` },
            validateStatus: (status) => status === 200 || status === 302,
          }
        );
        const job = response.data.data;
        if (response.status === 302) {
          setTitle(job.title);
          setDescription(job.description);
          setLocation(job.location);
          setExpireDate(job.expireDate);
          setCategoryId(job.category.categoryId);
          setCategoryTitle(job.category.name);
          setImageUrl(job.imageUrl);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobPost();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(
          "http://localhost:8080/jobs/" + jobPostId,
          {
            title: title,
            description: description,
            location: location,
            imageUrl: imageUrl,
            expireDate: expireDate,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { categoryId: categoryId },
            validateStatus: (status) => status === 200 || status === 201,
          }
        );

        if (response.status === 200) {
          setShowSuccessAlert(true);
          setTitle(""); // Clear input// Hide after 3 sec
          setDescription(""); // Clear input// Hide after 3 sec
          setLocation(""); // Clear input// Hide after 3 sec
          setImageUrl(""); // Clear input// Hide after 3 sec
          setExpireDate(""); // Clear input// Hide after 3 sec
          setTimeout(() => setShowSuccessAlert(false), 5000);
          navigate("/admins/show-jobs");
        } else {
          setShowErrorAlert(true);
          setTimeout(() => setShowErrorAlert(false), 5000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (validateCategoryInputs()) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:8080/categories",
          {
            name: categoryName.toUpperCase(),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            validateStatus: (status) => status === 200 || status === 201,
          }
        );
        if (response.status === 201) {
          setShowCategorySuccessAlert(true);
          setCategoryName(""); // Clear input// Hide after 3 sec
          setTimeout(() => setShowCategorySuccessAlert(false), 5000);
        } else {
          setShowCategoryErrorAlert(true);
          setTimeout(() => setShowCategoryErrorAlert(false), 5000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const handleFetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8080/categories", {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: (status) => status === 200 || status === 302,
        });
        setCategories(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    handleFetchCategories();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {showSuccessAlert && (
        <Alert severity="success">Job Posted Updated Successfully.</Alert>
      )}
      {showErrorAlert && (
        <Alert severity="error">Error Updating Job. Try Again!</Alert>
      )}
      {showCategorySuccessAlert && (
        <Alert severity="success">Category Added Successfully.</Alert>
      )}
      {showCategoryErrorAlert && (
        <Alert severity="error">Error Adding Category. Try Again!</Alert>
      )}
      <div className="job-post-container">
        <div className="job-post-form">
          <h2>Post a Job</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              type="text"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!titleError}
              helperText={titleError}
              fullWidth
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={!!descriptionError}
              helperText={descriptionError}
              fullWidth
              multiline
              minRows={2} // Set default rows
              maxRows={6} // Expandable up to 6 rows
              sx={{ resize: "vertical" }} // Allow manual resizing
            />
            <div className="img-cat">
              <TextField
                className="img-url"
                label="Image Link"
                type="url"
                variant="outlined"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                error={!!imageUrlError}
                helperText={imageUrlError}
                fullWidth
              />
              <TextField
                select
                className="category-options"
                label="Category Title"
                variant="outlined"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                fullWidth
              >
                {categories.map((category) => (
                  <MenuItem
                    value={category.name}
                    key={category.categoryId}
                    onClick={() => {
                      setShowForm(false);
                      setCategoryId(category.categoryId);
                    }}
                  >
                    {category.name}
                  </MenuItem>
                ))}
                <MenuItem
                  style={{ color: "blue" }}
                  value="Other"
                  onClick={() => setShowForm(true)}
                >
                  + Add New
                </MenuItem>
              </TextField>
            </div>
            <div className="loc-exp">
              <TextField
                label="Location"
                type="text"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={!!locationError}
                helperText={locationError}
                fullWidth
              />
              <DatePicker
                label="Expiry Date"
                value={expireDate ? dayjs(expireDate) : null}
                onChange={(newValue) =>
                  setExpireDate(newValue ? newValue.format("YYYY-MM-DD") : null)
                }
                slotProps={{
                  textField: {
                    error: !!expireDateError,
                    helperText: expireDateError,
                    fullWidth: true,
                  },
                }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: showCategorySuccessAlert
                  ? "green"
                  : "rgb(157, 0, 255)",
              }}
              fullWidth
            >
              {showSuccessAlert ? "Job Posted" : "Post"}
            </Button>
          </form>
        </div>
        {showForm ? (
          <div className="job-post-category">
            <h2>Add Category</h2>
            <form onSubmit={handleCategorySubmit}>
              <TextField
                label="Category Name"
                type="text"
                variant="outlined"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                error={!!categoryNameError}
                helperText={categoryNameError}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: showCategorySuccessAlert
                    ? "green"
                    : "rgb(157, 0, 255)",
                }}
                fullWidth
              >
                {showCategorySuccessAlert ? "Category Added" : "Add Category"}
              </Button>
            </form>
          </div>
        ) : (
          <div className="job-post-category">
            <img src={Image1} alt="" width="400" />
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
}

export default UpdatePostJob;
