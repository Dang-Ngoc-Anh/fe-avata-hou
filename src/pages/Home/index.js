import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Box } from "../../components/Box";
// import { data } from "../../data_temp";
import CreateAvata from "../CreateAvata";
import axios from "axios";
// import CustemInput from "../../components/Custeminput";
// import { Data } from './../../../node_modules/cropperjs/types/index.d';
const Home = () => {
  const [frame, setFrame] = useState([]);
  const [loading, setLoading] = useState(false);
  const url =
    "https://be-avata-hou-production.up.railway.app/api/v1/frame/upload";
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setLoading(true);
        setFrame(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  // console.log(frame[0].image);
  // console.log(img);
  // const img = frame[0].image;
  // console.log(img);
  return (
    <section className="section">
      {/* <CustemInput
        type="text"
        className="search__input"
        placeholder="Tìm kiếm khung"
      /> */}
      {/* Trang chu , generate avata , contact  */}
      <div className="container_frame">
        {!loading ? (
          <h1>Loading</h1>
        ) : (
          frame.map((user) => <Box props={user} />)
        )}
      </div>
      <CreateAvata className="avt"/>
    </section>

  );
};

export default Home;
