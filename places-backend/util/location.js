const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = '.eyJ1IjoidGQxMDUiLCJhIjoiY2toOHlvcjZpMDNxbjJ1cGppanoyemEwYyJ9.nxXhwsYwG4hbcutLUPVPhg';

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${API_KEY}`
  );


  const data = response.data;
  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = data.features[0].center;

  return coordinates;
}

module.exports = getCoordsForAddress;