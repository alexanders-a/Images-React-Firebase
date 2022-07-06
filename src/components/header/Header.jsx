import React from "react";
import Logo from "../../assets/Logo.svg";
import "./Header.css";
import useMediaQuery from "../hook/useMediaQuery.ts";

const Header = () => {
  const lg = useMediaQuery("(min-width: 1040px)");
  const sm = useMediaQuery("(min-width: 610px)");

  const Heading = ({ text }) => {
    return <h1 style={{ fontSize: "40px", color: "white" }}>{text}</h1>;
  };

  return (
    <>
      <div className="paper">
        <div className="header">
          <div className="header__left">
            <div className="logo">
              <img alt="logo" src={Logo} />
            </div>
            <div className="header-text">
              <h3>Agency</h3>
            </div>
          </div>
          {lg && (
            <div className="header__center">
              <h2>About</h2>
              <h2>Services</h2>
              <h2>Pricing</h2>
              <h2>Blog</h2>
            </div>
          )}
          {sm && (
            <div className="header__right">
              <button>Contact</button>
            </div>
          )}
        </div>
        <div className="box">
          <div>
            <Heading text={"Portfolio"}></Heading>
          </div>
          <div className="box__direction">
            <h3>
              Agency provides a full service range including technical skills,
              design, business understanding.
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
