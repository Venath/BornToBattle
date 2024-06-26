import React, { useState } from "react";
import '../../Style/stallStyles/EditStallStyles.css';
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function ItemAdd() {
    
    const navigate = useNavigate();

    const [pName, setPname] = useState('');
    const [pPrice, setPprice] = useState(0);
    const [pImage, setPimage] = useState();

    const addItem = (u) => {
        u.preventDefault();

        const formData = new FormData();
        formData.append("pName", pName);
        formData.append("pPrice", pPrice);
        formData.append("pImage", pImage);

        axios.post("http://localhost:8020/staller/items/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(() => {
            alert("Item added.");
        }).catch((err) => {
            alert(err);
        });

    }

    return (
        <div>
            <div>
                <div className="fullDiv rounded-4" style={{ borderRadius: '30px', marginInline: '100px' }}>
                    <div className="p-4">
                        <div>
                            <div className="d-flex justify-content-between mb-3">
                                <h2 className="ml-3 mt-3 text-success">Your Stall</h2>
                                <div className="d-flex justify-content-between">
                                    <h3 className="mt-3 mr-3 text-success">Your Profile</h3>
                                    <button className="btn btn-success rounded-circle py-3 px-4"
                                        onClick={(v)=> {navigate('/stallerProfile')}}
                                    >
                                        <i className="fa fa-user" aria-hidden="true" style={{ fontSize: '30px' }}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <form className="row g-3" style={{ textAlign: 'start' }} onSubmit={addItem}>
                            <div className="col-md-8">
                                <label htmlFor="pName" className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pName"
                                    onChange={(u) => {
                                        console.log(u.target.value)
                                        setPname(u.target.value)
                                    }}

                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="pPrice" className="form-label">Product Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="pPrice"
                                    onChange={(u) => {
                                        console.log(u.target.value)
                                        setPprice(u.target.value)
                                    }}

                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="pImage" className="form-label">Product Image</label>
                                <input
                                    type="file"
                                    name="pImage"
                                    className="form-control"
                                    id="pImage"
                                    onChange={(u) => {
                                        console.log(u.target.files[0])
                                        setPimage(u.target.files[0])
                                    }} // Use files[0] to get the file object
                                />
                            </div>
                            <div className="mb-2 mt-4 ml-3">
                                <button type="submit" className="button btn-primary" >Add to List</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
