import React from 'react';

const ToggleButton = ({ isDarkMode, onToggle }) => (
  <button className="toggle-button" onClick={onToggle}>
    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
  </button>
);

export default ToggleButton;
