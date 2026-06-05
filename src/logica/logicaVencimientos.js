// Cálculo ÚNICO de la fecha de vencimiento, replicando Factusol.
// Regla validada contra ~27 facturas reales de Factusol:
//   vencimiento = (último día del mes de facturación + días de la forma de pago),
//   llevado al primer "día de pago" del cliente igual o posterior a esa fecha.
// NO existe regla de "mínimo 30 días".
// Fuente de verdad única para PDF (factura por mail) y SEPA (cargo bancario).
// Ver documentacion/LOGICA_VENCIMIENTOS.md.

export function calcularFechaVencimiento(diaPago, mes, anyo, formaPago, formasDePago) {
    // mes: 1-12 del mes de FACTURACIÓN (origen del cuadrante). anyo: año del cuadrante.
    const forma = formasDePago.find(fp => fp.value === formaPago);
    const dias = forma ? forma.dias : 0;

    // Fortise factura a fin de mes: emisión = último día del mes
    const ultimoDiaMes = new Date(anyo, mes, 0).getDate();
    const fechaEmision = new Date(anyo, mes - 1, ultimoDiaMes);

    // Fecha base = emisión + días de la forma de pago
    const fechaBase = new Date(fechaEmision);
    fechaBase.setDate(fechaBase.getDate() + dias);

    // Sin día de pago → vencimiento = fecha base
    const dp = parseInt(diaPago, 10);
    if (!dp || isNaN(dp)) return fechaBase;

    // Situar el día de pago; si quedó antes de la fecha base, pasar al mes siguiente
    const fechaVto = new Date(fechaBase.getFullYear(), fechaBase.getMonth(), dp);
    if (fechaVto < fechaBase) {
        fechaVto.setMonth(fechaVto.getMonth() + 1);
        fechaVto.setDate(dp);
    }
    return fechaVto;
}

export function formatoDDMMYYYY(date) {
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
}

export function formatoYYYYMMDD(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
