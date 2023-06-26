// pages/api/data.js

export default function handler(req, res) {
    if (req.method === 'POST') {
      const receivedData = req.body;
      console.log('Received data in Next.js:', receivedData);
      // Process the received data or perform any desired operations
  
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
   