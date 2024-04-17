import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import CamReader from "./CamReader";

function Reader() {
  let [file, setFile] = useState(null);
  let [img, setImg] = useState(null);
  let [copy, setCopy] = useState(null);
  let textRef = useRef();

  useEffect(() => {
    window.navigator.clipboard.writeText(copy);
  }, [copy]);

  const handlerChange = async (e) => {
    try {
      let file = e.target.files[0];
      setFile(file);
      const result = await QrScanner.scanImage(file);
      // console.log("result", result);
      setImg(result);
    } catch (error) {
      console.log(error || "No QR code found.");
    }
  };
  const hanldeCopy = () => {
    setCopy(textRef.current.innerText);

    // window.navigator.clipboard.writeText(copy);
    console.log(copy);
  };

  return (
    <div>
      <h1 className="text-6xl text-red-300 mt-6 font-bold text-center">
        QR Code Reader
      </h1>
      {/*  */}
      <div className="flex gap-10 justify-around text-white m-auto w-full bg-red-400 h-[550px]">
        <div className="h-[500px] w-full bg-white">
          <h1 className="text-center text-black">CAM-Scanner</h1>
          <div>
            <CamReader />
          </div>
        </div>
        <div className="h-[500px] w-full bg-white">
          <h1 className="text-center text-black">Image-Reader</h1>
          <div className="my-10 w-1/5 m-auto text-black ">
            <p className="font-bold mt-6 text-center">Upload QR Image</p>
            <label
              className="bg-slate-700 mb-6 text-white flex justify-center items-center w-full text-6xl font-bold h-[90px]"
              htmlFor="reader"
            >
              +
            </label>
            <input
              className="hidden"
              onChange={handlerChange}
              accept=".png, .jpeg, .jpg"
              type="file"
              id="reader"
            />
          </div>
          <h1 className="text-black text-center my-6">Result</h1>
          <div className="flex gap-4 justify-center items-center">
            <p
              className="text-2xl font-bold text-green-500 text-center"
              ref={textRef}
            >
              {img}
            </p>
            <button
              onClick={hanldeCopy}
              className="text-black bg-yellow-700 p-2 rounded font-bold"
            >
              COPY
            </button>
            <span className={`text-black ${copy ? "" : "hidden"}`}>Copied</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reader;
