import React from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import useKeyPress from "../hook/useKey";
import "./Modal.css";

function Modal({
  setOpenModal,
  formData,
  handleChange,
  handleImageChange,
  handlePublish,
}) {
  const Press = useKeyPress("Escape");

  if (Press === true) {
    setOpenModal(false);
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Add image</h1>
        </div>
        <div className="body">
          <div>
            <div className="form-group">
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={(e) => handleChange(e)}
                placeholder="Title"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={(e) => handleChange(e)}
                placeholder="Category"
              />
            </div>

            <div className="select-photo">
              {/* image */}
              <label style={{ fontSize: "60px" }} htmlFor="img">
                <MdOutlineAddPhotoAlternate />
                <input
                  id="img"
                  mt={-14}
                  style={{ display: "none" }}
                  type="file"
                  name="image"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => handleImageChange(e)}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handlePublish}>Publish</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
