"use client";

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Map from "../components/Map";

export default function QueryPage() {
  const [selectedCity, setSelectedCity] = useState("Saskatoon");
  const [selectedYear, setSelectedYear] = useState('');
  const [, setDisplayResults] = useState(false);

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setDisplayResults(false); // Reset results view on city change
  };

  const handleCreateQuery = () => {
    if (selectedYear && selectedCity) {
      // Redirect to the ResultPage with query parameters
      window.location.href = `/Result/?selectedCity=${encodeURIComponent(selectedCity)}&selectedYear=${encodeURIComponent(selectedYear)}`;
    } else {
      alert('Please enter both city and year.');
    }
  };


return (
  <>
    <Head>
      <title>W.A.E. Tracker - Create Query</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4">
        <div className="max-w-6xl mx-auto flex justify-center">
          <Link href="http://localhost:3000">
              <Image src="/image/wae-logo.png" alt="W.A.E. Tracker Logo" width={150} height={100} />
          </Link>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Create Your Query:</h2>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name (optional):</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">Timeline:</label>
            <input type="number" id="timeline" name="timeline" placeholder="Enter a year (e.g., 2002)" className="w-full p-2 border border-gray-300 rounded mt-1 text-black" onChange={handleYearChange} value={selectedYear} />
          </div>
          
          <div className="flex gap-4 mb-6">
            <button onClick={() => handleCityClick("Saskatoon")} className={`flex-1 text-lg font-semibold py-2 rounded ${selectedCity === "Saskatoon" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}`}>Saskatoon</button>
            <button onClick={() => handleCityClick("Regina")} className={`flex-1 text-lg font-semibold py-2 rounded ${selectedCity === "Regina" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}`}>Regina</button>
          </div>
        
          <button onClick={handleCreateQuery} className="w-full text-lg font-semibold bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors">Create Query</button>
        </div>

        <div className="rounded-lg overflow-hidden">
          <Map address={selectedCity} />
        </div>
      </main>
      
      <footer className="bg-white text-gray-600 py-4 mt-6">
        <div className="max-w-6xl mx-auto flex justify-center space-x-4 text-xs">
          <Link className="hover:underline" href="/image/underconst.jpg">About Us</Link>
          <Link className="hover:underline" href="/image/underconst.jpg">Contact Us</Link>
          <Link className="hover:underline" href="/image/underconst.jpg">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  </>
);
}