import TextArea from "antd/es/input/TextArea";
import React from "react";
import "./Comment.scss";
import { Button } from "antd";

const Comment: React.FC = () => {
  return (
    <div className="comments-section">
        <div className="text-area-section">
            <TextArea className="text-area" placeholder="Bir yorum yazınız..." />
            <Button size="large">Gönder</Button>
        </div>
        <div className="comments-area">
          <div className="comment">
            <h5 style={{ color: "white" }}>Baturalp Yılmaz</h5>
            <i style={{ color: "white" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              maiores eligendi esse ipsum a odit, nihil quo odio pariatur
              voluptate, ex modi numquam saepe porro ducimus corporis cum
              laudantium eaque.
            </i>
          </div>
          <hr/>

          <div className="comment">
            <h5 style={{ color: "white" }}>Batuhan Pehlivanoğlu</h5>
            <i style={{ color: "white" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              maiores eligendi esse ipsum a odit, nihil quo odio pariatur
              voluptate, ex modi numquam saepe porro ducimus corporis cum
              laudantium eaque.
            </i>
          </div>
          <hr/>
          <div className="comment">
            <h5 style={{ color: "white" }}>Safa Gençtorun</h5>
            <i style={{ color: "white" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              maiores eligendi esse ipsum a odit, nihil quo odio pariatur
              voluptate, ex modi numquam saepe porro ducimus corporis cum
              laudantium eaque.
            </i>    
          </div>
          <hr/>
        </div>
    </div>
  );
};

export default Comment;
