'use strict';

/**
 * Функция, вычисляющая результат выражения, записанного в польской нотации.
 * Поддерживает операторы +, -, *, / и целочисленные операнды.
 * @param {String} input - строка с выражением в префиксной нотации, токены разделены пробелами
 * 
 * @returns {Number} результат вычисления выражения, либо NaN, если в STDIN подаётся пустое/некоректное выражение
 * 
 * @example
 * polishNotationEvaluator('+ 1 9');
 * // returns 10
 * 
 * @example
 * polishNotationEvaluator('* + 2 4 5');
 * // returns 30
 */

function polishNotationEvaluator(input) {
    if (input.trim() === "") {
        return NaN;
    }

    const tokens = input.trim().split(/\s+/);
    const operators = ["+", "-", "*", "/"];
    const stack = [];
    
    for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i];

        if (operators.includes(token)) {
            const a = stack.pop();
            const b = stack.pop();

            let result;
            switch (token) {
                case "+":
                    result = a + b;
                    break;
                case "-":
                    result = a - b;
                    break;
                case "*":
                    result = a * b;
                    break;
                case "/":
                    result = a / b;
                    break;
            }
            stack.push(result);
        } else {
            stack.push(Number(token));
        }
    }
    return stack.pop();
}