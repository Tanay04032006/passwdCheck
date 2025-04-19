const axios = require('axios');

const predictStrength = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  try {
    const response = await axios.post('http://localhost:5001/predict', { password });
    res.json({ prediction: response.data.prediction });
  } catch (error) {
    console.error('AI Prediction Error:', error);
    res.status(500).json({ error: 'AI prediction failed.' });
  }
};

module.exports = { predictStrength };
