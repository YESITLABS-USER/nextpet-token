"use client";
import React, { useEffect, useState } from "react";

const EditCarousel = ({ previousPostImage = [], onEditImage, onDeleteImage, editPostPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newImages, setNewImages] = useState([]); // Store selected images temporarily

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (previousPostImage.length + newImages.length));
  };

  // Auto play the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [previousPostImage, newImages]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imagePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setNewImages((prev) => [...prev, ...imagePreviews]);
  };

  const handleUpload = () => {
    const fileInput = document.getElementById("fileInput");
    const selectedFiles = Array.from(fileInput.files);
    onEditImage(selectedFiles); // Trigger API call or parent callback
    setNewImages([]); // Clear previews after upload
    fileInput.value = ""; // Reset file input
  };

  // Inline styles
  const carouselStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "345px",
    maxHeight: "250px",
    margin: "0 auto",
    overflow: "hidden",
  };

  const imageContainerStyle = {
    display: "flex",
    transition: "transform 0.5s ease-in-out",
    transform: `translateX(-${currentIndex * 100}%)`,
  };

  const imageWrapperStyle = {
    position: "relative",
    minWidth: "100%",
    maxHeight: "250px",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  };

  const editIconStyle = {
    position: "absolute",
    top: "10px",
    right: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "50%",
    padding: "5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    zIndex: 10,
  };

  const deleteIconStyle = {
    position: "absolute",
    top: "10px",
    left: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "50%",
    padding: "5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    zIndex: 10,
  };

  const indicatorsStyle = {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
  };

  const dotStyle = (isActive) => ({
    cursor: "pointer",
    margin: "0 5px",
    width: "12px",
    height: "12px",
    backgroundColor: isActive ? "#333" : "lightgray",
    borderRadius: "50%",
    transition: "background-color 0.3s ease",
  });

  return (
    <div style={carouselStyle}>
      {(previousPostImage.length > 0 || newImages.length > 0) ? (
        <>
          <div style={imageContainerStyle}>
            {previousPostImage.concat(newImages).map((image, index) => (
              <div key={index} style={imageWrapperStyle}>
                <img src={image} alt={`Image ${index + 1}`} style={imageStyle} />
                {index >= previousPostImage.length && editPostPage && (
                  <div
                    style={deleteIconStyle}
                    onClick={() => setNewImages((prev) => prev.filter((_, i) => i !== (index - previousPostImage.length)))}
                  >
                    ❌
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={indicatorsStyle}>
            {previousPostImage.concat(newImages).map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={dotStyle(index === currentIndex)}
              ></span>
            ))}
          </div>
        </>
      ) : (
        editPostPage && (
          <div>
            <p>Add New Image</p>
          </div>
        )
      )}
      {editPostPage && (
        <>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            multiple
            onChange={handleFileChange}
          />
          <button
            onClick={() => document.getElementById("fileInput").click()}
            style={{ padding: "10px", margin: "10px 0" }}
          >
            Select Images
          </button>
          {newImages.length > 0 && (
            <button
              onClick={handleUpload}
              style={{ padding: "10px", backgroundColor: "green", color: "white" }}
            >
              Upload Images
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EditCarousel;
