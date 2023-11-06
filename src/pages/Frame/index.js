import React, { useEffect, useRef, useState } from "react";
import "./Frame.scss";
import axios from "axios";
const Frame = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  // const [data , setData] = useState('./child.jpg');
  const input_name = useRef(null);
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

  const onSelectFileFrame = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0] || e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", input_name.current.value);
    formData.append("userId", "Hou");
    formData.append("description", "30 năm thành lập HOU");
    formData.append("createdAt", new Date().toLocaleDateString());
    formData.append("updatedAt", new Date().toLocaleDateString());

    const url = `https://be-avata-hou-production.up.railway.app/api/v1/frame/upload`;
    try {
      axios
        .post(url, formData)
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container__avata container__frame">
      <div className="img-frame">
        <img src={preview}/>
      </div>
      <div className="container__input">
        <label>Tên khung</label>
        <input
          type="text"
          name="photo"
          className="name-frame"
          onChange={(e) => e.currentTarget.value.trim}
          ref={input_name}
        />

        <label>Chọn farme</label>
        <input
          type="file"
          placeholder="Chọn farme"
          name="image"
          id="upload-farme"
          accept="image/*"
          onChange={onSelectFileFrame}
          multiple
        />
        <button type="submit" className="btn-success" onClick={handleSubmit}>
          Lưu
        </button> 
      </div>
    </div>
  );
};

export default Frame;
