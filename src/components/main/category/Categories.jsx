import React from "react";
import useMediaQuery from "../../hook/useMediaQuery.ts";
import "./Categories.css";

const Categories = ({
  categories,
  selectCategory,
  selectCat,
  handleCategoryChange,
}) => {
  const lg = useMediaQuery("(min-width: 1040px)");
  return (
    <div>
      {lg ? (
        <div className="categories">
          {categories.map((name, i) => (
            <h3
              key={i}
              onClick={() => selectCategory(name)}
              className={selectCat === name ? "active" : ""}
            >
              {name}
            </h3>
          ))}
        </div>
      ) : (
        <div className="select__category">
          <select onChange={handleCategoryChange}>
            {categories.map((name, i) => (
              <option
                key={i}
                value={name}
                className={selectCat === name ? "active" : ""}
              >
                {name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Categories;
