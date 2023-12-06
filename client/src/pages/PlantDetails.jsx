import React from "react";
import { useParams } from "react-router-dom";

const PlantDetails = () => {
  const { id } = useParams(); // Fetching the plant ID from URL

  // Fetch plant details using the ID from the URL

  return (
    <div className="absolute z-50">
      <h2>Plant Details Page</h2>
      <p>Display details for plant with ID: {id}</p>
      {/* Display fetched plant details */}
    </div>
  );
};

export default PlantDetails;
