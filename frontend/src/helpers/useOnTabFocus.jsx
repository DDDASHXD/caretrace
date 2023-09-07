import React from "react";

const useOnTabFocus = (callback) => {
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        callback();
      }
    };

    handleVisibilityChange();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [callback]);
};

export default useOnTabFocus;
