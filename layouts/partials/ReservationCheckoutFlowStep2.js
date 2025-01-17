import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from 'next/image';
import DatePicker from 'react-multi-date-picker';
import "react-multi-date-picker/styles/colors/teal.css"
import transition from "react-element-popper/animations/transition"


const today = new Date();
const minDate = new Date("2024-05-02");
const maxDate = new Date(today);
maxDate.setFullYear(today.getFullYear() + 2);

const validationSchema = z
  .object({
    is_pregnant_: z
      .coerce
      .boolean({ message: "We need to know if you are pregnant." }),
    due_date: z
      .coerce
      .date({
        required_error: "Please enter your due date.",
        invalid_type_error: "Please select a valid date.",
      })
      .optional(),
    desired_visit_date: z
      .array(
        z
          .coerce
          .date()
          .min(minDate, { message: "Please select a date after May 2024." })
          .max(maxDate, { message: "Please select a date before 2 years from now." })
      )
      .optional(),
  });

function ReservationCheckoutFlowStep2({ onSubmit, onClose, onPrev, formData }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  console.log(watch("desired_visit_date"));

  const desiredVisitDates = watch("desired_visit_date");
  const desired_visit_date_start = desiredVisitDates?.[0] || '';
  const desired_visit_date_end = desiredVisitDates?.[1] || '';

  const handleFormSubmit = (data) => {
    console.log(data);
    onSubmit(data); // Pass the form data to the parent component
  };

  return (
    <section className="fixed inset-0 z-50 items-center justify-center p-4 mt-4 overflow-y-auto md:flex">

      <div className='flex flex-col md:flex-row'>
        <div className='flex-grow rounded-md shadow-lg bg-theme-light'>
          <Image
            src="/images/logos/yuzi-ring-logo-no-bg.svg"
            alt="Logo"
            width={500}
            height={500}
            className='hidden object-contain p-4 mt-5 md:block'
          />
          <div className='py-5'>
            <h3 className="text-center text-secondary">Step 2</h3>
            <hr className='w-[80%] mx-auto border-secondary'></hr>
            <h4 className="text-center text-secondary">Your Visit</h4>
          </div>
        </div>
        <div className="relative w-full max-w-screen-sm p-4 mx-auto rounded-lg shadow-lg bg-theme-light">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 text-dark hover:text-gray-800 focus:outline-none"
            type="button"
            id="abort-checkout-step-2"
          >
            X
          </button>
          <h2 className="mb-4 text-2xl font-bold text-center">Tell us a little more about yourself</h2>
          <form id="reservation-checkout-form-step-2" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-dark"
                htmlFor="is_pregnant_"
              >
                Are you currently pregnant?
              </label>
              <select
                className={`w-full px-3 py-2 text-sm leading-tight text-dark border ${errors.is_pregnant_ && "border-red-500"
                  } rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="is_pregnant_"
                type="text"
                {...register("is_pregnant_")}
              >
                <option value="">Select an option</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {errors.is_pregnant_ && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.is_pregnant_?.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-dark"
                htmlFor="due_date"
              >
                When is your due date?
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-dark border ${errors.due_date && "border-red-500"
                  } rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="due_date"
                type="date"
                {...register("due_date")}
              />
              {errors.due_date && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.due_date?.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-dark"
                htmlFor="desired_visit_date"
              >
                Please select your desired dates of visit.
              </label>
              <p className="text-xs">Please note, at this time we are only able to take reservations for May 2024 or later.</p>
              <Controller
                control={control}
                name="desired_visit_date"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <>
                    <DatePicker
                      minDate={minDate}
                      maxDate={maxDate}
                      range
                      value={minDate}
                      date={value}
                      onChange={(dates) => onChange(dates)}
                      format="MM/DD/YYYY"
                      style={{
                        width: "100%",
                        borderRadius: "0.5rem",
                      }}
                      inputClass={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.25',
                        color: '#4A5568',
                        border: '1px solid #E2E8F0',
                        borderRadius: '0.5rem',
                        appearance: 'none',
                        outline: 'none',
                        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      calendarPosition="bottom-start"
                      animations={[
                        transition({ duration: 800, from: 35 })
                      ]}
                    />
                    {error && (
                      <p className="mt-2 text-xs italic text-red-500">
                        {error.message}
                      </p>
                    )}
                    {/* hidden fields mapped to HubSpot contact properties */}
                    <input type="date" className="hidden" {...register("desired_visit_date_start")} value={desired_visit_date_start} />
                    <input type="date" className="hidden" {...register("desired_visit_date_end")} value={desired_visit_date_end} />
                  </>
                )}
              />
              <p className='mt-2 text-center'>Don’t worry, we know babies show up on their own schedule. We’ll do our best to accommodate an earlier / later start date.</p>
            </div>

            <div className="flex justify-between text-center">
              <button
                className="w-[40%] px-4 py-2 font-bold text-white bg-secondary/20 rounded-full  hover:bg-secondary focus:outline-none focus:shadow-outline"
                type="button"
                onClick={onPrev}
              >
                Previous
              </button>
              <button
                className="w-[40%] px-4 py-2 font-bold text-white bg-secondary rounded-full hover:bg-secondary/50 focus:outline-none focus:shadow-outline"
                type="submit"
                id="complete-checkout-step-2-button"
              >
                Next
              </button>
            </div>
            <hr className="mt-6 mb-2 border-t" />
          </form>
        </div>
      </div>
    </section>
  );
}

export default ReservationCheckoutFlowStep2;
