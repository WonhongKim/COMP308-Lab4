import React, { useState } from "react";
import { withRouter } from "react-router-dom";

function Result(props) {
  const newData = props.location.state;

  return (
    <div>
      {newData.ResultofTest[0]},{newData.ResultofTest[1]},
      {newData.ResultofTest[2]}
    </div>
  );
}

export default withRouter(Result);
