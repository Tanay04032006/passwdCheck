import React from 'react';

const Suggestions = ({ password }) => {
  const suggestions = [];

  if (password.length < 8) suggestions.push('Use at least 8 characters.');
  if (!/[A-Z]/.test(password)) suggestions.push('Add an uppercase letter.');
  if (!/[a-z]/.test(password)) suggestions.push('Add a lowercase letter.');
  if (!/[0-9]/.test(password)) suggestions.push('Include a number.');
  if (!/[^A-Za-z0-9]/.test(password)) suggestions.push('Include a special character.');

  return (
    <div className="mt-3">
      {suggestions.length > 0 && (
        <div>
          <p className="font-semibold text-sm text-gray-700">Suggestions:</p>
          <ul className="list-disc ml-5 text-sm text-gray-600">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Suggestions;
