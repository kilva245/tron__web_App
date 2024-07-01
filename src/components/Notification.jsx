import React from 'react';

const Notification = ({ message, open }) => {
  if (!open) return null;

  return (
    <div className={`notification ${open ? 'open' : ''}`}>
      <div className="notification-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notification;