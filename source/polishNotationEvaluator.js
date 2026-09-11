'use strict';

/**
 * Функция, вычисляющая результат выражения, записанного в польской нотации.
 * Поддерживает операторы +, -, *, / и целочисленные операнды.
 * @param {String} input - строка с выражением в префиксной нотации, токены разделены пробелами
 * 
 * @returns {Number} результат вычисления выражения, либо NaN, если в input подаётся пустое/некоректное выражение
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
    if (typeof input !== 'string' || input.trim() === "") {
        return NaN;
    }

    const tokens = input.trim().split(/\s+/);
    const operators = ["+", "-", "*", "/"];
    const stack = [];
    let hasInvalidResult = false;
    
    tokens.slice().reverse().forEach((token) => {
        if (operators.includes(token)) {
            const a = stack.pop();
            const b = stack.pop();
            const result = applyOperator(token, a, b);

            if (Number.isNaN(result)) {
                hasInvalidResult = true;
            } else {
                stack.push(result)
            }
        } else {
            stack.push(Number(token));
        }
    });

    if (hasInvalidResult) {
        return NaN;
    }

    return stack.pop();
}