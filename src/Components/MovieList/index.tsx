import React from "react";
import { Detail } from "../../Types/Type";
import { useNavigate } from "react-router-dom";
import { IMAGE_SIZE_500, IMAGE_URL } from "../../Hooks/Urls";
import NoPosterImg from "../../Images/no-poster-image/no-poster.jpg";
import "./MovieList.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface Props {
  data: Detail[];
  baslik: string;
}

const MovieList: React.FC<Props> = ({ data, baslik }) => {
  const navigate = useNavigate();

  const clickedCard = (e: Detail) => {
    navigate(`/moviedetail/${e.id}`);
  };

  return (
    <div>
      <div className="movies-section">
        <div className="top-section-favourites">
          <div>
            <ArrowLeftOutlined
              data-tooltip-id="back-tooltip2"
              data-tooltip-content="Önceki Sayfaya Dön"
              onClick={() => {
                navigate(-1);
              }}
              style={{
                color: "white",
                fontSize: "40px",
                cursor: "pointer",
                paddingRight: "50px",
              }}
            />
            <Tooltip id="back-tooltip2" style={{ zIndex: "99" }} />
          </div>
          <h1 style={{ color: "white" }}>{baslik}</h1>
        </div>
        {data.length !== 0 ? (
          <div className="cards-section">
            {data &&
              data.map((e) => {
                return (
                  <div
                    key={e.id}
                    className="card"
                    onClick={() => clickedCard(e)}
                  >
                    <img
                      className="poster-img"
                      src={
                        e.poster_path
                          ? IMAGE_URL + IMAGE_SIZE_500 + e.poster_path
                          : NoPosterImg
                      }
                      alt="poster-img"
                    />
                    <h3 className="movie-title">{e.original_title}</h3>
                  </div>
                );
              })}
          </div>
        ) : (
          <p style={{ color: "white" }}>
            Herhangi bir favori filminiz bulunmamaktadır!
          </p>
        )}
      </div>
    </div>
  );
};
export default MovieList;
