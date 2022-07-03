import React from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  const [buttonText, setButtonText] = React.useState("Get Now");
  const [isdisabled, setIsdisabled] = React.useState(false);
  let symbol;

  async function handleClick(event) {
    symbol = await token.getSymbol();
    setIsdisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = await createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const res = await authenticatedCanister.freeTokens();
    if (res) {
      setButtonText("Congrats! You got free tokens!");
    } else {
      setButtonText("Sorry! You can't get free tokens!");
    }
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Your user principal: {props.userPrincipal}
        <br></br>
        Get your free {symbol} tokens here! Claim 10,000 CODE tokens to your
        account.
      </label>
      <p className="trade-buttons">
        <button disabled={isdisabled} id="btn-payout" onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
