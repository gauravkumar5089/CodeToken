export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'freeTokens' : IDL.Func([], [IDL.Bool], []),
    'getBalance' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getOwnBalance' : IDL.Func([], [IDL.Nat], []),
    'getSymbol' : IDL.Func([], [IDL.Text], ['query']),
    'getTotalSupply' : IDL.Func([], [IDL.Nat], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
