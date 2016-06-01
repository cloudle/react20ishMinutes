import React from 'react';

export default function Layout({ children }) {
  return <div className="application-wrapper">
    <div className="app-header">
      <span>Knight's Messenger!</span>
    </div>
    <div className="app-content">
      {children}
    </div>
  </div>;
}