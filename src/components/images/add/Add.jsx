import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db, storage } from "../../../db/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Modal from "../components/modal/Modal";
import "./Add.css"

export default function Add() {
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    createdAt: Timestamp.fromDate(new Date()),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!formData.title || !formData.category || !formData.image) {
      alert("Please fill all the fields");
      return;
    }
    const storageRef = ref(storage, `/images/${formData.image.name}`);
    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "images");
          addDoc(articleRef, {
            title: formData.title,
            category: formData.category,
            imageUrl: url,
            show: true,
            click: false,
            createdAt: Timestamp.fromDate(new Date()),
          });
        });
      },
      () => {
        setFormData({
          title: "",
          category: "",
          image: "",
        });
      }
    );
  };

  return (
    <>
      <div className="load">
        <div className="button" >
          <button
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Photo
          </button>
        </div>

        {modalOpen && (
          <Modal
            formData={formData}
            setOpenModal={setModalOpen}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handlePublish={handlePublish}
          />
        )}
      </div>
    </>
  );
}
