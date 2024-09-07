import Bool "mo:base/Bool";
import Int "mo:base/Int";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Float "mo:base/Float";

actor {
  type Stock = {
    symbol: Text;
    name: Text;
    price: Float;
  };

  var stocks : [Stock] = [
    { symbol = "AAPL"; name = "Apple Inc."; price = 150.25 },
    { symbol = "GOOGL"; name = "Alphabet Inc."; price = 2750.80 },
    { symbol = "MSFT"; name = "Microsoft Corporation"; price = 305.15 },
    { symbol = "AMZN"; name = "Amazon.com Inc."; price = 3380.50 },
    { symbol = "META"; name = "Meta Platforms Inc."; price = 330.75 }
  ];

  public query func getStocks() : async [Stock] {
    stocks
  };

  public func updateStockPrice(symbol: Text, newPrice: Float) : async () {
    stocks := Array.map<Stock, Stock>(stocks, func (stock) {
      if (stock.symbol == symbol) {
        { stock with price = newPrice }
      } else {
        stock
      }
    });
  };

  // Note: In a real-world scenario, you'd implement actual trading logic here
  public func trade(symbol: Text, quantity: Int, isBuy: Bool) : async Text {
    if (isBuy) {
      "Buy order placed for " # symbol # " x" # Int.toText(quantity)
    } else {
      "Sell order placed for " # symbol # " x" # Int.toText(quantity)
    }
  };
}
