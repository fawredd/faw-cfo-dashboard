export const formatNumber = (value:number) => {
    return value.toLocaleString("es-AR", { style: "currency", currency: "ARS" })
}