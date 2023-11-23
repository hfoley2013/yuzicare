import { useState, useEffect } from "react";
import ReservationCheckoutFlowStep1 from "@layouts/partials/ReservationCheckoutFlowStep1";
import ReservationCheckoutFlowStep2 from "@layouts/partials/ReservationCheckoutFlowStep2";
import ReservationCheckoutFlowStep3 from "@layouts/partials/ReservationCheckoutFlowStep3";
import sendEmail from "@lib/utils/sendEmail.js";

const Form = ({ closeReservationCheckout }) => {

  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  async function sendEmailOnStep2Completion() {
    const emailTemplateParams = {
      fromName: formData.firstName + ' ' + formData.lastName,
      fromEmail: formData.email,
      fromPhone: formData.phone,
      isPregnant: formData.isPregnant ? 'Yes' : 'No',
      dueDate: formData.dueDate.toLocaleDateString("en-us"),
      desiredVisitDates: formData.desiredVisitDates ? `${formData.desiredVisitDates[0].toLocaleDateString("en-us")} to ${formData.desiredVisitDates[1].toLocaleDateString("en-us")}` : 'No dates provided.',
      joinedMailingList: formData.joinMailingList ? 'Yes' : 'No',
      message: `${formData.firstName} ${formData.lastName} completed step 2 of reservation checkout! They are ${formData.isPregnant ? 'currently pregnant' : 'not currently pregnant'}. Their due date is ${formData.dueDate.toLocaleDateString("en-us")}. They would like to visit from ${formData.desiredVisitDates[0].toLocaleDateString("en-us")} to ${formData.desiredVisitDates[1].toLocaleDateString("en-us")}. They ${formData.joinMailingList ? 'would' : 'would not'} like to join the mailing list.`,
    };

    const emailTemplate = `
        <!DOCTYPE html>
          <html>
            <head>
            </head>
            <body>
              <p>Name: ${emailTemplateParams.fromName}</p>
              <p>Email: ${emailTemplateParams.fromEmail}</p>
              <p>Phone: ${emailTemplateParams.fromPhone}</p>
              <p>Are they pregnant? ${emailTemplateParams.isPregnant ? 'Yes' : 'No'}</p>
              <p>Due Date: ${emailTemplateParams.dueDate}</p>
              <p>Desired Visit Dates: ${emailTemplateParams.desiredVisitDates}</p>
              <p>Joined Mailing List? ${emailTemplateParams.joinedMailingList}</p>
              <p>Message: ${emailTemplateParams.message}</p>
            </body>
          </html>
          `;

    const messageConfig = {
      sendingEmailAddress: 'contact@yuzicare.com',
      receivingEmailAddress: ['harper@yuzicare.com', 'steph@yuzicare.com', 'michelle@yuzicare.com'],
      subject: `${emailTemplateParams.fromName} completed Step 2 of Reservation Checkout`,
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
      sendEmailOnStep2Completion();
    }
  });


  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    console.log(formData);
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
