import { useEffect } from "react";

const useKeyDown = (keycode, callback) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === keycode) {
        callback(e);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keycode, callback]);
};

export default useKeyDown;
