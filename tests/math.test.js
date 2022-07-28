const { calculateBills, fahrenheitToCelsius, celsiusToFahrenheit } = require("../src/math");

test('Should calculate total amount with tax', () => {
    const totalAmount = calculateBills(10, 0.3);
    expect(totalAmount).toBe(13);
});

test("Should convert 32 F to 0 C", () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
})

test("Should convert 0 C to 32 F", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
});

test("Async code test demo", (done) => {
    setTimeout(() => {
        expect(2).toBe(2);
        done()
    }, 2000)
})

