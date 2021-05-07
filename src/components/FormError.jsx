import React from "react";
import { Icon } from "rsuite";

function FormError(props) {
  return (
    <div>
      <p className="is-red">{props.message}</p>
    </div>
  );
}

export default FormError;
