import Float "mo:base/Float";
import Text "mo:base/Text";
import Error "mo:base/Error";

actor Calculator {
  public func calculate(operation: Text, x: Float, y: Float) : async Float {
    switch (operation) {
      case ("+") { x + y };
      case ("-") { x - y };
      case ("*") { x * y };
      case ("/") {
        if (y == 0) {
          throw Error.reject("Division by zero");
        };
        x / y
      };
      case (_) {
        throw Error.reject("Invalid operation");
      };
    }
  };
}
