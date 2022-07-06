import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import useKeyPress from "../hook/useKey";
import useMediaQuery from "../../../hook/useMediaQuery.ts";
import "./Image.css";

const Image = ({ id, db, imageUrl, setReset, title, click, reset }) => {
  const clickRef = doc(db, "images", id);
  const lg = useMediaQuery("(min-width: 1040px)");

  const handleClike = () => {
    if (click === true) {
      updateDoc(clickRef, {
        click: false,
      })
        .then(() => {
          console.log("unselect");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(clickRef, {
        click: true,
      })
        .then(() => {
          console.log("select");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const DelPressed = useKeyPress("Delete");

  if (DelPressed === true) {
    if (click === true) {
      // if you want to delete a document
      // deleteDoc(clickRef, {
      //   show: false,
      //   click: false,
      // })
      updateDoc(clickRef, {
        show: false,
        click: false,
      })
        .then(() => {
          console.log("deleted");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  const RPressed = useKeyPress("r");

  if (RPressed === true) {
    setTimeout(() => {
      setReset(false);
    }, 100);
  }

  if (reset === false) {
    setTimeout(() => {
      updateDoc(clickRef, {
        show: true,
      });
    }, 100);

    setTimeout(() => {
      setReset(true);
    }, 100);
  }

  return (
    <>
      {lg ? (
        <img
          onClick={handleClike}
          className={click === true ? "select" : ""}
          alt={title}
          height={"300px"}
          src={imageUrl}
        />
      ) : (
        <img alt={title} height={"300px"} src={imageUrl} />
      )}
    </>
  );
};

export default Image;
