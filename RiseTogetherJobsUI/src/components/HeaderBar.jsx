import React, { useState, useEffect } from "react";

import Logo from "../assets/rtn-logo.png";
import "./Util.css";
import MenuBar from "./MenuBar";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function HeaderBar() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [greeting, setGreeting] = useState("Namasthe!");

  const greetings = [
    "Namasthe! - नमस्ते",
    "Vanakkam! - வணக்கம்",
    "Namaskaram! - నమస్కారం",
    "Nomoshkar! - নমস্কার",
    "Pranam! - प्रणाम",
    "As-salamu alaykum! - السلام علیکم",
    "Sat Sri Akal! - ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
    "Adaab! - आदाब",
    "Jai Jinendra! - जय जिनेन्द्र",
    "Swagatam! - स्वागतं",
    "Konnichiwa! - こんにちは",
    "Hola! - ¡Hola!",
    "Bonjour! - Bonjour!",
    "Ciao! - Ciao!",
  ];
  useEffect(() => {
    const greetingInterval = setInterval(() => {
      setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
    }, 1000); // Change greeting every second

    return () => clearInterval(greetingInterval);
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      setCurrentDateTime(`${formattedTime} ${formattedDate}`);
    };

    updateDateTime(); // Set initially
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div className="app-bar-container">
        <div className="appbar-logo">
          <img src={Logo} alt="" />
        </div>
        <div className="appbar-content">
          <div className="social-icons">
            <ul className="icons">
              <li
                onClick={() =>
                  window.open("https://www.facebook.com", "_blank")
                }
              >
                <FacebookIcon fontSize="small" />
              </li>
              <li
                onClick={() =>
                  window.open("https://www.instgram.com", "_blank")
                }
              >
                <InstagramIcon fontSize="small" />
              </li>{" "}
              <li
                onClick={() =>
                  window.open("https://www.instgram.com", "_blank")
                }
              >
                <XIcon fontSize="small" />
              </li>{" "}
              <li
                onClick={() =>
                  window.open("https://www.instgram.com", "_blank")
                }
              >
                <LinkedInIcon fontSize="small" />
              </li>{" "}
              <li
                onClick={() =>
                  window.open("https://www.instgram.com", "_blank")
                }
              >
                <EmailIcon fontSize="small" />
              </li>
            </ul>
          </div>
          <div className="message" style={{ fontWeight: "bold" }}>
            {greeting}
          </div>
          <div>
            <p
              style={{ fontSize: "14px", fontWeight: "bold" }}
              className="time-date"
            >
              {currentDateTime.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <MenuBar />
    </div>
  );
}

export default HeaderBar;
