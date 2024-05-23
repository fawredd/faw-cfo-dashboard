
export const formatNumber = (value:number) => {
    return value.toLocaleString("es-AR", { style: "currency", currency: "ARS" })
}

export function roundUpToNearestInteger(value:number) {
  const powerOf10 = Math.floor(Math.log10(value)); // Get the power of 10 of the number
  
  const factor = 10 ** powerOf10; // Calculate the rounding factor
  
  const roundedNumber = Math.ceil(value / factor) * factor; // Round up and multiply by the factor
  
  return roundedNumber; // Format the result with 2 decimal places
}

export function roundToDecimals(value:number):number {
    const roundedNumber = Number((Math.round(value * 100) / 100).toFixed(2));
    return roundedNumber;
}