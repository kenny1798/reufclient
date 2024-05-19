import React, { useEffect, useState } from 'react';
import ReserveFailed from './ReserveFailed';
import ReserveSuccess from './ReserveSuccess';

function ReserveFinish() {

  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    // Fetch data from your server when the component mounts
    fetch(`${process.env.REACT_APP_SERVER}/billplz-callback`)
      .then((response) => response.text())
      .then((data) => {
        console.log(data)
        setPaymentStatus(data);
      });
  }, []);

  console.log(paymentStatus)

  return (
    <div>
      <div
        className="row justify-content-center min-vh-100"
        style={{ backgroundColor: "#333" }}
      >
        <div className="title">
              {paymentStatus === 'Callback received successfully' ? (<ReserveSuccess />) : (<ReserveFailed />)}
              </div>

      </div>
      </div>
  )
}

export default ReserveFinish