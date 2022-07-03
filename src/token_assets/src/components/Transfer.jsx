import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token, createActor, canisterId } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [transferMessage, setTransferMessage] = useState("");
  const [to, setTo] = React.useState("");
  const [amount, setAmount] = React.useState("");
  async function handleClick() {
    // console.log("Transfer clicked");
    setIsDisabled(true);
    const principal = Principal.fromText(to);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = await createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const res = await authenticatedCanister.transfer(
      principal,
      parseInt(amount)
    );
    let message = "";
    const balance = await token.getOwnBalance();
    const symbol = await token.getSymbol();
    if (res) {
      message = "Transfer successful.";
    } else {
      message = "Transfer failed.";
    }
    message +=
      "Your current balance is:" + balance.toLocaleString() + " " + symbol;
    setTransferMessage(message);
    setIsDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" disabled={isDisabled} onClick={handleClick}>
            Transfer
          </button>
        </p>
        <p>{transferMessage}</p>
      </div>
    </div>
  );
}

export default Transfer;
