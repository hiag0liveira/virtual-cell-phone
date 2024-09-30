import React from "react";

interface PhoneSize {
  width: string;
  height: string;
}

interface PhoneFrameProps {
  phoneSize: PhoneSize;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ phoneSize }) => {
  return (
    <div
      className="border-8 border-red-500 rounded-3xl shadow-lg p-4"
      style={{ width: phoneSize.width, height: phoneSize.height }}
    >
      <iframe
        src="https://todo-xarr.onrender.com/"
        title="Flutter Web App"
        className="w-full h-full rounded-lg border-none"
      />
    </div>
  );
};

export default PhoneFrame;
