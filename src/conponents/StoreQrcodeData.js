import React, { useState, useEffect } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Navbar from "../elements/navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownload } from "@fortawesome/free-solid-svg-icons";
import { FormControl } from "react-bootstrap";
import TitleSec from "../elements/titleSec";
import ButtonLink from "../elements/button";

import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../utils/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import Accordion from 'react-bootstrap/Accordion';
import { faGift, faList } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc, setDoc, Timestamp } from "firebase/firestore";


function OrgData({
  QRcodeId,
  charityName,
  storeName,
  qrcodeDate,
  deadlineDate,
  goodsName,
  goodsPicture,
  goodsNum,
  status,
  exchangeDate,
}) {
  const [tmp, setTmp] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "QRcode"), where("QRcodeId", "==", QRcodeId));
    onSnapshot(q, (querySnapshot) => {
      setTmp(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  const navigate = useNavigate("");
  const [passID, setPassID] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("uid：" + QRcodeId);
    console.log("passID：" + passID);


    if (passID.trim() === QRcodeId.trim()) {
      const pID = QRcodeId.trim();
      //console.log("pID："+pID);
      const taskDocRef = doc(db, "QRcode", pID);

      // console.log(taskDocRef._key.id);
      console.log(taskDocRef);

      try {
        console.log("start");
        await updateDoc(taskDocRef, {
          status: "已領取",
          exchangeDate: Timestamp.now(),
        });
        alert("兌換成功");
        navigate("/storeQrcode");

      } catch (err) {
        console.log(err);
        //alert("驗證碼不正確，兌換失敗。")
      }
    } else {
      alert("兌換失敗，驗證碼不正確。");
    }
  };

  const btnStyle = {
    position: "absolute",
    marginTop: "40px",
    left: "50%",
    transform: `translate(${-50}%, ${-50}%)`,
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderRadius: "10px",
    letterSpacing: "1px",
  };
  const h4Style = {
    fontWeight: "bold",
    lineHeight: "100px",
  };
  const nameStyle = {
    lineHeight: "40px",
    marginRight: "10px",
    fontWeight: "bold",
  };
  const ansStyle = {
    height: "40px",
    lineHeight: "40px",
  };
  const contentStyle = {
    textAlign: "left",
    marginLeft: "30px",
    letterSpacing: "2px",
  };
  const goodsImgStyle = {
    width: "100px",
    height: "100px",
  };
  const card = {
    marginBottom: "20px",
    marginLeft: "5%",
    padding: "30px 40px 30px 40px",
    color: "#002B5B",
    width: "90%",
    display: "flex",
    flexDirection: "row",
  };
  const title_Btn = {
    color: "#002B5B",
    fontWeight: "600",
    letterSpacing: "2px"
  }

  const prove = {
    backgroundColor: "#26aa99",
    display: "inline-block",
    fontSize: "12px",
    padding: "3px",
    letterSpacing: "1px",
    fontWeight: "550",
    borderRadius: "5px",
    color: "white",
  };
  const prove2 = {
    backgroundColor: "#f6c23e",
    display: "inline-block",
    fontSize: "12px",
    padding: "3px",
    letterSpacing: "1px",
    fontWeight: "550",
    borderRadius: "5px",
  };
  const prove3 = {
    backgroundColor: "#e74a3b",
    display: "inline-block",
    fontSize: "12px",
    padding: "3px",
    letterSpacing: "1px",
    fontWeight: "550",
    borderRadius: "5px",
    color: "white",
  };
  const subBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    margin: "50px 0px 50px 42.5%",
  };
  return (
    <Card.Body>
      <h4 style={h4Style}>一、兌換資訊：</h4>
      {tmp.map((item, index) => (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header><span style={title_Btn}>基本資料&nbsp;<FontAwesomeIcon icon={faList} /></span></Accordion.Header>
            <Accordion.Body>

              <Card.Body style={contentStyle}>
                <Card.Title>
                  機構名稱：<b>{item.charityName}</b>
                </Card.Title>

                <hr></hr>
                <Card.Text style={{ color: "#6C6C6C" }}>
                  結單日期：{item.QRcodeDate}
                  <br />
                  合作商家：{item.storeName}
                
                  <br />
                  兌換狀態：{item.status === "已領取" && (
                    <p style={prove}>{item.status}</p>
                  )}
                  {item.status === "未領取" && (
                    <p style={prove2}>{item.status}</p>
                  )}

                </Card.Text>
              </Card.Body>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><span style={title_Btn}>商品明細&nbsp;<FontAwesomeIcon icon={faGift} /></span></Accordion.Header>
            <Accordion.Body>
              {/* 商品小卡 */}

              {item.exchangeGoodsData.map((item2, index2) => (
                <Card style={card} key={index2}>

                  <Card.Img
                    style={goodsImgStyle}
                    variant="top"
                    src={item2.goodsPicture}
                  />

                  <Card.Body style={contentStyle}>
                    <Card.Title>
                      商品名稱：<b>{item2.goodsName}</b>
                    </Card.Title>
                    <hr></hr>
                    <Card.Text style={{ color: "#6C6C6C" }}>
                      兌換數量：{item2.goodsNum}
                      <br />
                    </Card.Text>
                  </Card.Body>

                </Card>
              ))}
              {/* 商品小卡結束 */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}

      <h4 style={h4Style}>二、兌換驗證碼：</h4>



      {QRcodeId}<br></br>

      <form onSubmit={handleSubmit}>


        <InputGroup className="mb-3" style={{ width: "80%", marginLeft: "10%" }}>
          <InputGroup.Text id="basic-addon1">兌換碼</InputGroup.Text>
          <Form.Control

            onChange={(e) => setPassID(e.target.value)}
            placeholder="請輸入兌換驗證碼"
          //value={passID}
          />
        </InputGroup>
        <table style={{ marginLeft: "30%" }}>
          <tr>
            <td>
              <ButtonLink style={btnStyle} to="/storeQRcode" name="返回" />
            </td>
            <td >
              <button type="submit" style={subBtnStyle}>
                兌換
              </button>
            </td>
          </tr>
        </table>

      </form>




    </Card.Body>
  );
}

function StoreQrcodeData() {
  //   const navigate = useNavigate("");
  //   const [user] = useAuthState(auth);
  //   if (!user) {
  //     navigate("/signIn");
  //   }
  //const [details, setDetails] = useState([]);
  const [tmp, setTmp] = useState([]);
  let org = JSON.parse(localStorage.getItem("orgData"));
  console.log(org.QRcodeId)

  useEffect(() => {

    const q = query(collection(db, "QRcode"), where("QRcodeId", "==", org.QRcodeId));
    onSnapshot(q, (querySnapshot) => {
      setTmp(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  // useEffect(() => {
  //   let org = JSON.parse(localStorage.getItem("orgData"));
  //   const q = query(
  //     collection(db, "QRcode"),
  //     where("uid", "==", org.uid)
  //   );
  //   onSnapshot(q, (querySnapshot) => {
  //     setDetails(
  //       querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     );
  //   });
  // }, []);

  const cardStyle = {
    width: "75%",
    color: "black",
    left: "50%",
    marginTop: "100px",
    transform: `translate(${-50}%, ${-5}%)`,
    paddingTop: "5%",
    paddingBottom: "6%",
    paddingLeft: "8%",
    paddingRight: "8%",
    letterSpacing: "1px",
  };

  return (
    <div>
      {/* <Navbar /> */}
      <TitleSec name="物資兌換" />
      <Card style={cardStyle}>
        {tmp.map((item, index) => (
          <OrgData
            key={index}
            id={item.id}
            QRcodeId={item.QRcodeId}
          />
        ))}
      </Card>
    </div>
  );
}

export default StoreQrcodeData;
