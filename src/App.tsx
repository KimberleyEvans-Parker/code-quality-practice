import React, { useState } from 'react';
import './App.css';
import password_strength from './password_strength.png'

function App() {
  const [password, setPassword] = useState("")
  const [validationText, setValidationText] = useState("Password required")
  const [show, setShow] = useState(false)

  const setAndValidatePassword = (text: string) => {
    var passwordInvalid = false

    if (text === "correcthorsebatterystaple" || text === "CorrectHorseBatteryStaple") {
      passwordInvalid = true
    }

    if (text.includes("Password") || text.includes("password")) {
      passwordInvalid = true
    }

    // ` and ~ are invalid
    for (let i=0; i < text.length; i++) {
      if (text[i] === "~" || text === "`") {
        passwordInvalid = true
      }
    }

    // minimum length is 8
    if (text.length < 8) {
      passwordInvalid = true
    }
  
    // can't have more than 20 chars
    if (text.length > 20) {
      passwordInvalid = true
    }
    
    // check if password contain atleast a number, lowercase, and uppercase
    if (
      (!/[0-9]/.test(text)) ||
      (!/[a-z]/.test(text)) ||
      (!/[A-Z]/.test(text))
    ) {
      passwordInvalid = true
    }

    // if password is invalid, we don't alllow it
    if (passwordInvalid == true) {

      if (text === "correcthorsebatterystaple" || text === "CorrectHorseBatteryStaple") {
        setValidationText("Password can't be CorrectHorseBatteryStaple")
        return
      }
  
      if (text.includes("Password") || text.includes("password")) {
        setValidationText("Password can't contain password")
        return
      }

      if (text === "Password" || text === "password") {
        setValidationText("Password can't be password")
        return
      }

      for (let i=0; i < text.length; i++) {
        if (text[i] === "~" || text === "`") {
          setValidationText("Password cannot contain ~ or `")
          return
        }
      }
  
      if (text.length < 8) {
        setValidationText("Password must be at least 8 characters long")
        return
      }
  
      if (text.length > 20) {
        setValidationText("Password can't be more than 20 characters long")
        return
      }
    
      // check if password contain atleast a number, lowercase, and uppercase
      if (
        !/[0-9]/.test(text) ||
        !/[a-z]/.test(text) ||
        !/[A-Z]/.test(text)
      ) {
        setValidationText("Password must contain a lowercase, upercase and number character")
        return
      }
      
      return
    }

    // if password is valid, set it to password
    setPassword(text)
    // and set validation text to be empty
    setValidationText("")
  }
  
  return (
    <div className="App" style={{backgroundColor: "#92b4e4", color: "#000000", height: "100vh",padding:"40px", justifyContent: "center", alignItems: "center"}}>
        <p>Password validator</p>
        <p>Enter your password</p>
        <input onChange={(e) => setAndValidatePassword(e.target.value)} />
        <p className='red'>{validationText}</p>
        {password !== "" ? <p>Your password {password} is valid! Yay!</p> : <p>Your password {password} is not valid :(</p>}
        <button onClick={() => setShow(show ? false : true)} className="description">
          <div className={`carat ` + `${show && "turn"}`}>{'>'}</div>
          Description
        </button>
        {
          show ?
          (
            <>
              <p>To make sure you have a good password, you should have</p>
              <ul>
                <li>Uppercase</li>
                <li>Lowercase</li>
                <li>Numbers</li>
                <li>` and ~ are illegal</li>
                <li>Not contain password</li>
                <li>No more than 20 characters</li>
                <li>At least 8 characters</li>
              </ul>
              <img src={password_strength} />
            </>
          )
          : 
          (<></>)
        }
    </div>
  );
}

export default App;
