export function roundUpToDecimalPlace(num, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces)
  return Math.ceil(num * factor) / factor
}
