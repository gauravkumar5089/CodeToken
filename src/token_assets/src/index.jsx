import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const login = async () => {
  const authClient = await AuthClient.create();
  // console.log(authClient.getIdentity());
  if (await authClient.isAuthenticated()) {
    console.log("Already authenticated");
    init(authClient);
    // If the user is authenticated, we can render the App.
    // If the user is not authenticated, we can redirect to the login page.
  } else {
    await authClient.login({
      onSuccess: () => {
        console.log("Logged in successfully");
        init(authClient);
      },
    });
  }

  // Call authClient.login(...) to login with Internet Identity. This will open a new tab
  // with the login prompt. The code has to wait for the login process to complete.
  // We can either use the callback functions directly or wrap in a promise.
};

async function init(authClient) {
  const identity = await authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  console.log(userPrincipal.toString());
  console.log(identity);

  ReactDOM.render(
    <App userPrincipal={userPrincipal} />,
    document.getElementById("root")
  );
  // First we have to create and AuthClient.
}

login();
