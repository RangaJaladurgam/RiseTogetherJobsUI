import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import axios from "axios";

function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [expireDate, setExpireDate] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState(""); // Category title state
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [expireDateError, setExpireDateError] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      console.log({
        title,
        description,
        location,
        imageUrl,
        expireDate,
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                  <MenuItem  value={category.name} key={category.categoryId} onClick={() => setShowForm(false)}>
                    {category.name}
                  </MenuItem>
                ))}
                <MenuItem style={{color:"blue"}} value="Other" onClick={() => setShowForm(true)}>
                  + Add New Category
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </div>
        {showForm ? (
          <div className="job-post-category">
            <h2>Add Category</h2>
            <form></form>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </LocalizationProvider>
  );
}

export default PostJob;
