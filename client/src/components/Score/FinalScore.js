import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../Style/score/FinalScore.css'
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export default function FinalScore() {
    const [finalScores, setFinalScores] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [disableUpdateButton, setDisableUpdateButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8020/score")
            .then(response => {
                // Organize scores by CId
                const scoresByCname = response.data.reduce((acc, score) => {
                    const existingScore = acc.find(item => item.Cname === score.Cname);
                    if (existingScore) {
                        // If score with same CId exists, update the existing score
                        existingScore.Performance += score.Performance;
                        existingScore.Costume += score.Costume;
                        existingScore.Technique += score.Technique;
                        existingScore.Timing += score.Timing;
                    } else {
                        // If score with this CId doesn't exist, add it to the accumulator
                        acc.push({ ...score });
                    }
                    return acc;
                }, []);
                setFinalScores(scoresByCname);
            })
            .catch(error => {
                console.error("Error fetching final scores:", error);
            });
    }, []);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDisableUpdateButton(true);
        },10000);
        return ()=> clearTimeout(timer);
    },[]);

    const handleUpdateButtonClick = (_id, Cname, Category, Performance, Costume, Technique, Timing, Feedback) => {
        navigate(`/updatescore?scoreId=${_id}&Cname=${Cname}&Category=${Category}&Performance=${Performance}&Costume=${Costume}&Technique=${Technique}&Timing=${Timing}&Feedback=${Feedback}`);
    };

    const handleDeleteButtonClick = (scoreId) => {
        axios.delete(`http://localhost:8020/score/delete/${scoreId}`)
            .then(response => {
                setFinalScores(finalScores.filter(score => score._id !== scoreId));
                alert("Score Deleted Successfully");
            })
            .catch(error => {
                console.error("Error deleting score:", error);
            });
    };

    const componentPDF= useRef();
        
    const generatepdf = useReactToPrint({
        content: ()=> componentPDF.current,
        documentTitle:"Final Score Sheet",
        onAfterPrint:()=>alert("Data saved as a pdf")
    });


    // Function to filter finalScores based on search query
    const filteredScores = searchQuery === '' ? finalScores : finalScores.filter(score => {
        return score.Cname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="wrapper">
            <div>
                <div ref={componentPDF} style={{width:'100%'}}>
                    <div className="row">
                        <div className="col">
                            <h2 className="h2center  !important">Final Resultsheet</h2>
                        </div>
                        <div className="col">
                            <form className="d-flex justify-content-end" role="search">
                                <input
                                    className="form-control me-2  hide-on-print"
                                    type="search"
                                    placeholder="Search candidate name here"
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                            </form>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Candidate Name</th>
                                <th>Dance Category</th>
                                <th>Score</th>
                                <th>Feedback</th>
                                <th className="hide-on-print">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredScores.map(score => (
                                <tr key={score._id}>
                                    <td>{score.Cname}</td>
                                    <td>{score.Category}</td>
                                    <td>{score.Performance + score.Costume + score.Technique + score.Timing}</td>
                                    <td>{score.Feedback}</td>
                                    <td>
                                        <div className="row .print-hide">
                                            <div className="col">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary-custom hide-on-print"
                                                    onClick={() => handleUpdateButtonClick(score._id, score.Cname, score.Category, score.Performance, score.Costume, score.Technique, score.Timing, score.Feedback)}
                                                    disabled={disableUpdateButton}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary-custom hide-on-print"
                                                    onClick={() => handleDeleteButtonClick(score._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-grid d-md-flex justify-content-md-end md-3 hide-on-print">
                    <button type="button" className="btn btn-download" onClick={generatepdf}>
                        Download as a pdf
                    </button>
                </div>
            </div>
        </div>
    );
}
