import React from "react";
import "./Input.scss";

const Input = (props) => {
  const [focus, setFocus] = React.useState(false);
  const [input, setInput] = React.useState("");
  const inputEl = React.useRef(null);

  React.useEffect(() => {
    if (input.length > 0) {
      setFocus(true);
    }
  }, [input]);

  const handleOnFocus = () => {
    setFocus(true);
    inputEl.current.focus();
  };

  const handleOnBlur = () => {
    if (input.length == 0) {
      setFocus(false);
    }
  };

  return (
    <div
      className={`Input ${focus ? "focus" : ""}`}
      onClick={() => handleOnFocus()}
    >
      {props.placeholder && <p className="placeholder">{props.placeholder}</p>}
      <input
        type={props.type ? props.type : "text"}
        onChange={(e) => {
          setInput(e.target.value);
          if (props.onChange) props.onChange(e);
        }}
        onFocus={() => handleOnFocus()}
        onBlur={() => handleOnBlur()}
        ref={inputEl}
      />
    </div>
  );
};

export default Input;
