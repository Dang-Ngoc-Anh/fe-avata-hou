import React, { useState, useEffect, useRef, createRef } from "react";
import "./CreateAvata.scss";
import Cropper from "react-cropper";
import "../FixSizeImg/FixSizeImg.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../node_modules/cropperjs/dist/cropper.css";
import { logDOM } from "@testing-library/react";
// import "../../node_modules/cropperjs/dist/cropper.css";

const CreateAvata = () => {
  const [selectedFile, setSelectedFile] = useState(); // chọn file avata local
  // const [selectedFileFrame, setSelectedFrame] = useState(); // chọn frame local
  const [data, setData] = useState("./child.jpg"); // default value data crop
  const [frame, setFrame] = useState(); // data frame khi có frame thay đổi
  const [preview, setPreview] = useState(); // data avata khi get local , fomat blog
  // const [frameLocal, setFrameLocal] = useState(); // data frame khi get locaj
  let { id } = useParams(); // id frame to data base

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // useEffect(() => {
  //   if (!selectedFileFrame) {
  //     setFrameLocal(undefined);
  //     return;
  //   }
  //   const objectUrls = URL.createObjectURL(selectedFileFrame);
  //   setFrameLocal(objectUrls);
  //   // free memory when ever this component is unmounted
  //   return () => URL.revokeObjectURL(objectUrls);
  // }, [selectedFileFrame]);

  const drowImg = (canvas, srcFrame, srcAvta) => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const imgs = [srcAvta, srcFrame];
    const imgObjs = [];
    let count = imgs.length;
    imgs.forEach((img) => {
      let imgObj = new Image();
      imgObj.src = img;
      imgObjs.push(imgObj);
      imgObj.onload = () => {
        count--;
        if (!count) {
          imgObjs.forEach((item, index) => {
            if (index === 0) {
              let wrh = item.width / item.height;
              let newWidth = canvas.width;
              let newHeight = newWidth / wrh;
              if (newHeight > canvas.height) {
                newHeight = canvas.height;
                newWidth = newHeight * wrh;
              }
              let xOffset =
                newWidth < canvas.width ? (canvas.width - newWidth) / 2 : 0;
              let yOffset =
                newHeight < canvas.height ? (canvas.height - newHeight) / 2 : 0;

              ctx.drawImage(item, xOffset, yOffset, newWidth, newHeight);
              setData(canvas.toDataURL("image/png"));
            } else {
              ctx.drawImage(item, 0, 0, canvas.width, canvas.height);
              setData(canvas.toDataURL("image/png"));
            }
          });
        }
      };
    });
  };
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    drowImg(canvas, frame, preview);
  }, [frame, preview]);

  const onSelectFileFinal = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  // const onSelectFileFrame = (e) => {
  //   if (!e.target.files || e.target.files.length === 0) {
  //     setSelectedFrame(undefined);
  //     return;
  //   }
  //   // I've kept this example simple by using the first image instead of multiple
  //   setSelectedFrame(e.target.files[0]);
  // };
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
  // gửi data canvas lên url

  useEffect(() => {
    const url = `https://be-avata-hou-production.up.railway.app/api/v1/frame/upload/${id}`;
    if (id)
      axios.get(url).then((res) => {
        setFrame(`${res.data.data}`);
      });
  }, [id]);

  // const handleChooseFrame = () => {
  //   id = undefined;
  //   setFrame(frameLocal);
  // };
  return (
    <div className="container__avata">
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
          zoomable={false}
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
      <div className="img__box" hidden>
        <canvas id="canvas" ref={canvasRef} width={500} height={500}></canvas>
      </div>
      <div className="container__input">
        <label>Chọn avata</label>
        <input
          type="file"
          name="photo"
          id="upload-photo"
          accept="image/*"
          onChange={onSelectFileFinal}
        />

        {/* <label>Chọn farme</label>
        <input
          type="file"
          placeholder="Chọn farme"
          name="farme"
          id="upload-farme"
          accept="image/*"
          onChange={onSelectFileFrame}
          onClick={handleChooseFrame}
        /> */}
        <button className="btn-success" onClick={saveCrop}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateAvata;
