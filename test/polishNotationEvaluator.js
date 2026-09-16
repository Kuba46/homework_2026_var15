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

    QUnit.test("Выбрасывает ошибку для пустого выражения", function(assert) {
        const input = "";

        assert.throws(
            () => polishNotationEvaluator(input),
            /Invalid token/,
            'Пустая строка должна приводить к ошибке'
        );
    });

    QUnit.test("Выбрасывает ошибку, если input не является строкой", function(assert) {
        assert.throws(
            () => polishNotationEvaluator(undefined),
            /Input must be a string/,
            'Не строка на входе должна приводить к ошибке'
        );
    });

    QUnit.test("Выбрасывает ошибку при недостатке операндов", function(assert) {
        const input = "+";

        assert.throws(
            () => polishNotationEvaluator(input),
            /Not enough operands/,
            'Недостаток операндов должен приводить к ошибке'
        );
    });
});
