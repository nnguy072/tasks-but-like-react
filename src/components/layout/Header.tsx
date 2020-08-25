import React from 'react';
import { Link } from 'react-router-dom';

const headerStyle: React.CSSProperties = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
};

const linkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none'
}

const Header: React.FC = () => 
  <header style={headerStyle}>
    <h1>Tasks</h1>
    <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link>
  </header> 

export default Header;