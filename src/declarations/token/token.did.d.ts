import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'freeTokens' : ActorMethod<[], boolean>,
  'getBalance' : ActorMethod<[Principal], bigint>,
  'getOwnBalance' : ActorMethod<[], bigint>,
  'getSymbol' : ActorMethod<[], string>,
  'getTotalSupply' : ActorMethod<[], bigint>,
  'transfer' : ActorMethod<[Principal, bigint], boolean>,
}
