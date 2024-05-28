import Lyout from "../components/lyout/Lyout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarAddAppointement() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //const { patientId } = useParams();

  const handleDateSelect = (date) => {
    console.log("Selected Date:", date);
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setModalIsOpen(false);
  };
  return (
    <Lyout>
      <div style={{ position: "relative" }}>
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "650px" }}
          onSelectSlot={(slotInfo) =>
            handleDateSelect(new Date(slotInfo.start))
          }
          selectable={true}
        />
      </div>
      {modalIsOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="absolute bottom-0  p-4 md:p-5  overflow-y-auto overflow-x-hidden flex top-0 right-0 left-10 z-50 justify-center items-center w-full md:inset-0 h-full bg-transparent  "
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-gray-400 rounded-lg  shadow ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-black rounded-t ">
                <h3 className="text-lg font-semibold text-gray-900">
                  Create a new follow-up appointment
                </h3>
                <button
                  type="button"
                  className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                  data-modal-toggle="crud-modal"
                  onClick={handleModalClose}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleFormSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 ">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-black "
                    >
                      Name / Surname
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   placeholder-gray-500 "
                      placeholder="Patient Name"
                      required=""
                    />
                  </div>
                  <div className="col-span-2 ">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-black "
                    >
                      ICU/PD File number
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   placeholder-gray-500 "
                      placeholder="ICU/PD File number"
                      required=""
                    />
                  </div>

                  <div className="col-span-2 ">
                    <label
                      htmlFor="Follow-upPurpose"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Follow-up Purpose
                    </label>
                    <select
                      id="Follow-upPurpose"
                      className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   dark:placeholder-gray-400  "
                    >
                      <option selected="">Select Follow-up Purpose</option>
                      <option value="First appointment at ICU/PD">
                        First appointment at ICU/PD
                      </option>
                      <option value="Discharge">Discharge</option>
                      <option value="Regular check">Regular check</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Check after a treatment">
                        Check after a treatment
                      </option>
                      <option value="Modification">Modification</option>
                      <option value="Insurance request">
                        Insurance request
                      </option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <fieldset>
                      <legend className="mb-2 text-sm font-medium text-black">
                        Biomarkers needed
                      </legend>
                      <div className=" space-y-6">
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="comments"
                              name="comments"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="comments"
                              className="font-medium text-gray-900"
                            >
                              ABGs/CR/Polygraphy/X-Ray
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="candidates"
                              name="candidates"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="candidates"
                              className="font-medium text-gray-900"
                            >
                              chest film
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="offers"
                              name="offers"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="offers"
                              className="font-medium text-gray-900"
                            >
                              Advanced pressure/flow- curves analysis
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="offers"
                              name="offers"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="offers"
                              className="font-medium text-gray-900"
                            >
                              Pulmonary Functional Testing (PFT)
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="offers"
                              name="offers"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="offers"
                              className="font-medium text-gray-900"
                            >
                              Others
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add new follow-up appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Lyout>
  );
}

export default CalendarAddAppointement;
