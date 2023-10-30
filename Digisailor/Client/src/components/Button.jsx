import React from "react";
import Button from "react-bootstrap/Button";

const CustomButton = ({ text, style }) => {
  return (
    <Button variant="dark" style={{ ...style }} className="button">
      {text}
    </Button>
  );
};

export default CustomButton;
