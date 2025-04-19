const { calculateEntropy } = require('../../utils/entropy');
const { estimateCrackTime } = require('../../utils/crack_time');

const analyzePassword = (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  const entropy = calculateEntropy(password);
  const crackTime = estimateCrackTime(entropy);

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  res.json({
    password,
    score,
    entropy,
    crackTime
  });
  console.log('Password analysis:', {
    password,
    score,
    entropy,
    crackTime
  });
  // Log the analysis result to the console for debugging

  
};

module.exports = { analyzePassword };
