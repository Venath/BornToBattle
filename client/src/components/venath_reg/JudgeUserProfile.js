import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const UserProfile = () => {
  const [judge, setJudge] = useState({});
  const [loading, setLoading] = useState(true);
  const { userName, id } = useParams();
  const username = localStorage.getItem('username') || '';
  const [profilePhoto, setProfilePhoto] = useState('user.jpg');
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);



  useEffect(() => {
    const existingUsername = localStorage.getItem('username');
    if (!existingUsername) {
      alert("You don't have an account");
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    console.log('Fetching judge data...');
    axios.get(`/judge/username/${encodeURIComponent(username)}`)
      .then((res) => {
        if (res.data.success) {
          console.log('Judge data:', res.data.judge);
  
          setJudge(res.data.judge);
          const photoUrl = res.data.judge.photo;
          if (!photoUrl || typeof photoUrl !== 'string') {
            photoUrl = 'user.jpg';
        }
          console.log('Judge photo:', res.data.judge.photo);
  
          setProfilePhoto(photoUrl); // Set profile photo from fetched data
        } else {
          console.error('Failed to fetch candidate data');
        }
      })
      .catch((error) => {
        console.error("Error fetching judge data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userName, username]);
  

//   useEffect(() => {
//     // Check if id is defined before making the request
//     if (id) {
//       // Fetch additional data based on id
//       axios.get(`/additional-data/${id}`)
//         .then((res) => {
//           // Process the additional data as needed
//           console.log('Additional Data:', res.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching additional data:", error);
//         });
//     }
//   }, [id]);

  const onDelete = (id) => {
    axios.delete(`/judge/delete/${id}`).then((res) => {
      axios.delete(`/jsignup/delete/${username}`).then((res) => {
        localStorage.removeItem('username'); 
        alert("deleted");
        window.location.href=('/');
      });
    });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected profile photo:', file);

      setNewProfilePhoto(file);
      const imageUrl = URL.createObjectURL(file);
      setProfilePhoto(imageUrl); // Update profile photo with newly selected image
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleConfirm = (id) => {
    console.log('Confirm button clicked');
    // Assuming you want to send the newProfilePhoto to the server when confirming
    if (newProfilePhoto) {
      // Send the newProfilePhoto to the server
      console.log('iddddddd:', id);

      const formData = new FormData();
      formData.append('photo', newProfilePhoto);
      const url = `/judge/update/${id}/photo`;
      axios.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data.success);
        if (res.data && res.data.success) {
          const photoUrl = URL.createObjectURL(newProfilePhoto);
          setProfilePhoto(photoUrl);
          setNewProfilePhoto(null);
          alert('Profile photo updated successfully.');
          window.location.href='/judgeprofile'
        } else {
          alert('Failed to update profile photo.');
        }
      })
      .catch((error) => {
        console.error("Error saving profile photo:", error);
        alert("error");
            });
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userType");
    alert("Signed Out");
    window.location.href = "/";
  };
  // Render candidate details once data is loaded
  return (
    <div className="row">
    
      <div className="col-md-3" style={{ color: 'white' }}>
        <p>Name: {judge.name}</p>
        <p>Age: {judge.age}</p>
        <p>Gender: {judge.gender}</p>
        <p>Event: {judge.event}</p>
        <p>Phone Number: {judge.phoneNumber}</p>
        <p>Institute: {judge.institute}</p>
        <p>Description: {judge.description}</p>
        <p>Username: {judge.un}</p>
        <div>
          <a href='/editpwd' style={{ color: 'white' }}>Change the password <i className="fa-solid fa-pen-to-square"></i></a>
        </div>
        <Link to={`/jedit/${judge._id}`} className="btn btn-warning">
          <i className="fas fa-edit"></i>&nbsp;Edit
        </Link>
        <button className="btn btn-danger" onClick={() => onDelete(judge._id)}>
          <i className="far fa-trash-alt"></i>&nbsp;Delete
        </button>
      </div>
  
    
      <div className="col-md-2">
        <div className="card" style={{ marginTop: '50px', width: '100%', textAlign: 'center' }}>
          <input type="file" accept="image/*" onChange={handleFileChange} id="profilePhotoInput" style={{ display: 'none' }} />
          <div className="mx-auto" style={{ overflow: 'hidden' }}>
            {newProfilePhoto ? (
            
              <img
                id="profilePhoto"
                src={profilePhoto}
                alt=""
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            ) : (
            
              <img
                id="profilePhoto"
                src={`/uploads/judges/${profilePhoto}`}
                alt=""
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            )}
          </div>
          <div className="card-body">
            <label htmlFor="profilePhotoInput" className="btn btn-warning mb-2">Upload a profile photo</label>
            {newProfilePhoto && (
              
              <button className="btn btn-info mr-2" onClick={() => handleConfirm(judge._id)}>
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
  
      {/* Bottom buttons */}
      <div className="col-md-12 text-left" style={{ marginTop: '20px' }}>
        <button className="btn btn-danger" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <div className="col-md-6 text-left" style={{ marginTop: '20px' }}>
        <button className="btn btn-danger" onClick={() => { window.location.href = '/candidateaddscore'; }}>
          Add Score
        </button>
      </div>
      <div className="col-md-6 text-left" style={{ marginTop: '20px' }}>
        <button className="btn btn-danger" onClick={() => { window.location.href = '/finalscoresheet'; }}>
          Update Score
        </button>
      </div>
    </div>
  );
  
};

export default UserProfile;
