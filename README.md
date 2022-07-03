# How to run project

1. Run npm install as it will install the dependecies

2. Open three terminal sessions

3. Run these commands in each of them

```
dfx start
```

```
dfx deploy
```

```
npm start
```

4. You can check the project at local host 8080


# Check your Balance

1. Find out your principal id:

```
dfx identity get-principal
```

2. Save it somewhere.


3. Format and store it in a command line variable:

```
OWNER_PUBLIC_KEY="principal \"$( \dfx identity get-principal )\""
```

4. Check that step 3 worked by printing it out:

```
echo $OWNER_PUBLIC_KEY
```

5. Check the owner's balance:

```
dfx canister call token balanceOf "( $OWNER_PUBLIC_KEY )"
```


# Deploy the Project to the Live IC Network

1. Create and deploy canisters:

```
dfx deploy --network ic
```

2. Check the live canister ID:

```
dfx canister --network ic id token
```

3. Save the live canister ID to a command line variable:

```
LIVE_CANISTER_KEY="principal \"$( \dfx canister --network ic id token )\""
```

4. Check that it worked:

```
echo $LIVE_CANISTER_KEY
```

5. Transfer some tokens to the live canister:

```
dfx canister --network ic call token transfer "($LIVE_CANISTER_KEY, 50_000_000)"
```

6. Get live canister front-end id:

```
dfx canister --network ic id token_assets
```

7. Copy the id from step 6 and add .raw.ic0.app to the end to form a URL.
   e.g. zdv65-7qaaa-aaaai-qibdq-cai.raw.ic0.app
