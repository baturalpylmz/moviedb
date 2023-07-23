import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import "./Comment.scss";
import { Button, Spin, message } from "antd";
import { useAuth } from "../../Context/AuthContext";
import { addComment, getAllComments } from "../../Firebase/Firebase";
import { Detail } from "../../Types/Type";
import LoadingComponent from "../LoadingComponent";
import { User } from "firebase/auth";

interface Props {
  details: Detail | undefined;
}

interface IComments {
  comment: string;
  movie: Detail;
  user:User;
}

const Comment: React.FC<Props> = ({ details }) => {
  const [textValue, setTextValue] = useState<string>("");
  const [datas, setDatas] = useState<IComments[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const context = useAuth();

  const setComment = async () => {
    if(details && context.user && textValue){
      try {     
        await addComment(details, context.user, textValue);
        setTextValue("");
        window.location.reload()
        message.success("Yorumunuz başarılı bir şekilde eklendi");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getComments = async () => {
    if(details){
      setIsLoading(true);
      try {
        const fetchedComments:IComments[] = await getAllComments(details);
        setDatas(fetchedComments)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getComments();
  }, [context.user, details]);

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
        {isLoading ? (
          <LoadingComponent />
        ) : (
            datas.map((data) => {
            return (
              <>
                <div className="comment">
                  <div className="comment-top-section">
                    <img className='user-icon-comment' src={data.user.photoURL ? data.user.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
                    <h5 style={{ color: "white" }}>{data.user.email}</h5>
                  </div>
                  <i style={{ color: "white" }}>{data.comment}</i>
                </div>
                <hr />
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Comment;
