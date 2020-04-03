import { withRouter } from "react-router-dom";

import React from "react";

function Home(props) {
  return (
    <div className="jumbotron">
      <h1 className="display-3">Hello, User</h1>
      <p className="lead">This is the site for Training AI and Testing AI</p>
      <hr className="my-4" />
      <p>First of all you need to Train AI to build Model.</p>
    </div>
  );
}

export default withRouter(Home);
