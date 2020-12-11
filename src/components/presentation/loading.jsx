import React from "react";
import Spinner from "react-bootstrap/Spinner";

export default function loading() {
  return (
    <div>
      {[
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
      ].map((typ) => (
        <Spinner key={typ} animation="grow" variant={typ} />
      ))}
    </div>
  );
}
