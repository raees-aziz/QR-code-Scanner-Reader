import React from "react";
// import QRcode from "./components/QRcode";
import ScannerIcon from "../src/assets/icons/ScannerIcon";
import { useNavigate } from "react-router-dom";
import Generator from "./assets/icons/Generator";

function App() {
  const navigator = useNavigate();
  // Generator QR
  function handleGenerator() {
    // alert("QR code Generator");
    navigator("/generator");
  }
  // Image Reader
  function handleReader() {
    navigator("/reader");
  }
  return (
    <>
      <div className=" flex justify-center items-center text-black font-bold text-4xl">
        {/* Generator */}
        <div
          className="flex w-1/4 rounded-lg hover:bg-blue-700 hover:text-white p-4"
          onClick={handleGenerator}
        >
          <div className="z-10">
            <Generator
              color={"hover:bg-blue-700 hover:fill-white fill-black "}
            />
          </div>
          <button className="m-2">QR code Generator</button>
        </div>
        {/* Reader */}
        <div
          className="flex w-1/4 rounded-lg hover:bg-green-700 hover:text-white p-4"
          onClick={handleReader}
        >
          <div className="z-10">
            <ScannerIcon
              color={"hover:bg-green-700 hover:fill-white fill-black "}
            />
          </div>
          <button className="m-2">QR code Scanner</button>
        </div>
      </div>
      {/* <QRcode /> */}
    </>
  );
}

export default App;
