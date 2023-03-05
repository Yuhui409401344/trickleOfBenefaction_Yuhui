import React, { useState, useEffect } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../elements/navbar";
import TitleSec from "../elements/titleSec";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { db } from "../utils/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router";

function StoreQrcodeList({ id, num, charityName, storeName, QRcodeDate,  status, QRcodeId }) {

    // QRcodeDetailData
    const qrcodeData = (item) => {
        localStorage.setItem("orgData", JSON.stringify(item));
    };
    
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
    const iconStyle = {
        paddingTop: "3px",
        paddingBottom: "3px",
        paddingLeft: "6px",
        paddingRight: "6px",
        fontSize: "13px",
    };

    return (
        <tr>
            <td>{num}</td>
            <td>{charityName}</td>
            <td>{QRcodeDate}</td>
            <td>{storeName}</td>
            {status === "已領取" && (
                <td>
                    <p style={prove}>{status}</p>
                </td>
            )}
            {status === "未領取" && (
                <td>
                    <p style={prove2}>{status}</p>
                </td>
            )}
           
            <td>
                <Button
                    as={Link}
                    to="/storeQrcodeData"
                    onClick={(e) => qrcodeData({ QRcodeId:QRcodeId })}
                    style={iconStyle}
                    variant="success"
                >
                    <FontAwesomeIcon icon={faGift} />
                </Button>

            </td>
        </tr>
    );
}

function StoreQrcode() {
    //   const navigate = useNavigate("");
    //   const [user] = useAuthState(auth);
    //   if (!user) {
    //     navigate("/signIn");
    //   }
    const [details, setDetails] = useState([]);
    console.log(details);
    useEffect(() => {
        const q = query(collection(db, "QRcode"),where("status", "==", "未領取"));
        onSnapshot(q, (querySnapshot) => {
            setDetails(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });
    }, []);

    const cardStyle = {
        width: "75%",
        color: "black",
        left: "50%",
        marginTop: "60px",
        transform: `translate(${-50}%, ${-5}%)`,
        paddingTop: "3%",
        paddingBottom: "3%",
        paddingLeft: "8%",
        paddingRight: "8%",
        letterSpacing: "1px",
    };

    return (
        <div>
            {/* <Navbar /> */}
            <TitleSec name="超商QRcode兌換一覽表" />
            <Card style={cardStyle}>
                <Card.Body>
                    <Table striped bordered hover style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>機構名稱</th>
                                <th>結單日期</th>
                                <th>超商名稱</th>
                                
                                <th>狀態</th>
                                <th>兌換</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((item, index) => (
                                <StoreQrcodeList
                                    key={index}
                                    id={item.id}
                                    num={index + 1}
                                    // QRcodeDate={new Date(
                                    //     item.QRcodeDate.seconds * 1000
                                    // ).toLocaleDateString("zh-TW")}
                                    QRcodeDate={item.QRcodeDate}
                                    
                                    QRcodeId = {item.QRcodeId}
                                    charityName={item.charityName}
                                    storeName={item.storeName}
                                    status={item.status}
                                    
                                />
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
}

export default StoreQrcode;
