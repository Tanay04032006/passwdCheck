import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StrengthMeter from './StrengthMeter';
import Suggestions from './Suggestions';

const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState(null); // will hold backend response

  useEffect(() => {
    const analyzePassword = async () => {
      if (password.length === 0) {
        setAnalysis(null);
        return;
      }

      try {
        const res = await axios.post('http://localhost:5000/api/analyze', { password });
        setAnalysis(res.data);
      } catch (err) {
        console.error('Error analyzing password:', err);
      }
    };

    analyzePassword();
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <label htmlFor="password" className="block text-lg font-semibold mb-2">Enter Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type your password..."
      />

      {analysis && (
        <div className="mt-4 space-y-3">
          <StrengthMeter strength={analysis.strength} entropy={analysis.entropy} crackTime={analysis.crackTime} />
          <Suggestions password={password} />
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
