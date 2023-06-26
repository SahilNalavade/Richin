  const express = require('express');
  const axios = require('axios');

  const app = express();
  const port = 3000;

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.get('/data', async (req, res) => {
    try {
      // Define the data to send in the request
      const requestData = [
        { pv: 100, fv: 400, r: null, n: 8 },
        100000
      ];
      
      // Make a POST request to the Flask application's /data endpoint
      const response = await axios.post('http://localhost:5000/data', requestData);

      // Retrieve the processed data from the response
      const processedData = response.data;

      // Return the processed data as the response for the /data endpoint
      res.json(processedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.listen(port, () => {
    console.log(`Node.js app listening at http://localhost:${port}`);
  });
 
  