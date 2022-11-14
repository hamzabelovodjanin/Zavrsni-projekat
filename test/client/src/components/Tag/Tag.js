import React from "react";
import "./Tag.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Tag({ name, removeFunc }) {
  return (
    <span className="tag" onClick={removeFunc}>
      {name} <FontAwesomeIcon icon={faXmark} />
    </span>
  );
}
