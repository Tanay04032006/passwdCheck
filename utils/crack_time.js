function estimateCrackTime(entropy) {
    const guesses = Math.pow(2, entropy);
    const guessesPerSecond = 1e10;
    const seconds = guesses / guessesPerSecond;
  
    if (seconds < 1) return 'Less than 1 second';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    return `${Math.round(seconds / 31536000)} years`;
  }
  
  module.exports = { estimateCrackTime };
  