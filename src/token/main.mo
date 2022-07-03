import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

actor token {

    var owner:Principal = Principal.fromText("eunbe-egrlw-cvpi2-kqui2-go3np-jwjjs-xeiiv-5g3na-pu5px-f57s6-jqe");
    var totalSupply = 1000000000;
    var symbol : Text = "CODE";

    var ledger = HashMap.HashMap<Principal, Nat>(1,Principal.equal,Principal.hash);
    var freeTokenHolders = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);
    
    ledger.put(owner,totalSupply);

    public query func getBalance(person : Principal) : async Nat{

        let balance : Nat = switch(ledger.get(person)){
            case null 0;
            case (?int) int;
        };

        return balance;
    
    };

    public query func getSymbol() : async Text{
        return symbol;
    };

    public query func getTotalSupply() : async Nat{
        return totalSupply;
    };

    public shared(msg) func transfer(person : Principal, amount : Nat) : async Bool{
        let senderBalance : Nat = switch(ledger.get(msg.caller)){
            case null 0;
            case (?int) int;
        };
        let receiverBalance : Nat = switch(ledger.get(person)){
            case null 0;
            case (?int) int;
        };

        if(senderBalance < amount){
            return false;
        };

        ledger.put(person,receiverBalance+amount);
        ledger.put(msg.caller,senderBalance-amount);
        return true;
    };

    public shared(msg) func getOwnBalance(): async Nat{
        let balance : Nat = switch(ledger.get(msg.caller)){
            case null 0;
            case (?int) int;
        };
        return await getBalance(msg.caller);
    };

    public shared(msg) func freeTokens() : async Bool{

        if(freeTokenHolders.get(msg.caller) != null){
            return false;
        };


        let balance : Nat = switch(ledger.get(msg.caller)){
            case null 0;
            case (?int) int;
        };
        freeTokenHolders.put(msg.caller,balance);
        ledger.put(msg.caller,balance+10000);
        ledger.put(owner,totalSupply-10000);
        Debug.print(debug_show(msg));
        return true;
    };

}