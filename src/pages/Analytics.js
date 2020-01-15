import React from 'react';

const Analytics = (props) => {
  const token = localStorage.getItem('YurbiSessionToken') || '';
  return (
    <iframe
      src={`${window.config.analyticsUrl}/yurbi/sso.html?s=${token}`}
      id="analytics"
      title="analytics"
      style={{
        display: 'block',
        height: '100vh',
        width: '100%',
        border: 'none',
      }}
    />
  );
}

export default Analytics;