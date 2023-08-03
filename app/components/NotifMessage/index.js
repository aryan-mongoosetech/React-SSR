import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotif } from 'Actions';

function NotifMessage() {
  const dispatch = useDispatch();

  const { message, variant } = useSelector((state) => state.notification);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setNotif({ message: '', variant: '' }));
    }, 5000);
  }, [message]);

  return (
    <div
      id="notif"
      className={message !== '' ? 'show' : ''}
      style={{ background: variant === 'error' ? '#d62828' : '#34a853' }}
    >
      <div className="notif-text-icon">
        <div className="notif-message">{message}</div>
      </div>
    </div>
  );
}

export default NotifMessage;
