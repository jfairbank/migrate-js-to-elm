import React from 'react';

const Link = ({ children, onClick }) => (
  <a
    style={{
      color: 'blue',
      cursor: 'pointer',
      textDecoration: 'underline',
    }}
    onClick={onClick}
  >
    {children}
  </a>
);

export default Link;
