import React from "react";
import "./Process.css";
import { useFetch } from "../../hooks/useFetch";

const Process = () => {
  const { data, loading, error } = useFetch("/processes");

  if (loading) return <p>Loading tailored processes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="process-container">
      <h2>Tailored Process Recommendations</h2>
      {data?.map((proc) => (
        <div key={proc._id} className="process-card">
          <h4>{proc.name}</h4>
          <p>{proc.recommendation}</p>
        </div>
      ))}
    </div>
  );
};

export default Process;
