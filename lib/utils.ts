import { AccountSchema } from "./schemas";

export const formatNumber = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}k`
  } else {
    return value.toLocaleString("es-AR", { style: "currency", currency: "ARS" })
  }
};

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

/**
 * This function sums all accounts in account param group.
 * @param data Account balance
 * @param account Group of accounts
 * @returns Sum
 */
export function reduceAccounts(data: AccountSchema[], account: string): number {
  const indicator = data.reduce(
    (acumulador: number, item: AccountSchema): number => {
      return item.codigo.slice(0, account.length) === account
        ? acumulador + Math.abs(item.montosaldo_fin)
        : acumulador;
    },
    0,
  );
  return indicator;
}
