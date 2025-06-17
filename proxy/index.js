const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

const token = 'V0Q4RW5OcnRBMXczT0ltSlJHaW5UUEU4Q3gzSndTQ0JDeHl2N2p3TA==';

app.get('/', (req, res) => {
  res.send('🟢 Proxy server is running!');
});

app.get('/api/content', async (req, res) => {
  try {
    const response = await axios.get(
      'https://staging.acornlms.com/local/acorn_coursemanagement/index.php/api/1.1/external_catalogue/188?perPage=16',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching API data:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
