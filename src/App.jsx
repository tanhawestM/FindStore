import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [barcode, setBarcode] = useState("");
  const [barcodeError, setBarcodeError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (barcode) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/appGMppRrsbjvqHQP/Shop?filterByFormula={Barcode Number}="${barcode}"`,
          {
            headers: {
              Authorization: `Bearer patiDEOAl3XFu5KmX.fb82413a9263d97d914d5a0334b7ae478559f3077215fd0516241b63e764971b`,
            },
          }
        );

        setLoading(false);
        if (response.data.records.length > 0) {
          const productName = response.data.records[0].fields.Name;
          setResult(productName);
        } else {
          setBarcodeError("No product found for this barcode");
        }
      } catch (error) {
        console.error("Error searching Airtable:", error);
        setLoading(false);
        setBarcodeError("An error occurred while searching. Please try again.");
      }
    } else {
      setBarcodeError("Please enter a barcode");
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-slate-500 m-auto">
      <div className="w-full max-w-md rounded-lg shadow-md p-6 ml-4 md:ml-8 lg:ml-16 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Barcode Search</h1>
        <div className="mb-4 items-center">
          <input
            type="text"
            className={`w-3/4 p-3 border rounded-lg text-lg ${
              barcodeError ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          {barcodeError && (
            <p className="text-red-500 text-sm mt-1">{barcodeError}</p>
          )}
        </div>
        <button
          className={`w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold transition duration-300 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600 active:bg-blue-700"
          }`}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Product Name:</h2>
            <p className="text-lg break-words">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
