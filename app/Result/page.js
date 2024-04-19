"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import climateData from './annual_climate_SK.json';
import energyUsage from './energy_usage_SK.json';
import ozoneData from './ozone-peak-urban-en.json';

export default function ResultPage() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [filteredClimateData, setFilteredClimateData] = useState({});
  const [filteredOzoneData, setFilteredOzoneData] = useState({});
  const [filteredEnergyData, setFilteredEnergyData] = useState([]);

  // Extract query parameters from the URL
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const city = searchParams.get('selectedCity');
    const year = searchParams.get('selectedYear');
    return { city, year };
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { city, year } = getQueryParams();
  
      if (city && year) {
        setSelectedCity(city);
        setSelectedYear(year);
  
        console.log("Selected city:", city);
        console.log("Selected year:", year);
  
        // Filter climate data
        const climateItem = climateData.find(item =>
          item.x.toUpperCase() === city.toUpperCase() && parseFloat(item.year__annee) === parseFloat(year)
        );
  
        console.log("Filtered climate data:", climateItem);
  
        setFilteredClimateData(climateItem || {});
  
        // Filter ozone data
        const ozoneItem = ozoneData.find(item =>
          item['Urban area'].toUpperCase() === `${city.toUpperCase()}, SK` && item[`${year} (parts per billion)`]
        );
        setFilteredOzoneData(ozoneItem || {});
  
        // Filter energy data for all types
        const energyItems = energyUsage.map(source => ({
          type: source.nan,
          value: source[year]
        }));
        setFilteredEnergyData(energyItems);
      }
    }
  }, ); 
  
return (
  <>
    <Head>
      <title>W.A.E. Tracker</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-md py-4">
        <div className="max-w-6xl mx-auto flex justify-center">
          <Link href="http://localhost:3000">
              <Image src="/image/wae-logo.png" alt="W.A.E. Tracker Logo" width={150} height={100} />
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 mt-6 bg-white rounded-lg shadow-sm text-black">
        <h1 className="text-xl font-semibold mb-2">Location: {selectedCity || 'N/A'}</h1>
        <h2 className="text-lg font-medium mb-4">Year: {selectedYear || 'N/A'}</h2>

        <section className="mb-6">
        <div className='flex pb-2'>
          <Image src="/image/weathericon.jpg" alt="Climate Icon" width={60} height={60} />
          <h3 className="text-lg font-medium mb-2 pt-5">Climate Data:</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p>Minimum Temperature: <span className="font-semibold">{filteredClimateData.temp_min__temp_min || 'N/A'}°C</span></p>
            <p>Maximum Temperature: <span className="font-semibold">{filteredClimateData.temp_max__temp_max || 'N/A'}°C</span></p>
            <p>Average Temperature: <span className="font-semibold">{filteredClimateData.temp_mean__temp_moyenne || 'N/A'}°C</span></p>
          </div>
        </section>

        <section className="mb-6">
          <div className='flex mb-4'>
          <Image src="/image/airqualityicon.jpg" alt="Ozone Icon" width={40} height={40} />
          <h3 className="text-lg font-medium mb-2 mt-1 pl-5">Air Quality Data:</h3>
          </div>
          <p>Peak Ozone Concentration (Parts Per Billion): <span className="font-semibold">{filteredOzoneData[`${selectedYear} (parts per billion)`] || 'N/A'}</span></p>
        </section>

        <section className="mb-6">
        <div className='flex mb-4'>
          <Image src="/image/energyicon.jpg" alt="Energy Usage Icon" width={40} height={40} />
          <h3 className="text-lg font-medium mb-2 pl-5">Energy Usage Data:</h3>
          </div>
          {filteredEnergyData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEnergyData.map((data, index) => (
                <p key={index}>{data.type}: <span className="font-semibold">{data.value || 'N/A'} PJ</span></p>
              ))}
            </div>
          ) : <p>No energy data available.</p>}
        </section>
      </main>

      <footer className="bg-white text-gray-600 py-4 mt-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} W.A.E. Tracker. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link className="hover:underline" href="/image/underconst.jpg">About Us</Link>
            <Link className="hover:underline" href="/image/underconst.jpg">Contact Us</Link>
            <Link className="hover:underline" href="/image/underconst.jpg">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  </>
);
}







