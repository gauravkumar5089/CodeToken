import React from "react";
import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";
import Navbar from "./Navbar";

function App(props) {
  return (
    <div id="screen">
      <Navbar />
      {/* <Header /> */}
      <Faucet userPrincipal={props.userPrincipal} />
      <Balance />
      <Transfer />
    </div>
  );
}

export default App;
