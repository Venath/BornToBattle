//events.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    retrieveEvents();

    retrieveCategories();
  }, []);

  const retrieveEvents = () => {
   
    axios.get("http://localhost:8020/events")
      .then((res) => {
        if (res.data.success) {
        
          setEvents(res.data.existingEvents);
          setLoading(false);
          setError(null);
        } else {
          setLoading(false);
          setError('Failed to fetch posts');
        }
      })
      .catch((error) => {
        setLoading(false);
        setError('Network error');
        console.error(error);
      });
  }
  

  const retrieveCategories = () =>{
    axios.get("http://localhost:8020/cat") // Update the API endpoint here
    .then((res) => {
      if (res.data.success) {
        console.log('Cat ID:',res.data )
        setCategories(res.data.existingCategories);
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
        setError('No categories found');
      }
    })
    .catch((error) => {
      setLoading(false);
      setError('Error fetching categories');
      console.error('Error fetching categories:', error);
    });
  }

  const onDelete = (id) => {
    axios.delete(`http://localhost:8020/event/delete/${id}`).then((res) => {
      localStorage.removeItem('Ltext');
      localStorage.removeItem('Ltopic');
      const lid = localStorage.getItem('LtopicId');
      console.log("id",lid)
      axios.delete(`/notif/tdelete/${lid}`).then((res) => {
        localStorage.removeItem('LtopicId');
        alert("Deleted successfully");
        retrieveEvents();
      });
    });
  }
  

  const onCatDelete = (id) => {
    axios.delete(`http://localhost:8020/cat/delete/${id}`).then((res) => {
      alert("Deleted successfully");
      retrieveEvents();
    });
  }

  // const filterData = (events, searchKey) => {
  //   const result = events.filter((event) =>
  //     event.topic.toLowerCase().includes(searchKey) ||
  //     event.description.toLowerCase().includes(searchKey)
  //   );
  //   setEvents(result);
  // }

  const filterData = (events, searchKey) => {
    const result = events.filter((event) =>
      event.topic.toLowerCase().includes(searchKey) 
      // event.description.toLowerCase().includes(searchKey)
    );
    setEvents(result);
  }

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8020/events")
      .then((res) => {
        if (res.data.success) {
          filterData(res.data.existingEvents, searchKey);
        }
      });
  }

  const totalEvents = events.length;

  const handleSignOut = () => {
    localStorage.removeItem('username');
    window.location.href = '/managerSignin';
  };

  const generateReport = () => {
    // Generate CSV content
    const csvContent = generateCSV(events);

    // Download CSV file
    downloadCSV(csvContent, 'event_summary_report.csv');
  };

  const generateCSV = (data) => {
    const header = 'Event Category, Event Name, Individual/Group, Gender, Age Category, Time\n';
    const rows = data.map(event => `${event.category}, ${event.topic}, ${event.type}, ${event.gender}, ${event.ageGroup}, ${event.time}`);
    return header + rows.join('\n');
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };


  return (
   
    <div>
<h2>Main Event Categories</h2>



<div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
  {categories.map((category, index) => (
    <div key={index} style={{ border: '1px solid white', flex: '1 1 auto', minWidth: '200px', padding: '5px', borderRadius: '5px' }}>
      <p style={{ margin: '0', lineHeight: '1.5' }}> <a href={`/cat/${category._id}`} style={{ color: 'white' }}>{category.topic}</a> &nbsp;
      
      <a className="btn btn-warning" href={`/edit/cat/${category._id}`}>
         <i className="fas fa-edit"></i>&nbsp;Edit
         </a>
      &nbsp;
      <button className="btn btn-danger" onClick={() => onCatDelete(category._id)}>
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
      </button></p>
    </div>
    // justifyContent: 'space-between'-- evenly distribute the child elements along the main axis
  ))}
</div>
<div className="d-flex justify-content-between align-items-center">


          <button className="btn btn-dark">
            <a href="/addcat" style={{ textDecoration: 'none', color: 'white' }}>
              Add New Event Category
            </a>
          </button>
       
          </div>

{/* retrive and display main event category names */}
          {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {categories.map((category, index) => (
      <div key={index} style={{ border: '1px solid black'}}>
        <p style={{ margin: '0', lineHeight: '1.5' }}>{category.topic}</p>
      </div>
    ))}


  </div> */}



          
    <div style={{
      backgroundImage: `url("/Images/b2b4.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <div className="container" style={{ backgroundColor: '#ced4da', backgroundImage: 'none' }}>
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">

            <h4>All Events</h4>
          </div>
          <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="search"
              name="searchQuery"
              onChange={handleSearchArea}
            />
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col"  style={{ color: 'black' }}>Event No</th>
              <th scope="col"  style={{ color: 'black' }}>Event Category</th>
              <th scope="col"  style={{ color: 'black' }}>Event Name</th>
              <th scope="col"  style={{ color: 'black' }}>Individual/Group</th>
              <th scope="col"  style={{ color: 'black' }}>Gender</th>
              <th scope="col"  style={{ color: 'black' }}>Age category</th>
              <th scope="col"  style={{ color: 'black' }}>Time</th>
              {/* <th scope="col">Time</th> */}
             
              
              <th scope="col" style={{ color: 'black' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <th scope="row" style={{ color: 'black' }}>{index + 1}</th>
                <td style={{ color: 'black' }}>{event.category}</td>
                <td style={{ color: 'black' }}>
                  <a href={`/eventd/${event._id}`}>
                    {event.topic}
                  </a>
                </td>
                
                <td style={{ color: 'black' }}>{event.type}</td>
                <td style={{ color: 'black' }}>{event.gender}</td>
               
                <td style={{ color: 'black' }}>{event.ageGroup}</td>
                <td style={{ color: 'black' }}>{event.time}</td>
                {/* <td>{event.style}</td> */}
                <td>
                  <a className="btn btn-warning" href={`/editevent/${event._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <button className="btn btn-danger" onClick={() => onDelete(event._id)}>
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-dark">
            <a href="/addevent" style={{ textDecoration: 'none', color: 'white' }}>
              Add New Event
            </a>
          </button>

          <div >
            <h4>Total Events: {totalEvents}</h4>
          </div>
        </div>


      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
  <button className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <a href="/calendar" style={{ textDecoration: 'none', color: 'white' }}>
      Manage Calendar
    </a>
  </button>
  <div>
  <button className="btn btn-primary" onClick={generateReport} style={{ marginTop: '10px' }}>
    Generate Report
  </button>
  </div>
</div>

    </div>
    <div>
            <button className="btn btn-danger" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
    </div>



  );

  //view schedule button
  
}

export default Events;
