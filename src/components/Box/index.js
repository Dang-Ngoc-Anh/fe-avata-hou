import "./Box.scss";
import { useNavigate } from "react-router-dom";
export const Box = ({ props }) => {
  const { id, name, createdAt, image } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/home/generate-avata/${id}`);
  };
  const date = new Date(createdAt);
  const datePost = date.toLocaleDateString('en-GB')
  return (
    <div className="item">
      <div className="img__box" onClick={handleClick}>
        <img src={`https://be-avata-hou-production.up.railway.app/${image}`} alt=""></img>
      </div>
      <div className="user__infor">
        <p>Khung : {name}</p>
        <p>Ngày đăng : {datePost}</p>
      </div>
    </div>
  );
};
