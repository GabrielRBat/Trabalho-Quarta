import { useEffect, useState } from "react";

function ErrorMessage({ msg, onClose }) {
  const [isExiting, setIsExiting] = useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const timer = async () => {
      await sleep(4000);
      setIsExiting(true);
      await sleep(300);
      onClose();
    };
    timer();
  }, [onClose]);

  const isClosing = async () => {
    setIsExiting(true);
    await sleep(300);
    onClose();
  };

  return (
    <div
      className={`fixed top-4 right-4 z-[9999] bg-red-500 text-white px-6 py-3 rounded shadow transition-all ${
        isExiting ? "animate-slide-up" : "animate-slide-down"
      }`}
    >
      <div className="flex justify-between items-center gap-4">
        <p className="font-semibold">{msg}</p>
        <button
          onClick={isClosing}
          className="font-bold hover:text-black text-white"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;
