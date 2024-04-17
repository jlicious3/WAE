"use client";

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Map from "../components/Map";

export default function QueryPage() {
  const [mapAddress, setMapAddress] = useState("Saskatoon"); // Default address is Saskatoon

  const handleCityClick = (city) => {
    setMapAddress(city);
  };

  return (
    <>
      <Head>
        <title>W.A.E. Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="bg-white">
        <header className="flex justify-center shadow-md w-full">
          <Link href="http://localhost:3000/">
          <Image src="/image/wae-logo.png" alt="W.A.E. Tracker Logo" width={150} height={100} />
          </Link>
        </header>
        
        <main className="flex flex-1 pt-5 pr-4">
          <div className="w-full max-w-md px-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Fill in the fields:</h2>
            
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Enter name (optional):</label>
              <input type="text" id="name" name="name" placeholder="Enter Name" className="w-full p-2 border rounded text-black" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="timeline" className="block mb-2 text-sm font-medium text-gray-900">Enter timeline:</label>
              <input type="text" id="timeline" name="timeline" placeholder="Enter a year (2000-2016)" className="w-full p-2 border rounded text-black" />
            </div>
            
            <div className="flex gap-4 mb-4">
              <button onClick={() => handleCityClick("Saskatoon")} className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Saskatoon</button>
              <button onClick={() => handleCityClick("Regina")} className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Regina</button>
            </div>
            
            <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Create a Query</button>
          </div>

          <div className="w-full lg:w-full lg:h-full border-4 border-black rounded">
            <Map address={mapAddress} />
          </div>

        </main>
        
        <footer className="text-black pb-2 pt-6 text-xs">
          <div className="space-x-5 flex justify-center">
            <Link className="hover:underline" href="/about">About Us</Link>
            <Link className="hover:underline" href="/contact">Contact Us</Link>
            <Link className="hover:underline" href="/privacy">Privacy Policy</Link>
          </div>
        </footer>
      </div>

    </>
  )
}

