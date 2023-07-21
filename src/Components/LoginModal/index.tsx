import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import React from "react";
import './LoginModal.scss'
import { useNavigate } from "react-router-dom";

interface Props {
  isLoginModalOpen: boolean,
  setIsLoginModalOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal: React.FC<Props> = ({ isLoginModalOpen,setIsLoginModalOpen }) => {
  const navigate = useNavigate()
  return (
    <div>
      <Modal
        className="modalStyle"
        title=""
        open={isLoginModalOpen}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={()=>setIsLoginModalOpen(false)}
      >
          <Button onClick={()=>navigate("/login")}>GİRİŞ YAP</Button>
          <p>Hesabınız Yok mu?</p>
          <Button onClick={()=>navigate("/sign-up")}>KAYIT OL</Button>
          <hr style={{ width: "50%" }} />
          <Button onClick={()=>setIsLoginModalOpen(false)}>Giriş Yapmadan Devam Et</Button>
      </Modal>
    </div>
  );
};

export default LoginModal;
