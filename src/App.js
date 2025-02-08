import React, { useState } from "react";
import "./styles.css";

function App() {
  const [input, setInput] = useState("0");
  const [formula, setFormula] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  function handleClear() {
    setInput("0");
    setFormula("");
    setEvaluated(false);
  }

  function handleNumber(num) {
    if (evaluated) {
      setInput(num);
      setFormula(num);
      setEvaluated(false);
    } else {
      setInput((prev) => (prev === "0" ? num : prev + num));
      setFormula((prev) => prev + num);
    }
  }

  function handleOperator(operator) {
    if (evaluated) {
      setFormula(input + operator);
      setEvaluated(false);
    } else {
      setFormula((prev) =>
        /[+\-*/]$/.test(prev) && operator !== "-"
          ? prev.replace(/[+\-*/]+$/, operator)
          : prev + operator
      );
    }
    setInput(operator);
  }

  function handleDecimal() {
    if (evaluated) {
      setInput("0.");
      setFormula("0.");
      setEvaluated(false);
    } else if (!input.includes(".")) {
      setInput((prev) => prev + ".");
      setFormula((prev) => prev + ".");
    }
  }

  function handleEvaluate() {
    try {
      const result = eval(formula);
      setInput(result.toString());
      setFormula(formula + "=" + result);
      setEvaluated(true);
    } catch {
      setInput("Error");
      setFormula("");
    }
  }

  return (
    <div className="calculator">
      <div className="formulaScreen">{formula}</div>
      <div id="display" className="display">
        {input}
      </div>
      <button id="clear" onClick={handleClear}>
        AC
      </button>
      <button id="divide" onClick={() => handleOperator("/")}>
        /
      </button>
      <button id="multiply" onClick={() => handleOperator("*")}>
        x
      </button>
      <button id="seven" onClick={() => handleNumber("7")}>
        7
      </button>
      <button id="eight" onClick={() => handleNumber("8")}>
        8
      </button>
      <button id="nine" onClick={() => handleNumber("9")}>
        9
      </button>
      <button id="subtract" onClick={() => handleOperator("-")}>
        -
      </button>
      <button id="four" onClick={() => handleNumber("4")}>
        4
      </button>
      <button id="five" onClick={() => handleNumber("5")}>
        5
      </button>
      <button id="six" onClick={() => handleNumber("6")}>
        6
      </button>
      <button id="add" onClick={() => handleOperator("+")}>
        +
      </button>
      <button id="one" onClick={() => handleNumber("1")}>
        1
      </button>
      <button id="two" onClick={() => handleNumber("2")}>
        2
      </button>
      <button id="three" onClick={() => handleNumber("3")}>
        3
      </button>
      <button id="zero" onClick={() => handleNumber("0")}>
        0
      </button>
      <button id="decimal" onClick={handleDecimal}>
        .
      </button>
      <button id="equals" onClick={handleEvaluate}>
        =
      </button>
    </div>
  );
}

export default App;
