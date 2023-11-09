import React, { useEffect, useMemo, useState } from "react";
import "./Home.scss";
import { Box } from "../../components/Box";
// import { data } from "../../data_temp";
import CreateAvata from "../CreateAvata";
import axios from "axios";
import { useMatch } from "react-router-dom";
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
        setFrame(res.data.data);
        setLoading(true);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    if(loading)
      localStorage.setItem("frameDefault",frame[2].id);
  },[])
  return (
    <section className="section">
      <div className="container_frame">
        {!loading ? (
          <h1>Loading</h1>
        ) : (
          frame.map((user) => <Box props={user} />)
        )}
      </div>
      <CreateAvata className="avt" />
    </section>

  );
};

export default Home;
