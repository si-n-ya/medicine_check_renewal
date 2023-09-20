import React from 'react';
import { Link } from "react-router-dom";

const MedicineHeader = () => {
  console.log('medicine header render');
  return (
    <>
      <header className="header">
          <div className="header_container header_flex">
              <div className="header_inner container">
                  <p>
                      <a href="/" className="top_title">服用チェック</a>
                  </p>
                  <button className="btn_hamburger">
                      <span className="hamburger_logo"></span>
                  </button>
              </div>
              <nav className="global_nav">
                  <ul>
                      <li className="nav_list">
                          <Link to="/medicine" className="nav_link">お薬</Link>
                      </li>
                      <li className="nav_list">
                          <Link to="/calender" className="nav_link">カレンダー</Link>
                      </li>
                  </ul>
              </nav>
          </div>
      </header>
    </>
  )
}

export default MedicineHeader