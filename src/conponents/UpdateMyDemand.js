import { Container } from "react-bootstrap";
import React from "react";
import "../App.css";
import UpdateMyProduct from "../elements/updateMyProduct";
import TitleSec from "../elements/titleSec";
import { useNavigate } from "react-router-dom";
import Navbar from "../elements/navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

function UploadDemand() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  return (
    <div>
      <Navbar />
      <TitleSec name="修改我的需求" />
      <Container>
        <div>
          <UpdateMyProduct />
        </div>
      </Container>
    </div>
  );
}

export default UploadDemand;
