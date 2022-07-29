// Add 30% tax to customers' bills
const calculateBills = (total, taxPercent) => {
    const tax = total * taxPercent
    return total + tax 
}

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

module.exports = {
    calculateBills,
    fahrenheitToCelsius,
    celsiusToFahrenheit
}