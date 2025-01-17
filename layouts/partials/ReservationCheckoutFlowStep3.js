import React from 'react';
import CheckoutButton from '@layouts/components/CheckoutButton';
import Image from 'next/image';

function ReservationCheckoutFlowStep3({ onClose, formData }) {
  return (
    <section className="fixed inset-0 z-50 items-center justify-center p-4 mt-4 overflow-y-auto md:flex">
      <div className='flex flex-col md:flex-row'>
        <div className='flex-grow px-10 py-10 rounded-md shadow-lg bg-theme-light'>
          <Image
            src="/images/logos/yuzi-ring-logo-no-bg.svg"
            alt="Logo"
            width={500}
            height={500}
            className='hidden object-contain mt-5 md:block'
          />
          <div className='py-5'>
            <h3 className="text-center text-theme-light">Step 3</h3>
            <hr className='w-[80%] mx-auto border-theme-light'></hr>
            <h4 className="text-center text-theme-light">Reservation Payment</h4>
          </div>
        </div>
        <div className="relative w-full max-w-screen-sm p-4 mx-auto rounded-lg shadow-lg bg-theme-light">
          <button
            onClick={onClose}
            id="abort-checkout-step-3"
            className="absolute top-0 right-0 m-4 text-dark hover:text-gray-800 focus:outline-none"
            type="button"
          >
            X
          </button>
          <div className='mt-2 space-y-10 md:mt-5'>
            <h2 className="mx-auto mb-4 text-2xl font-bold text-center md:w-4/5">We kindly request a $100 deposit to secure your reservation.</h2>
            <h3 className="mx-auto mb-4 text-base text-center sm:text-2xl">Rest assured, this deposit is <u className='italic underline decoration-primary'>fully refundable.</u></h3>
            <div className='text-center'>
              <CheckoutButton formData={formData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationCheckoutFlowStep3;
