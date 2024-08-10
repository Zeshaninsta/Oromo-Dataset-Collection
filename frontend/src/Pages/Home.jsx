import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [datasetCount, setDatasetCount] = useState(0);
  const [incorrect, setIncorrect] = useState('');
  const [correct, setCorrect] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!incorrect || !correct) {
      toast.error('You should add data to both fields.');
      return; // Exit the function if inputs are not valid
    }

    setIsSubmitting(true); // Disable the button when clicked
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

      // Show success toast
      toast.success('Data added successfully!');
    } catch (error) {
      console.error("Error adding data to dataset", error);
      // Show error toast
      toast.error('Failed to add data. Please try again.');
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission
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

      <div className="w-full flex flex-col justify-center items-center mt-20 px-4 lg:px-0 z-10">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-brown-900 text-center mb-6">
          Baga Nagaan Dhuftan
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-brown-700 mb-2 text-center font-rubik font-bold">
          Galma Qoranno Dataa Afaan Oromoo
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-brown-600 mb-8 text-center font-sedan">
          Added Dataset: <span className="font-bold font-sedan">{datasetCount}</span>
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
              Jechoota Keessan Dabalaa
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
              className={`w-full mt-6 ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-4 rounded-lg transition duration-300 text-2xl`}
              onClick={handleAddToDataset}
              disabled={isSubmitting} // Disable the button while submitting
            >
              {isSubmitting ? 'Adding...' : 'Add to Dataset'}
            </button>
            <button
              className='w-full bg-green-500 hover:bg-green-600 duration-500 p-4 cursor-pointer text-white text-2xl font-bold mt-4'
              onClick={handleDownload}
            >
              Download Dataset
            </button>
          </div>
        </div>

        {/* Introduction Text in English */}
        <div className="w-full lg:w-2/3 xl:w-1/2 bg-white rounded-lg shadow-lg p-8 mt-8 mb-8 relative z-20">
          <h2 className="text-2xl font-semibold text-brown-700 mb-4">Why This Website and Dataset?</h2>
          <p className="text-lg mb-4">
            <strong>Purpose of the Website:</strong> This website is dedicated to advancing the study and use of the Oromo language. Oromo, spoken by millions of people primarily in Ethiopia and neighboring regions, is rich in cultural and linguistic diversity. Despite its importance, there is a significant gap in resources and tools available for processing and analyzing Oromo text. Our goal is to bridge this gap by creating a comprehensive dataset that can be used for various applications such as natural language processing (NLP), machine learning, and linguistic research.
          </p>
          <p className="text-lg mb-4">
            <strong>Importance of the Dataset:</strong> The dataset you see here plays a crucial role in achieving our mission. It consists of pairs of incorrect and corrected Oromo sentences, which are valuable for several reasons:
          </p>
          <ul className="list-disc list-inside text-lg mb-4">
            <li><strong>Language Learning and Correction:</strong> By collecting examples of commonly made errors and their corrections, we provide a resource for improving language learning tools and grammar correction applications. This can help learners and native speakers refine their understanding and usage of the Oromo language.</li>
            <li><strong>Research and Development:</strong> Researchers and developers can use this dataset to build and train models that understand and generate Oromo text more accurately. This can contribute to the development of translation services, text-to-speech systems, and other AI-driven language tools.</li>
            <li><strong>Cultural Preservation:</strong> Documenting and preserving the nuances of the Oromo language is essential for maintaining its cultural heritage. This dataset aids in capturing and analyzing linguistic patterns that are fundamental to the Oromo identity.</li>
          </ul>
          <p className="text-lg">
            <strong>Join Us in Our Mission:</strong> Your contributions to this dataset are invaluable. Whether you're adding new data or using the dataset for research, you are helping to enhance the resources available for the Oromo language and its speakers. Together, we can create a more inclusive and supportive environment for Oromo language technology and education.
          </p>
        </div>

        {/* Introduction Text in Oromo */}
        {/* <div className="w-full lg:w-2/3 xl:w-1/2 bg-white rounded-lg shadow-lg p-8 mb-8 relative z-20">
          <h2 className="text-2xl font-semibold text-brown-700 mb-4">Maalummaa Websaayitii fi Dataset</h2>
          <p className="text-lg mb-4">
            <strong>Kaayyoo Websaayitii:</strong> Websaayitiin kun qorannaa fi fayyadama Afaan Oromoo guddisuuf karoorfame. Afaan Oromoo, kan ummata miliyoonaa ol irraa dubbatamu, aadaa fi diversity linguistics hedduu qaba. Yeroo hunda, akkaataa Afaan Oromoo barreessuu fi xiinxaluuf meeshaalee fi qabeenya gabaabduu jira. Kaayyoon keenya gabaabaa kana cufuu fi dataset guutuu uumuudha, kan itti fayyadamuuf qorannoo, machine learning, fi barnoota linguistics.
          </p>
          <p className="text-lg mb-4">
            <strong>Importance of the Dataset:</strong> Dataset kun kaayyoo keenya guutuu keessatti qooda ol’aanaa qaba. Qabiyyee dogoggoraa fi sirrii waliin qabu, Afaan Oromoo keessatti dogoggora yookaan sirreessa bal’aa qabdi. Kunis faayidaa hedduu qaba:
          </p>
          <ul className="list-disc list-inside text-lg mb-4">
            <li><strong>Barnoota Afaan fi Sirreessa:</strong> Fakkeenya dogoggora yeroo hedduu mul’atu fi sirreessaa walitti qabnee, meeshaalee barnoota fi sirreessaa afaan kana fooyyeessuuf kennaa. Kunis barattoota fi dubbattoota Afaan Oromoo yaada fi fayyadamummaa isaanii fooyyeessuu dandeessu.</li>
            <li><strong>Qorannoo fi Hojii Kakaasuu:</strong> Qorattoota fi hojjettoota dataset kana fayyadamuudhaan modeloota Afaan Oromoo hubatuu fi uumuudhaaf gargaara. Kunis tajaajiloota hiikkaa, sirreeffama barruu, fi meeshaalee afaan technology AI keessatti gargaara.</li>
            <li><strong>Ogeessummaa Aadaa:</strong> Afaan Oromoo keessatti nuances galmeessuu fi kuusuu aadaa keenya eeguuf barbaachisaa dha. Dataset kun seenaa fi gochaa Afaan Oromoo keessaa bu’uura afaanichaa qabsiisuuf gargaara.</li>
          </ul>
          <p className="text-lg">
            <strong>Gargaarsa Keenyaaf Makaa:</strong> Deebiin keessan dataset kanaaf waan hedduu qabeessa dha. Yoo data haaraa dabalchaa jirtan yookaan dataset kana qorannoo keessaniif fayyadamtu, qabeenya Afaan Oromoo fi dubbattoota isaa gabbifachuuf gargaara. Walitti dhufeenyi keenya Afaan Oromoo teknooloojii fi barnootaaf haala mijataa fi deeggarsa guddaa uumuuf ni danda’a.
          </p>
        </div> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
