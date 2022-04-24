import { useState } from "react";

function useToggle() {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prev) => !prev);
  return {
    show,
    toggle,
    setShow,
  };
}

export default useToggle;
