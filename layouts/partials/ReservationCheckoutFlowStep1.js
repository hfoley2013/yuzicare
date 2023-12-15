import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from 'next/image';
import { z } from "zod";

const validationSchema = z
  .object({
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    phone: z
      .string()
      .min(10, { message: "Must be a valid phone number" }),
    city: z
      .string()
      .min(1, { message: "Please enter your current city" }),
    state: z
      .string()
      .min(1, { message: "Please enter your current state" }),
    on_mailing_list: z
      .boolean()
      .default(true)
      .optional()
  });

function ReservationCheckoutFlowStep1({ onSubmit, onClose, formData }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (formData.firstname) {
      setValue("firstname", formData.firstname);
      setValue("lastname", formData.lastname);
      setValue("email", formData.email);
      setValue("phone", formData.phone);
      setValue("city", formData.city);
      setValue("state", formData.state);
      setValue("on_mailing_list", formData.on_mailing_list ? "Yes" : "No");
    }
  });

  const handleFormSubmit = (data) => {
    onSubmit(data); // Pass the form data to the parent component
  };

  return (
    <section className="fixed inset-0 z-50 items-center justify-center p-4 mt-4 overflow-y-auto md:flex">
      <div className='flex flex-col md:flex-row'>
        <div className='flex-grow rounded-md bg-primary'>
          <Image
            src="/images/logos/yuzi-ring-logo.png"
            alt="Logo"
            width={500}
            height={500}
            className='hidden object-contain p-4 mt-5 rounded-md md:block'
          />
          <div className='py-5'>
            <h3 className="text-center text-theme-light">Step 1</h3>
            <hr className='w-[80%] mx-auto border-theme-light'></hr>
            <h4 className="text-center text-theme-light">Basic Information</h4>
          </div>
        </div>
        <div className="relative w-full max-w-screen-sm p-4 mx-auto rounded-lg shadow-lg bg-theme-light">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 text-dark hover:text-gray-800 focus:outline-none"
            type="button"
            id="abort-checkout-step-1"
          >
            X
          </button>
          <h2 className="mb-4 text-2xl font-bold text-center">Tell us a little more about yourself</h2>
          <form id="reservation-checkout-form-step-1" className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <label
                className="block text-sm font-bold text-dark"
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-dark border ${errors.firstname && "border-red-500"} rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="firstname"
                type="text"
                placeholder="First Name"
                autoComplete="given-name"
                {...register("firstname")}
              />
              {errors.firstname && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.firstname?.message}
                </p>
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
                className={`w-full px-3 py-2 text-sm leading-tight text-dark border ${errors.lastname && "border-red-500"} rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="lastname"
                type="text"
                placeholder="Last Name"
                {...register("lastname")}
              />
              {errors.lastname && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.lastname?.message}
                </p>
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
                className={`w-full px-3 py-2 text-sm leading-tight text-dark border ${errors.email && "border-red-500"} rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-bold text-dark"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-dark border ${errors.phone && "border-red-500"} rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="phone"
                type="tel"
                placeholder="425 555 5555"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.phone?.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-bold text-dark"
                htmlFor="city"
              >
                City
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-dark border ${errors.city && "border-red-500"} rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="city"
                type="text"
                {...register("city")}
              />
              {errors.city && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.city?.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-bold text-dark"
                htmlFor="state"
              >
                State
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-dark border ${errors.state && "border-red-500"} rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="state"
                type="text"
                {...register("state")}
              />
              {errors.state && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.state?.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input type="checkbox" id="on_mailing_list" checked {...register("on_mailing_list")} />
              <label
                htmlFor="on_mailing_list"
                className={`ml-2 text-sm font-bold ${errors.on_mailing_list ? "text-red-500" : "text-dark"}`}
              >
                Please send me updates and information about the program.
              </label>
            </div>

            <div className="w-full text-center">
              <button
                className="w-full px-4 py-2 text-white rounded-full bg-primary hover:bg-primary/50 focus:outline-none focus:shadow-outline"
                type="submit"
                id="complete-checkout-step-1-button"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ReservationCheckoutFlowStep1;
