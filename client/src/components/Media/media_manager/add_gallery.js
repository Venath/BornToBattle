import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/main.css";
import "../styles/gallery.css";

export default function Gallery() {
  const navigate = useNavigate();
  const [media, setMedia] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const addContent = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    axios
      .post("http://localhost:8020/gallery/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Item added.");
        // After adding, fetch media again to update the list
        fetchMedia();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(e.target.files[0]);
  };

  const fetchMedia = () => {
    axios
      .get("http://localhost:8020/gallery/read")
      .then((res) => {
        setMedia(res.data);
      })
      .catch((err) => {
        console.error(err.message);
        alert("Error fetching media.");
      });
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const deleteContent = (id) => {
    axios
      .delete(`http://localhost:8020/gallery/delete/${id}`)
      .then(() => {
        alert("Item deleted.");
        // After deleting, fetch media again to update the list
        fetchMedia();
      })
      .catch((err) => {
        console.error(err.message);
        alert("Error deleting media.");
      });
  };

  const updateContent = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div>
      {/* Background image */}
      <div className="overlay111">
        <img src="../../Images/iimg.jpg" alt="IDS" />
        <div className="overlay-text111">
          <h1 className="img_ga111">IMAGE GALLERY</h1>
        </div>
      </div>

      <form className="form1" onSubmit={addContent}>
        {/* Form inputs */}
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label" style={{color:'white'}}>
            Picture Caption
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Picture Caption"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{color:'white'}}>
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="photoFile" className="form-label" style={{color:'white'}}>
            Upload Content
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary111" style={{color:'white', fontWeight:'bold'}}>
          Add Content
        </button>
      </form>

      {/* Display fetched media */}
      <div className="media111">
        {media.map((item) => (
          <div key={item._id} className="media-item111">
            {/* Check if image exists before rendering */}
            {item.image && (
              <img
                src={`http://localhost:8020/gallery/uploads/media/${item.image}`}
                alt="Product Image"
                className="media-image111"
              />
            )}
            <div className="dropdown111">
              <button className="dropbtn111">More</button>
              <div className="dropdown-content111">
                {/* Attach delete function to the "Delete" button */}
                <button className="dropbtn111" onClick={() => deleteContent(item._id)}>Delete</button>
                <button
                  className="dropbtn111"
                  onClick={() => updateContent(item._id)}
                >
                  Update
                </button>
              </div>
            </div>
            <div className="media-content111">
              <h5 className="imagename111">{item.name}</h5>
              <p className="imagedescription111">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
