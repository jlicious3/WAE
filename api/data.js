// pages/api/data.js
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

export default async (req, res) => {
  const { city, year } = req.query;

  try {
    const climatePath = path.join(process.cwd(), 'public/data/annual_climate_SK.json');
    const energyPath = path.join(process.cwd(), 'public/data/energy_usage_SK.json');
    const ozonePath = path.join(process.cwd(), 'public/data/ozone-peak-urban-en.json');

    // Read JSON data
    const [climate, energy, ozone] = await Promise.all([
      readFile(climatePath),
      readFile(energyPath),
      readFile(ozonePath)
    ].map(async (file) => JSON.parse(await file)));

    // Filter data by year (and optionally by city)
    const filterData = (data) => data.filter(item => item.year === parseInt(year) && (!city || item.city === city));

    res.status(200).json({
      climateData: filterData(climate),
      energyData: filterData(energy),
      ozoneData: filterData(ozone)
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
