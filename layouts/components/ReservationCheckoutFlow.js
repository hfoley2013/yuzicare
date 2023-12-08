import { useState, useEffect } from "react";
import ReservationCheckoutFlowStep1 from "@layouts/partials/ReservationCheckoutFlowStep1";
import ReservationCheckoutFlowStep2 from "@layouts/partials/ReservationCheckoutFlowStep2";
import ReservationCheckoutFlowStep3 from "@layouts/partials/ReservationCheckoutFlowStep3";
import sendEmail from "@lib/utils/sendEmail.js";

const Form = ({ closeReservationCheckout }) => {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  async function sendEmailOnStep2Completion(formData) {

    const emailTemplateParams = {
      from_name: formData.firstname + ' ' + formData.lastname,
      from_email: formData.email,
      from_phone: formData.phone,
      is_pregnant: formData.is_pregnant_ ? 'Yes' : 'No',
      // due_date: formData.due_date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
      desired_visit_dates: formData.desired_visit_date ? `${formData.desired_visit_date[0].toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })} to ${formData.desired_visit_date[1].toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}` : 'No dates provided.',
      joined_mailing_list: formData.on_mailing_list ? 'Yes' : 'No',
      message: `${formData.firstname} ${formData.lastname} completed step 2 of reservation checkout! They are ${formData.is_pregnant_ ? 'currently pregnant' : 'not currently pregnant'}. They would like to visit from ${formData.desired_visit_date[0].toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })} to ${formData.desired_visit_date[1].toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}. They ${formData.on_mailing_list ? 'would' : 'would not'} like to join the mailing list.`,
    };
    // Their due date is ${formData.due_date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}. removed for a-b testing from message
    // <p>Due Date: ${emailTemplateParams.due_date}</p> removed for a-b testing
    const emailTemplate = `
        <!DOCTYPE html>
          <html>
            <head>
            </head>
            <body>
              <p>Name: ${emailTemplateParams.from_name}</p>
              <p>Email: ${emailTemplateParams.from_email}</p>
              <p>Phone: ${emailTemplateParams.from_phone}</p>
              <p>Are they pregnant? ${emailTemplateParams.is_pregnant ? 'Yes' : 'No'}</p>
              <p>Desired Visit Dates: ${emailTemplateParams.desired_visit_dates}</p>
              <p>Joined Mailing List? ${emailTemplateParams.joined_mailing_list}</p>
              <p>Message: ${emailTemplateParams.message}</p>
            </body>
          </html>
          `;

    const messageConfig = {
      sendingEmailAddress: 'contact@yuzicare.com',
      receivingEmailAddress: ['harper@yuzicare.com', 'steph@yuzicare.com', 'michelle@yuzicare.com'],
      subject: `${emailTemplateParams.from_name} completed Step 2 of Reservation Checkout`,
    };

    try {
      const result = await sendEmail(emailTemplateParams, emailTemplate, messageConfig);
      console.log(result);
    } catch (error) {
      console.log(error);
    };
  }

  useEffect(() => {

    if (step === 3) {
      sendEmailOnStep2Completion(formData);
    }
  });


  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const onClose = () => {
    closeReservationCheckout();
  };

  return (
    <section className="p-2">
      {step === 1 && (
        <ReservationCheckoutFlowStep1
          onSubmit={handleNextStep}
          onClose={onClose}
          formData={formData}
        />
      )}
      {step === 2 && (
        <ReservationCheckoutFlowStep2
          onSubmit={handleNextStep}
          onPrev={handlePrevStep}
          onClose={onClose}
          formData={formData}
        />
      )}
      {step === 3 && (
        <ReservationCheckoutFlowStep3
          onSubmit={handleNextStep}
          onPrev={handlePrevStep}
          onClose={onClose}
          formData={formData}
        />
      )}
    </section>
  );
};

export default Form;
