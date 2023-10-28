import React, { createRef, useState } from "react";
import Cropper from "react-cropper";
import "./FixSizeImg.scss";
// import "../../node_modules/cropperjs/dist/cropper.css";
import "../../../node_modules/cropperjs/dist/cropper.css";

const FixSizeImg = () => {
  const [data, setData] = useState(localStorage.getItem("state"));
  const [cropData, setCropData] = useState();
  const cropperRef = createRef();
  const onCrop = () => {
    setCropData(
      cropperRef.current?.cropper.getCroppedCanvas().toDataURL("image/png")
    );
  };
  const saveCrop = () => {
    const a = document.createElement("a");
    a.href = cropData;
    a.download = "dowload.png";
    a.click();
  };
  return (
    <div className="wrapper">
      <div className="img-container">
        <Cropper
          ref={cropperRef}
          src={data}
          style={{ height: "100%", width: "100%", maxWidth: "100%" }}
          aspectRatio={1}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
          crop={onCrop}
          className="cropper"
        />
        <div className="box" style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{
              width: "100%",
              float: "left",
              height: "35rem",
              border: "1px solid var(--primary-color)",
            }}
          />
        </div>
      </div>
      <button onClick={saveCrop} className="btn-save">
        Save
      </button>
    </div>
  );
};

export default FixSizeImg;
