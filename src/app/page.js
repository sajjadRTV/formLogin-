
'use client'

import { useEffect, useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

export default function Home() {

  //! state show and hidden modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  //! state progress 
  const [progress, setProgress] = useState(0);
  //! state inputs (give inputs)
  const [stateInput, setStateInput] = useState({});

  //! object input Refs
  //! exmaple inputRefs.fname.current
  const inputRefs = {
    fname: useRef(),
    lname: useRef(),
    email: useRef(),
    message: useRef(),
    tickConsent: useRef(),
    radio: useRef()
  };

  //! object spans errors Refs
  //! exmaple errorRefs.fname.current
  const errorRefs = {
    fname: useRef(),
    lname: useRef(),
    email: useRef(),
    message: useRef(),
    tickConsent: useRef(),
    radio: useRef()
  };

  
  const updateInputState = (e) => {
    const { id, value } = e.target;
    if (value.trim() !== '') errorRefs[id].current.classList.add('hidden');
    setStateInput((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleRadioChange = (e) => {
    const { id } = e.target;
    errorRefs.radio.current.classList.add('hidden'); 
    setStateInput((prevState) => {
      const newState = { ...prevState }; 
      if (id === 'general') delete newState.support;
      if (id === 'support') delete newState.general;
      newState[id] = true;
      return newState;
    });
  };


  //! function send data to API
  const validateAndSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['fname', 'lname', 'email', 'message', 'tickConsent'];

    const isEmpty = requiredFields.some((field) => inputRefs[field].current.value.trim() === '' || !stateInput[field]);

    if (isEmpty) {
      requiredFields.forEach((field) => {
        if (inputRefs[field].current.value.trim() === '' || !stateInput[field]) {
          errorRefs[field].current.classList.replace('hidden', 'inline-block');
        } else {
          errorRefs[field].current.classList.add('hidden');
        }
      });
      if (!stateInput.general && !stateInput.support) errorRefs.radio.current.classList.replace('hidden', 'inline-block');
    } else {
      fetch('http://localhost:3003', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stateInput),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          setIsModalOpen(true);
          setProgress(0);
        })
        .catch((err) => console.log(err));
    }
  };

  //! useeffect progressbar
  useEffect(() => {
    if (isModalOpen) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            closeModal();
            return prev;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(progressInterval);
    }
  }, [isModalOpen]);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center flex-col max-lg:w-full text-white">
          <div className="bg-[#0c3126e0] p-2 rounded-lg max-lg:mx-[4px] relative">
            <div className="p-2 rounded shadow-lg flex items-center max-lg:justify-center">
              <FaCircleCheck className='text-[20px] mr-2 text-[#04aa6d]' />
              <p className="font-bold">Message Sent</p>
            </div>
            <p className="p-2 max-lg:text-[12px] max-lg:text-center">
              Thank you for completing the form. We'll be in touch soon!
            </p>
            <div className="absolute bottom-0 left-0 h-1 bg-gray-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      <div className="w-[900px] rounded-2xl bg-white p-5 max-lg:w-full">
        <h1 className="font-bold text-[30px] text-[#0c3126e0] max-lg:text-[20px]">Contact us</h1>
        <form method="POST" className="mt-6" onSubmit={validateAndSubmit}>
          <div className="flex items-baseline justify-between gap-6 max-lg:flex-col max-xl:justify-start">
            {['fname', 'lname'].map((field) => (
              <label htmlFor={field} key={field} className="block w-1/2 text-[18px] max-lg:w-full">
                {field === 'fname' ? 'First Name' : 'Last Name'} <span className="text-[#112922e0]">*</span>
                <div>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    className="outline-none border-[2px] border-[#125c33b7] w-full p-[10px] rounded-lg mt-3"
                    onChange={updateInputState}
                    ref={inputRefs[field]}
                  />
                  <span ref={errorRefs[field]} className="text-red-600 py-[5px] hidden">The field is required</span>
                </div>
              </label>
            ))}
          </div>
          <div className="pt-6">
            <label htmlFor="email" className="block w-full text-[18px] max-lg:w-full">
              Email Address <span className="text-[#112922e0]">*</span>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="outline-none border-[2px] border-[#125c33b7] w-full p-[10px] rounded-lg mt-3"
                  onChange={updateInputState}
                  ref={inputRefs.email}
                />
              </div>
              <span ref={errorRefs.email} className="text-red-600 py-[5px] hidden">The field is required</span>
            </label>
          </div>
          <div className="pt-6">
            <label htmlFor="" className="block w-full text-[18px]">Query Type <span>*</span></label>
            <div className="flex items-baseline gap-6 mt-3 max-lg:flex-col max-lg:items-start">
              {['general', 'support'].map((type) => (
                <div key={type} className="p-[10px] border-[2px] border-[#125c33b7] w-1/2 rounded-lg max-lg:w-full">
                  <label htmlFor={type} className="block w-full text-[18px] ml-3">
                    <input
                      type="radio"
                      name="queryType"
                      id={type}
                      className="mr-3 w-5 h-5 align-middle"
                      onChange={handleRadioChange}
                    />
                    {type === 'general' ? 'General Enquiry' : 'Support Request'}
                  </label>
                </div>
              ))}
            </div>
            <span ref={errorRefs.radio} className="text-red-600 py-[5px] hidden">Please select a query type</span>
          </div>
          <div className="py-6">
            <label htmlFor="message" className="block w-full text-[18px]">
              Message <span className="text-[#112922e0]">*</span>
              <textarea
                name="message"
                id="message"
                className="w-full pl-2 mt-3 border-[2px] border-[#125c33b7] rounded-lg max-h-[150px] min-h-[150px] outline-none max-lg:w-full"
                spellCheck="false"
                onChange={updateInputState}
                ref={inputRefs.message}
              />
            </label>
            <span ref={errorRefs.message} className="text-red-600 py-[5px] hidden">The field is required</span>
          </div>
          <div>
            <label htmlFor="tickConsent" className="align-middle text-[19px] w-full block">
              <input
                type="checkbox"
                className="w-5 h-5 mr-3 align-middle"
                id="tickConsent"
                onChange={(e) => {
                  const { checked, id } = e.target;
                  errorRefs.tickConsent.current.classList.add('hidden');
                  setStateInput((prevState) => ({
                    ...prevState,
                    [id]: checked ? true : undefined
                  }));
                }}
                ref={inputRefs.tickConsent}
              />
              I consent to being contacted by the team <span className="text-[#112922e0]">*</span>
            </label>
            <span ref={errorRefs.tickConsent} className="text-red-600 py-[5px] hidden">To submit this form, please consent to being contacted</span>
          </div>
          <div className="w-full text-center mt-10">
            <button type="submit" className="w-full bg-[#123629] p-4 text-white font-bold rounded-lg">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}