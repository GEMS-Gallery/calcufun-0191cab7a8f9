export const idlFactory = ({ IDL }) => {
  const Stock = IDL.Record({
    'name' : IDL.Text,
    'price' : IDL.Float64,
    'symbol' : IDL.Text,
  });
  return IDL.Service({
    'getStocks' : IDL.Func([], [IDL.Vec(Stock)], ['query']),
    'trade' : IDL.Func([IDL.Text, IDL.Int, IDL.Bool], [IDL.Text], []),
    'updateStockPrice' : IDL.Func([IDL.Text, IDL.Float64], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
