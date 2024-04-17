import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/bootstrap.css";
import "../App.css";
//

function QRcode() {
  let [newQRcode, setnewQRcode] = useState("");
  let imgRef = useRef(0);
  let textRef = useRef(0);
  let visibleRef = useRef(0);
  const navigator = useNavigate();
  //
  // function imageQR() {}
  function handlerQR() {
    //for empty validation text
    if (newQRcode === "") {
      // textRef.current.style.background = "red";
      textRef.current.classList.add("bounce");
      visibleRef.current.classList.remove("visible");

      setTimeout(() => {
        textRef.current.classList.remove("bounce");
      }, 1000);
    } else {
      visibleRef.current.classList.add("visible");
      textRef.current.valueOf = "";
    }
    // for image src
    imgRef.current.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      newQRcode;
  }
  // for download button
  // console.log(handlerDownloadImg());
  function handlerDownloadImg() {
    (async () => {
      try {
        let responce = await fetch(
          "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
            newQRcode
        );
        //
        let file = await responce.blob();
        //
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        console.log("link", link.href);
        link.download = "download-image-jpg";
        // link.download = new Date().getTime();
        link.click();
      } catch (error) {
        alert("file not download something gone wrong");
        console.error("alsdladsa", error);
      }
    })();
  }

  function handlerScan() {
    navigator("/reader");
  }
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-center m-auto mt-4 bg-red-400 py-4 w-1/4 rounded-lg">
          QR Code Generator
        </h1>
        <div className="container rounded my-10 py-2 bg-white w-25">
          <h3 className="text-center">Enter Your URL or Text</h3>
          <div className="row">
            <div className="w-100 d-flex flex-column m-auto ">
              {/* QR code input */}
              <input
                className="my-2 p-2 w-100 rounded m-auto border border-dark "
                type="text"
                ref={textRef}
                value={newQRcode}
                onChange={(e) => setnewQRcode(e.target.value)}
              />
              {/* image */}
              <div
                ref={visibleRef}
                className="my-2 p-2 d-flex justify-content-center hidden"
              >
                <img
                  ref={imgRef}
                  src={
                    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="
                  }
                  alt="QR code"
                />
              </div>
              {/* button for generate QR - code */}
              <button
                className="btn btn-primary my-2 m-auto p-2 w-100"
                onClick={handlerQR}
              >
                Generate QR code
              </button>
              {/* Here is download Button */}
              <br />
              <button
                className="btn btn-dark my-2 m-auto p-2 w-100"
                onClick={handlerDownloadImg}
              >
                Download
              </button>
            </div>
          </div>
        </div>

        <p
          className="text-3xl text-center m-auto py-2 rounded cursor-pointer active:text-blue-600 text-black font-bold bg-green-700 w-1/4"
          onClick={handlerScan}
        >
          Click Here to Scan Code
        </p>
      </div>
    </>
  );
}

export default QRcode;
