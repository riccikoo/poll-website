import React from 'react';

const Button = ({ children, ...props }) => (
  <button {...props}>
    {children}
  </button>
);

const DropdownButton = ({ onClick, className = '', children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 ${className}`}
  >
    {children}
  </button>
);

export default Button;
export { DropdownButton }; 