import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import "./Comment.scss";
import { Button, Spin, message } from "antd";
import { useAuth } from "../../Context/AuthContext";
import { addComment, getAllComments } from "../../Firebase/Firebase";
import { Detail } from "../../Types/Type";
import { User } from "firebase/auth";
import LoadingComponent from "../LoadingComponent";

interface Props {
  details: Detail | undefined;
}

interface IComments {
  comment: string;
  movie: Detail;
  user: User;
}

const Comment: React.FC<Props> = ({ details }) => {
  const [textValue, setTextValue] = useState<string>("");
  const [comments, setComments] = useState<IComments[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const context = useAuth();

  const setComment = async () => {
    try {
      await addComment(details, context.user, textValue);
      message.success("Yorumunuz başarılı bir şekilde eklendi");
      setTextValue("");

      // setComments(await getAllComments(context.user, details));
    } catch (error) {
      console.log(error);
    }
  };

  const getFavourites = async () => {
    if (context.user !== undefined && details !== undefined)
      setComments(await getAllComments(context.user, details));
  };

  useEffect(() => {
    getFavourites();
  }, [context.user,details]);

  return (
    <div className="comments-section">
      <div
        style={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "white" }}>YORUMLAR</h1>
      </div>
      {context.user && localStorage.getItem("userData") && (
        <div className="text-area-section">
          <TextArea
            onChange={(e) => setTextValue(e.target.value)}
            value={textValue}
            className="text-area"
            placeholder="Bir yorum yazınız..."
          />
          <Button onClick={setComment} size="large">
            Gönder
          </Button>
        </div>
      )}
      <div className="comments-area">
        {comments && comments.length > 0 ?
          comments.map((cmmnt) => {
            return (
              <>
                <div className="comment">
                  <h5 style={{ color: "white" }}>{cmmnt.user.email}</h5>
                  <i style={{ color: "white" }}>{cmmnt.comment}</i>
                </div>
                <hr />
              </>
            );
          }) : <h1>YÜKLENİYOR...</h1>}
      </div>
    </div>
  );
};

export default Comment;
