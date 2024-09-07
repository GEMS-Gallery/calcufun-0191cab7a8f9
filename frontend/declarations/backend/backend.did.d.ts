import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Stock { 'name' : string, 'price' : number, 'symbol' : string }
export interface _SERVICE {
  'getStocks' : ActorMethod<[], Array<Stock>>,
  'trade' : ActorMethod<[string, bigint, boolean], string>,
  'updateStockPrice' : ActorMethod<[string, number], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
