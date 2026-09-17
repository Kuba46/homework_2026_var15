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

    QUnit.test("Правильно вычисляет вложенное выражение", function(assert) {
        const input = "* 2 / 8 + 5 3"; // 2 * (8 / (5 + 3))
        const result = polishNotationEvaluator(input);

        assert.equal(result, 2);
    });

    QUnit.test("Корректно обрабатывает -0 и +0", function(assert) {
        assert.equal(polishNotationEvaluator("+ -0 0"), 0);
        assert.equal(polishNotationEvaluator("+ +0 0"), 0);
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

    QUnit.test("Выбрасывает ошибку при недостатке операндов", function(assert) {
        const input = "+";

        assert.throws(
            () => polishNotationEvaluator(input),
            /Not enough operands/,
            'Недостаток операндов должен приводить к ошибке'
        );
    });

    QUnit.test("Выбрасывает ошибку при недопустимом токене", function(assert) {
        const input = "? 1 2";

        assert.throws(
            () => polishNotationEvaluator(input),
            /Invalid token/,
            'Недопустимый токен должен приводить к ошибке'
        );
    });

    QUnit.test("Выбрасывает ошибку, если input — число", function(assert) {
        assert.throws(
            () => polishNotationEvaluator(42),
            /Input must be a string/,
            'Число на входе должно приводить к ошибке'
        );
    });

    QUnit.test("Выбрасывает ошибку, если input — null", function(assert) {
        assert.throws(
            () => polishNotationEvaluator(null),
            /Input must be a string/,
            'null на входе должен приводить к ошибке'
        );
    });

    QUnit.test("Выбрасывает ошибку, если input — объект", function(assert) {
        assert.throws(
            () => polishNotationEvaluator({}),
            /Input must be a string/,
            'Объект на входе должен приводить к ошибке'
        );
    });

    QUnit.test("Выбрасывает ошибку, если input — undefined", function(assert) {
        assert.throws(
            () => polishNotationEvaluator(undefined),
            /Input must be a string/,
            'undefined на входе должен приводить к ошибке'
        );
    });
});
