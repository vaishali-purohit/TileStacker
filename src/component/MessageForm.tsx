import React, { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

type MessageFormProps = {
  addTile: (date: string, message: string) => void;
  closeForm: () => void;
  open: boolean;
};

const MessageForm: React.FC<MessageFormProps> = ({
  open,
  closeForm,
  addTile,
}) => {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ date?: string; message?: string }>({});

  // Helper function to validate the form
  const validateForm = () => {
    const newErrors: { date?: string; message?: string } = {};

    // Date validation: Ensure it's not empty and in valid format (YYYY-MM-DD)
    if (!date) {
      newErrors.date = 'Date is required';
    } else {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        newErrors.date = 'Invalid date format. Please use YYYY-MM-DD.';
      } else if (dateObj > new Date()) {
        newErrors.date = 'Date cannot be in the future.';
      }
    }

    // Message validation: Ensure it's not empty
    if (!message) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addTile(date, message);
      closeForm();
    }
  };

  // Disable button until the form is valid
  const isFormValid = date && message;

  return (
    <Dialog open={open} onClose={closeForm} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-blue-500 px-4 py-3 text-center">
              <DialogTitle
                as="h3"
                className="text-base font-semibold text-white"
              >
                Add New Message
              </DialogTitle>
            </div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <form id="messageForm" onSubmit={handleSubmit}>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="Date"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Date (YYYY-MM-DD)
                          </label>
                          <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                              <input
                                id="Date"
                                name="Date"
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="yyyy-mm-dd"
                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                              />
                            </div>
                            {errors.date && (
                              <p className="text-sm text-red-600">
                                {errors.date}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="Message"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Message
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="Message"
                              name="Message"
                              rows={3}
                              onChange={(e) => setMessage(e.target.value)}
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                              defaultValue={''}
                            />
                          </div>
                          {errors.message && (
                            <p className="text-sm text-red-600">
                              {errors.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                form="messageForm"
                disabled={!isFormValid} // Disable the button if the form is not valid
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${!isFormValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Add Message
              </button>
              <button
                type="button"
                data-autofocus
                onClick={closeForm}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default MessageForm;
