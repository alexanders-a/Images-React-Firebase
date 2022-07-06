import React, { useState } from "react";
import Add from "../images/add/Add";
import Gallery from "../images/Gallery/Gallery";
import Categories from "./category/Categories";
const Main = () => {
  const [selectCat, setSelect] = useState("Show all");
  const categories = [
    "Show all",
    "Desing",
    "Branding",
    "Illustration",
    "Motion",
  ];
  const selectCategory = (e) => {
    setSelect(e);
  };
  function handleCategoryChange(event) {
    setSelect(event.target.value);
  }

  return (
    <>
      <Add />
      <Categories
        selectCategory={selectCategory}
        selectCat={selectCat}
        categories={categories}
        setSelect={setSelect}
        handleCategoryChange={handleCategoryChange}
      />
      <Gallery
        selectCat={selectCat}
        selectCategory={selectCategory}
        categories={categories}
      />
    </>
  );
};

export default Main;
