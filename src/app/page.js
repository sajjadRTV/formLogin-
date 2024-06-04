
'use client'

import { useRef, useState } from "react";

export default function Home() {

  const [stateInput , setStateInput] = useState({});
  const [showErrorEmpty , setShowErrorEmpty] = useState([]);

  //!
  //? inputs Refs
  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const txtAreaRef = useRef();
  const checkboxRef = useRef();

  //!
  //? spans error Refs
  const spanfnameRef = useRef();
  const spanlnameRef = useRef();
  const spanEmailRef = useRef();
  const spaneRadioRef = useRef();
  const spanTxtAreaRef = useRef();
  const spanCheckBoxRef = useRef();

  const giveDataInp = (e) => {

    e.target.id === 'fname' && e.target.value.trim() !== '' ? spanfnameRef.current.classList.add('hidden') : null;
    e.target.id === 'lname' && e.target.value.trim() !== '' ? spanlnameRef.current.classList.add('hidden') : null;
    e.target.id === 'email' && e.target.value.trim() !== '' ? spanEmailRef.current.classList.add('hidden') : null;
    e.target.id === 'message' && e.target.value.trim() !== '' ? spanTxtAreaRef.current.classList.add('hidden') : null;
    setStateInput({ ...stateInput , [e.target.id]: e.target.value});
  }

  const checkedRadio = (e) => {
    if(e.target.id === 'general') {
      if(stateInput.support) {
        delete stateInput.support
      }
      spaneRadioRef.current.classList.add('hidden');
      setStateInput({...stateInput , [e.target.id] : e.target.value});
    }else if(e.target.id === 'support'){
      if(stateInput.general){
        delete stateInput.general;
      }
      spaneRadioRef.current.classList.add('hidden');
      setStateInput({...stateInput , [e.target.id] : e.target.value});
    }
  }


  //! request API (POST) (***)
 
  const sendData = (e) => {
    e.preventDefault();

    fnameRef.current.getAttribute('id') === 'fname' && fnameRef.current.value.trim() === '' ? spanfnameRef.current.classList.replace('hidden' , 'inline-block') : spanfnameRef.current.classList.add('hidden')
    lnameRef.current.getAttribute('id') === 'lname' && lnameRef.current.value.trim() === '' ? spanlnameRef.current.classList.replace('hidden' , 'inline-block') : spanlnameRef.current.classList.add('hidden')
    emailRef.current.getAttribute('id') === 'email' && emailRef.current.value.trim() === '' ? spanEmailRef.current.classList.replace('hidden' , 'inline-block') : spanEmailRef.current.classList.add('hidden');
    txtAreaRef.current.getAttribute('id') === 'message' && txtAreaRef.current.value.trim() === '' ? spanTxtAreaRef.current.classList.replace('hidden' , 'inline-block') : spanTxtAreaRef.current.classList.add('hidden');

    //!radio & checkbox
    !stateInput.support && !stateInput.general ? spaneRadioRef.current.classList.replace('hidden' , 'inline-block') :  spaneRadioRef.current.classList.add('hidden');
    !stateInput.tickConsent ? spanCheckBoxRef.current.classList.replace('hidden' , 'inline-block') : spanCheckBoxRef.current.classList.add('hidden');

    // fetch('https://exmaple.com' ,{
    //   method : 'POST' , 
    //   headers : {"Cotent-Type" : "application/json"},
    //   body : JSON.stringify(stateInput)
    // }).then(res => {
    //   if(!res.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    //   return res.json();
    // }).catch(err => console.log(err));

  }
  
  return (
    <>
      <div className={`w-[900px] rounded-2xl bg-white p-5`}>
        <h1 className="font-bold text-[30px] text-[#0c3126e0] max-lg:text-[20px]">Contact us</h1>
        <form action="" className="mt-6" autoComplete="off">
          <div className="flex items-baseline justify-between gap-6 max-lg:flex-col max-xl:justify-start">
            <label htmlFor="fname" className="block w-1/2 text-[18px] max-lg:w-full">
              First Name <span className="text-[#112922e0]">*</span>
              <div>
                <input
                  type="text"
                  id="fname"
                  className="outline-none border-[2px] border-[#125c33b7] w-full 
                  p-[10px] rounded-lg mt-3"
                  onChange={giveDataInp}
                  ref={fnameRef}
                />
                <span ref={spanfnameRef} className={`text-red-600 py-[5px] hidden`}>The field is require</span>
              </div>
            </label>
            <label htmlFor="lname" className="block w-1/2 text-[18px] max-lg:w-full">
              Last Name <span className="text-[#112922e0]">*</span>
              <div>
                <input
                  type="text"
                  id="lname"
                  className="outline-none border-[2px] border-[#125c33b7] w-full 
                  p-[10px] rounded-lg mt-3"
                  onChange={giveDataInp}
                  ref={lnameRef}
                />
                <span ref={spanlnameRef} className={`text-red-600 py-[5px] hidden`}>The field is require</span>
              </div>
            </label>
          </div>
          <div className="pt-6">
            <label htmlFor="email" className="block w-full text-[18px] max-lg:w-full">
              Email Address <span className="text-[#112922e0]">*</span>
              <div>
                <input
                  type="email"
                  id="email"
                  className="outline-none border-[2px] border-[#125c33b7] w-full
                p-[10px] rounded-lg mt-3"
                onChange={giveDataInp}
                ref={emailRef}
                />
              </div>
              <span ref={spanEmailRef} className={`text-red-600 py-[5px] hidden`}>The field is require</span>
            </label>
          </div>
          <div className="pt-6">
            <label htmlFor="" className="block w-full text-[18px]">Query Type <span>*</span></label>
            <div className="flex items-baseline gap-6 mt-3 max-lg:flex-col max-lg:items-start">
              <div className="p-[10px] border-[2px] border-[#125c33b7] w-1/2 rounded-lg has-[:checked]:bg-[#123629] has-[:checked]:text-white max-lg:w-full">
                <label htmlFor="general" className="block w-full text-[18px] ml-3">
                  <input type="radio" name="queryType" id="general" className="mr-3 w-5 h-5 align-middle" onChange={checkedRadio}/>
                  General Enquiry
                </label>
              </div>
              <div className="p-[10px] border-[2px] border-[#125c33b7] w-1/2 rounded-lg has-[:checked]:bg-[#123629] has-[:checked]:text-white max-lg:w-full">
                <label htmlFor="support" className="block w-full text-[18px] ml-3">
                  <input type="radio" name="queryType" id="support" className="mr-3 w-5 h-5 align-middle" onChange={checkedRadio}/>
                  Support Request
                </label>
              </div>
            </div>
            <span ref={spaneRadioRef} className={`text-red-600 py-[5px] hidden`}>Please select a query type</span>
          </div>
          <div className="py-6">
            <label htmlFor="message" className="block w-full text-[18px]">
              Message <span className="text-[#112922e0]">*</span>
              <textarea 
                name="message" 
                id="message" 
                className="w-full pl-2 mt-3 border-[2px] border-[#125c33b7] rounded-lg max-h-[150px] min-h-[150px] outline-none max-lg:w-full"
                spellCheck ="false"
                onChange={giveDataInp}
                ref={txtAreaRef}
                >
 
              </textarea>
            </label>
            <span ref={spanTxtAreaRef} className={`text-red-600 py-[5px] hidden`}>The field is require</span>
          </div>
          <div>
            <label htmlFor="tickConsent" className="align-middle text-[19px] w-full block">
              <input type="checkbox" className="w-5 h-5 mr-3 align-middle" id="tickConsent"  
                onChange={(e) => {
                  if(e.target.checked == true) {
                    e.target.id === 'tickConsent' && e.target.value.trim() !== '' ? spanCheckBoxRef.current.classList.add('hidden') : null;
                    setStateInput({...stateInput , [e.target.id]:e.target.value})
                  }else{
                    delete stateInput.tickConsent;
                    e.target.id === 'tickConsent' && e.target.value.trim() !== '' ? spanCheckBoxRef.current.classList.add('hidden') : null;
                    setStateInput({...stateInput});
                  }
                }}
                ref={checkboxRef}
              />
              I consent to being contacted by the team <span className="text-[#112922e0]">*</span>
            </label>
            <span ref={spanCheckBoxRef} className={`text-red-600 py-[5px] hidden`}>
              To submit this form, pleas consent to begin contacted
            </span>
          </div>
          <div className="w-full text-center mt-10">
            <button onClick={sendData}  className="w-full bg-[#123629] p-4 text-white font-bold rounded-lg">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}