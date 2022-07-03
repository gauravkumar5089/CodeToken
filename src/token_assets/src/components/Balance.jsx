import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {
  const [Symbol, setSymbol] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [InputValue, setInputValue] = useState("");
  const [Balance, setBalance] = useState(0);

  async function handleClick() {
    const principal = Principal.fromText(InputValue);
    const amount = await token.getBalance(principal);
    setBalance(amount.toLocaleString());
    const symbol = await token.getSymbol();
    setSymbol(symbol);
    setIsHidden(false);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={InputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button id="btn-request-balance" onClick={handleClick}>
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>
        This account has a balance of {Balance} {Symbol}{" "}
      </p>
    </div>
  );
}

export default Balance;
