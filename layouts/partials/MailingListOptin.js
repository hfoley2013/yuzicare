'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from 'next/image';
import { z } from "zod";
import sendEmail from "@lib/utils/sendEmail";

const validationSchema = z
  .object({
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
  });


function MailingListOptin({ onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const handleMailingListSubmit = async (formData) => {
    try {
      const emailTemplateParams = {
        from_name: formData.firstname + ' ' + formData.lastname,
        from_email: formData.email,
        message: `${formData.firstname} ${formData.lastname} has joined the mailinglist!`,
        subject: 'Welcome to the Yuzi Mailing List!',
      };

      const toYuziMessageConfig = {
        sendingEmailAddress: "contact@yuzicare.com",
        receivingEmailAddress: "contact@yuzicare.com",
        replyTo: emailTemplateParams.from_email,
        subject: "New Mailing List Subscriber",
      };

      const toYuziEmailTemplate = `
      <p>${emailTemplateParams.from_name} has joined the mailinglist!</p>
<p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">${emailTemplateParams.message}</p>
<p>Best wishes,<br>Yuzi Care Marketing Team</p>
      `

      const toClientMessageConfig = {
        sendingEmailAddress: "contact@yuzicare.com",
        receivingEmailAddress: emailTemplateParams.from_email,
        subject: emailTemplateParams.subject,
      };

      const toClientEmailTemplate = `
      <section class="wrapper" style="background-color:#ecdad3; padding-bottom:8px;">
<header class="header" style="text-align: center; margin: 10px; padding:10px"><a href="https://yuzicare.com"><img src="https://yuzi-assets.s3.us-west-2.amazonaws.com/yuzi-full-logo-no-bg.png" alt="Yuzi Care" width="300" height="169"></a></header>
<article class="content" style="margin: 0 auto; max-width: 600px; padding: 20px; background-color: #ffffff; border-radius: 25px;">
<p>Dear ${emailTemplateParams.from_name},</p>
<p>Thank you for joining the Yuzi mailing list!  At Yuzi, our mission is to prioritize moms by providing the nurturing care and support they deserve.</p>
<p>By subscribing to our mailing list you’ll be the first to hear about updates on the Yuzi Retreat, special offers, and new resources for pregnancy, postpartum, and beyond.</p>
<p>You can also follow us on social media using the buttons below. 👇</p>

<p>With our heartfelt gratitude,</p>
<p class="signature" style="font-style: italic; text-align: left; font-size: 20px;margin-bottom:0px">The Yuzi Team</p>
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial; width: 103.333%; height: 126.215px;" cellspacing="0" cellpadding="0">
<tbody>
<tr style="height: 99.0278px;">
<td style="width: 100%; height: 99.0278px;">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial; width: 100.707%; height: 65px;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="vertical-align: middle; width: 13.2454%;"><a href="https://yuzicare.com" target="_blank" rel="noopener"><img style="width: 75px; height: 75px;" src="https://yuzi-assets.s3.us-west-2.amazonaws.com/yuzi-ring-logo-no-bg.png" alt="Yuzi Care Logo"> </a>
<div style="width: 20px;">&nbsp;</div>
</td>
<td style="width: 0.86571%; border-bottom: none; border-left: 1px solid rgb(138, 136, 134);" width="1" height="auto">&nbsp;</td>
<td style="vertical-align: middle; width: 85.8784%;">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial; width: 99.5497%; height: 80px;" cellspacing="0" cellpadding="0">
<tbody>
<tr style="vertical-align: middle; height: 20px;">
<td style="vertical-align: middle; width: 3.52442%; height: 20px;" width="20">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="vertical-align: bottom;"><span style="display: inline-block; background-color: #520864;"><img style="display: block; background-color:#520864;" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/phone-icon-2x.png" alt="mobilePhone" width="13"></span></td>
</tr>
</tbody>
</table>
</td>
<td style="padding: 0px; color: rgb(0, 0, 0); width: 96.4809%; height: 20px;">&nbsp;<a style="text-decoration: none; color: rgb(0,0,0); font-size: 12px;" href="tel:2062226295" target="_blank" rel="noopener">(206) 222-6295</a></td>
</tr>
<tr style="vertical-align: middle; height: 20px;">
<td style="vertical-align: middle; width: 3.52442%; height: 20px;" width="30">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="vertical-align: bottom;"><span style="display: inline-block; background-color: rgb(138,136,134);"><img style="display: block; background-color:#520864;" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon-2x.png" alt="emailAddress" width="13"></span></td>
</tr>
</tbody>
</table>
</td>
<td style="padding: 0px; width: 96.4809%; height: 20px;">&nbsp;<a style="text-decoration: none; color: rgb(0,0,0); font-size: 12px;" href="mailto:contact@yuzicare.com" target="_blank" rel="noopener">contact@yuzicare.com</a></td>
</tr>
<tr style="vertical-align: middle; height: 20px;">
<td style="vertical-align: middle; width: 3.52442%; height: 20px;" width="30">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="vertical-align: bottom;"><span style="display: inline-block; background-color: rgb(138,136,134);"><img style="display: block; background-color: #520864;" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon-2x.png" alt="website" width="13"></span></td>
</tr>
</tbody>
</table>
</td>
<td style="padding: 0px; width: 96.4809%; height: 20px;">&nbsp;<a style="text-decoration: none; color: rgb(0,0,0); font-size: 12px;" href="//www.yuzicare.com" target="_blank" rel="noopener">www.yuzicare.com</a></td>
</tr>
<tr style="vertical-align: middle; height: 20px;">
<td style="vertical-align: middle; width: 3.52442%; height: 20px;" width="30">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="vertical-align: bottom;"><span style="display: inline-block; background-color: rgb(138,136,134);"><img style="display: block; background-color:#520864;" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/address-icon-2x.png" alt="address" width="13"></span></td>
</tr>
</tbody>
</table>
</td>
<td style="padding: 0px; width: 96.4809%; height: 20px;"><span style="font-size: 12px; color: rgb(0,0,0);">&nbsp; Seattle, WA</span></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial; width: 50.3333%; height: 23.9931px;" cellspacing="0" cellpadding="0">
<tbody>
<tr><td style="text-align:center;vertical-align:middle"><table cellpadding="0" cellspacing="0" style="display:inline-block;vertical-align:-webkit-baseline-middle;font-size:medium;font-family:Lato"><tbody><tr style="text-align:right"><td><a href="https://www.facebook.com/Yuzicare" color="#520864" style="display:inline-block;padding:0px;background-color:rgb(82,8,100)" target="_blank"><img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/facebook-icon-2x.png" alt="facebook" color="#520864" height="24" style="background-color:rgb(82,8,100);max-width:135px;display:block"></a></td><td width="5"><div></div></td><td><a href="https://twitter.com/Yuzicare" color="#520864" style="display:inline-block;padding:0px;background-color:rgb(82,8,100)" target="_blank"><img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/twitter-icon-2x.png" alt="twitter" color="#520864" height="24" style="background-color:rgb(82,8,100);max-width:135px;display:block"></a></td><td width="5"><div></div></td><td><a href="https://linkedin.com/company/yuzi-care/" color="#520864" style="display:inline-block;padding:0px;background-color:rgb(82,8,100)" target="_blank"><img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/linkedin-icon-2x.png" alt="linkedin" color="#520864" height="24" style="background-color:rgb(82,8,100);max-width:135px;display:block"></a></td><td width="5"><div></div></td><td><a href="https://www.instagram.com/yuzicare/" color="#520864" style="display:inline-block;padding:0px;background-color:rgb(82,8,100)" target="_blank"><img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/instagram-icon-2x.png" alt="instagram" color="#520864" height="24" style="background-color:rgb(82,8,100);max-width:135px;display:block"></a></td><td width="5"><div></div></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td height="30"></td></tr>
</tbody>
</table>
</article>
</section>
`;
      const resultToYuzi = await sendEmail(emailTemplateParams, toYuziEmailTemplate, toYuziMessageConfig);
      console.log(resultToYuzi);
      const resultToClient = await sendEmail(emailTemplateParams, toClientEmailTemplate, toClientMessageConfig);
      console.log(resultToClient);

      onClose(); // Close the modal after successful form submission
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle any form submission errors here
    }
  };
  return (
    <section className="fixed inset-0 z-50 items-center justify-center p-4 mt-4 overflow-y-auto md:flex">
      <div className='flex flex-col'>
        <div className="relative w-full max-w-screen-sm p-4 mx-auto bg-white border-4 rounded-lg shadow-lg border-secondary">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mr-4 text-dark hover:text-gray-800 focus:outline-none"
          >
            X
          </button>
          <h2 className="mb-4 text-center text-secondary">Join the Mailing List</h2>
          <h3 className="mb-4 text-2xl font-bold text-center">Access to Exclusive Offers and Community Insights</h3>
          <form id="join-mailing-list-form" className="space-y-4" onSubmit={handleSubmit((formData) => {
            handleMailingListSubmit(formData)
              .then(() => {
                onClose();
              })
              .catch((err) => {
                console.error('Error submitting form: ', err);
              });
          })}>
            <div>
              <label
                className="block text-sm font-bold text-dark"
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-dark border rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="firstname"
                type="text"
                placeholder="First Name"
                autoComplete="given-name"
                {...register("firstname")}
              />
              {errors.firstname && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-bold text-dark"
                htmlFor="lastname"
              >
                Last Name
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-dark border rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="lastname"
                type="text"
                placeholder="Last Name"
                {...register("lastname")}
              />
              {errors.lastname && (
                <p className="text-red-500">{errors.lastname.message}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-bold text-dark"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-dark border rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <p
                className={`ml-2 text-sm text-center text-dark`}
              >
                By signing up you agree to receive emails from Yuzi.
              </p>
            </div>

            <div className="w-full text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white rounded-full bg-secondary hover:bg-secondary/50 focus:outline-none focus:shadow-outline"
                type="submit"
                id="join-mailing-list-button"
              >
                Send Me Updates!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default MailingListOptin;
