'use strict';

QUnit.module("Тестируем функцию polishNotationEvaluator", function() {
    QUnit.test("Правильно вычисляет простое выражения", function(assert) {
        const input = "+ 3 4"; // 3 + 4
        const result = polishNotationEvaluator(input);

        assert.equal(result, 7);
    });

    QUnit.test("Правильно вычисляет выражение с несколькими операциями", function(assert) {
        const input = "* + 2 3 4"; // (2 + 3) * 4
        const result = polishNotationEvaluator(input);

        assert.equal(result, 20);
    });

    QUnit.test("Правильно вычисляет выражение с отрицательными числами", function(assert) {
        const input = "- 5 + 3 2"; // 5 - (3 + 2)
        const result = polishNotationEvaluator(input);

        assert.equal(result, 0);
    });

    QUnit.test("Правильно вычисляет пустое выражение", function(assert) {
        const input = "";
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Правильно вычисляет выражение с делением", function(assert) {
        const input = "/ 10 2"; // 10 / 2
        const result = polishNotationEvaluator(input);
        
        assert.equal(result, 5);
    });

    QUnit.test("Проверяет поведение при делении на ноль", function(assert) {
        const input = "/ 5 0";
        const result = polishNotationEvaluator(input);

        assert.equal(result, Infinity);
    });

    QUnit.test("Возвращает NaN, если input не является строкой", function(assert) {
        const result = polishNotationEvaluator(undefined);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Возвращает NaN при недостатке операндов", function(assert) {
        const input = "+";
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });
});
