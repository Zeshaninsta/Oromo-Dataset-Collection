import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Home = () => {
  const [datasetCount, setDatasetCount] = useState(0);
  const [incorrect, setIncorrect] = useState('');
  const [correct, setCorrect] = useState('');

  // Fetch dataset count on component mount
  useEffect(() => {
    const fetchDatasetCount = async () => {
      try {
        const response = await axios.get('https://orodataset-backend.onrender.com/api/dataset-count');
        setDatasetCount(response.data.count);
      } catch (error) {
        console.error("Error fetching dataset count", error);
      }
    };

    fetchDatasetCount();
  }, []);

  const handleAddToDataset = async () => {
    try {
      await axios.post('https://orodataset-backend.onrender.com/api/add-data', {
        original_text: incorrect,
        corrected_text: correct
      });

      // Update dataset count after adding new data
      const response = await axios.get('https://orodataset-backend.onrender.com/api/dataset-count');
      setDatasetCount(response.data.count);

      // Clear input fields
      setIncorrect('');
      setCorrect('');
    } catch (error) {
      console.error("Error adding data to dataset", error);
    }
  };

  const handleDownload = () => {
    window.location.href = 'https://orodataset-backend.onrender.com/api/download-dataset';
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-200 via-yellow-100 to-green-200 w-full relative overflow-hidden">
      {/* Oromo Cultural Pattern Background */}
      <div className="absolute inset-0 z-0 overflow-hidden flex justify-center items-center">
        <div className="w-[1000px] h-[1000px] bg-[url('https://example.com/oromo-pattern.png')] opacity-20 blur-sm"></div>
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-10 lg:mt-0 px-4 lg:px-0 z-10">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-brown-900 text-center mb-6">
          Baga Nagaan Dhuftan
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-brown-700 mb-8 text-center">
          Galma Qoranno Dataa Afaan Oromoo
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-brown-600 mb-8 text-center">
          Dataset Count: <span className="font-bold">{datasetCount}</span>
        </p>
        <div className="w-full lg:w-2/3 xl:w-1/2 bg-white rounded-lg shadow-lg p-8 relative z-20">
          <p className="text-xl font-semibold text-brown-700 mb-4">
            Fakkeenya Dataset
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-600 rounded-lg p-4">
              <h2 className="text-center font-bold text-2xl text-white mb-4">
                Jechoota Dogoggoraa
              </h2>
              <p className="bg-gray-800 text-white p-3 rounded mb-3">Ani tapachu jalda</p>
              <p className="bg-gray-800 text-white p-3 rounded">Ani barta cimada</p>
            </div>
            <div className="bg-yellow-600 rounded-lg p-4">
              <h2 className="text-center font-bold text-2xl text-white mb-4">
                Jechoota Sirrii
              </h2>
              <p className="bg-gray-800 text-white p-3 rounded mb-3">Ani Taphachu Jaladha</p>
              <p className="bg-gray-800 text-white p-3 rounded">Ani Barataa cimadha</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-brown-700 mb-4 text-center">
              Jechoota Keessan Dabaluu
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Jechoota Dogoggoraa"
                value={incorrect}
                onChange={(e) => setIncorrect(e.target.value)}
                className="bg-gray-200 text-gray-800 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Jechoota Sirrii"
                value={correct}
                onChange={(e) => setCorrect(e.target.value)}
                className="bg-gray-200 text-gray-800 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <button
              className="w-full mt-6 bg-blue-600 hover:bg-brown-700 text-white font-bold py-4 rounded-lg transition duration-300"
              onClick={handleAddToDataset}
            >
              Gara Datasetitti Dabaluu
            </button>
            <button
              className='w-full bg-green-500 hover:bg-green-600 duration-500 p-4 cursor-pointer text-white text-2xl font-bold mt-4'
              onClick={handleDownload}
            >
              Download Dataset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
