import { useState, useEffect } from "react";
import { end_points } from "../services/api";

function Candidates() {
  const [candidates, setCandidates] = useState([]);

  function getCandidates() {
    fetch(end_points.candidates)
      .then((response) => response.json())
      .then((data) => setCandidates(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getCandidates();
  }, []);

  console.log(candidates);

  return (
    <div className="cards-candidates">
      <h2>Candidatos</h2>
    </div>
  );
}

export default Candidates;
