import React from 'react';

const getStrengthColor = (strength) => {
  if (strength === 'Weak') return 'bg-red-500';
  if (strength === 'Medium') return 'bg-yellow-500';
  return 'bg-green-500';
};

const getStrengthWidth = (strength) => {
  if (strength === 'Weak') return '33%';
  if (strength === 'Medium') return '66%';
  return '100%';
};

const StrengthMeter = ({ strength, entropy, crackTime }) => {
  const color = getStrengthColor(strength);
  const width = getStrengthWidth(strength);

  return (
    <div>
      <p className="font-medium mb-1">Strength: {strength}</p>
      <div className="w-full h-3 bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width }}
        />
      </div>
      <p className="text-sm mt-2 text-gray-600">
        <strong>Entropy:</strong> {entropy.toFixed(2)} | <strong>Crack Time:</strong> {crackTime}
      </p>
    </div>
  );
};

export default StrengthMeter;
