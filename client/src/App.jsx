import React, { useState } from "react";
import axios from "axios";

const PlantDiseasePrediction = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://api-inference.huggingface.co/models/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification",
        image,
        {
          headers: {
            Authorization: "Bearer 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"
          }
        }
      );

      console.log(response);
      
      setResult(response.data);
      console.log(result)
    } catch (error) {
      console.error("Error predicting disease:", error);
      alert("Failed to predict disease. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-500 flex flex-col justify-between">
  <div className="flex flex-col justify-center items-center py-8 px-2">
    <h1 className="text-2xl font-bold mb-4">Leaf Life 🍀</h1>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="mb-4"
    />
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="border-2 border-white-500 text-white bg-green-500 hover:bg-white hover:text-green-500 transition-all duration-300 ease-in-out px-4 py-2 rounded-md py-2 px-4 disabled:opacity-50"
    >
      {loading ? "Predicting..." : "Predict"}
    </button>
    {result && 
    result.map((disease, index) => (

    <div key={index} className="mb-4 w-full">
      <p className="font-semibold">{disease.label}</p>
      <div className="flex items-start justify-left">
        <div className="bg-gray-300 h-2 w-full rounded-lg mr-2">
          <div className="bg-blue-500 h-2 rounded-lg" style={{ width: `${disease.score * 100}%` }}></div> {/* Changed result.score to disease.score */}
        </div>
        <p className="text-sm font-medium">{disease.score.toFixed(2)}</p>
      </div>
    </div>

  ))}
  </div>
  <div className="flex justify-between bg-green-700 p-4">
    <div className="w-1/2 text-center border-r border-solid border-gray-300">
      Find
    </div>
    <div className="w-1/2 text-center border-l border-solid border-gray-300">
      History
    </div>
  </div>
</div>

  );
};

export default PlantDiseasePrediction;
