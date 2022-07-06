import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { db } from "../../../db/firebase";
import Image from "../components/Image/Image";
import "./Gallery.css";

export default function Gallery({ selectCat, selectCategory }) {
  const [select, setSelect] = useState(false);
  const [images, setImages] = useState([]);
  const [reset, setReset] = useState(true);
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        const imageRef = collection(db, "images/");
        const q = query(imageRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
          const images = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setImages(images);
        });
      }, 100);
    };
    fetchData();
  }, []);

  function getFilteredList() {
    if (selectCat === "Show all") {
      return images;
    }
    return images.filter((item) => item.category === selectCat);
  }
  const filteredList = useMemo(getFilteredList, [images, selectCat]);

  const showMore = () => {
    setLimit((e) => e + 9);
  };

  return (
    <>
      <div className="gallery">
        <div className="grid__image">
          {images.length === 0 ? (
            <h2>Ничего нет!</h2>
          ) : (
            filteredList
              .slice(0, limit)
              .map(({ id, title, imageUrl, category, click, show }) => (
                <div key={id}>
                  {show === reset && (
                    <div className="img">
                      <Image
                        show={show}
                        setReset={setReset}
                        id={id}
                        db={db}
                        setSelect={setSelect}
                        select={select}
                        click={click}
                        title={title}
                        imageUrl={imageUrl}
                        reset={reset}
                      />
                      <div className="img__text">
                        <button onClick={() => selectCategory(category)}>
                          {category}
                        </button>
                        <h1>{title}</h1>
                      </div>
                    </div>
                  )}
                </div>
              ))
          )}
        </div>
      </div>
      {limit ? (
        <div className="load">
          <button onClick={() => showMore()}>load more</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
