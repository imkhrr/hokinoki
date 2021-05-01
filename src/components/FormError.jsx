import React from "react";
import { Icon } from "rsuite";

function FormError(props) {
  return (
    <div>
      <Icon icon="exclamation-triangle" size="xs" />
      <p className="is-red">{props.message}</p>
    </div>
  );
}

export default FormError;
