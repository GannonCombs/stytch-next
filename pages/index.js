import React, { useEffect, useState } from 'react';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [methodId, setMethodId] = useState("");
  const [email, setEmail] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("Sending OTP...");

    try {
      const response = await fetch("/api/createOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("OTP sent! Check your phone.");
        setMethodId(data.phone_id);
      } else {
        throw new Error("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to send OTP.");
    }
  };

  const handleAuthenticateOtp = async (e) => {
    e.preventDefault();
    setMessage("Authenticating...");

    try {
      const response = await fetch("/api/authenticateOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ methodId, code: otp }),
      });

      if (response.ok) {
        setMessage("Authentication successful!");
      } else {
        throw new Error("Authentication failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Authentication failed.");
    }
  };

  // const handleMagicLink = async (e) => {
  //   e.preventDefault();
  //   setMessage("Sending magic link...");

  //   try {
  //     const response = await fetch("/api/createMagicLink", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     });

  //     if (response.ok) {
  //       setMessage("Magic link sent! Check your email.");
  //     }
  //     else {
  //       throw new Error("Shoot! Failed to send magic link.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setMessage("Failed to send magic link.");
  //   }
  // };

  return (
    <div>
      <h1>Stytch Magic Link Demo</h1>
      {/* <form onSubmit={handleMagicLink}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send magic link</button>
      </form>
      {message && <p>{message}</p>} */}
      {/* Create input box with immutable text ".com" at the end */}
      <input
        type="email"
        value={email}
        placeholder="Enter your email"></input>
      <input></input>

      <form onSubmit={handleSendOtp}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          required
        />
        <button type="submit">Send OTP</button>
      </form>

      {methodId && (
        <form onSubmit={handleAuthenticateOtp}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter your OTP"
            required
          />
          <button type="submit">Authenticate OTP</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}