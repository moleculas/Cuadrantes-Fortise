// Texto del importe en el indicador flotante del cuadrante ("Horas: X - Total: Y €").
//
// Contexto: ese indicador (retornaInfoFabButtonAccion, cuadrantesFacturacionDucks.js)
// calcula las HORAS en vivo, pero el IMPORTE lo lee de un valor ya guardado en el
// informe (precioHoraTotal o mensualPactado), que solo se recalcula al registrar
// el cuadrante. Cuando ese valor no existe todavía —por ejemplo tras resetear el
// cuadrante— la concatenación daba "Total: NaN €" (incidencia 2026-09-26).
//
// Regla: no se imprime un número que no se puede calcular. Si el importe no está
// disponible se dice en texto; si está, se muestra exactamente igual que siempre.
// Ver documentacion/LOGICA_RESETEO_CUADRANTE.md §6.

export const TEXTO_SIN_IMPORTE = 'pendiente de registrar';

// ¿El importe guardado en el informe es un número utilizable?
// null / undefined / NaN / cadena no numérica → no.
export const hayImporteCalculado = (importe) => {
    if (importe === null || importe === undefined || importe === '') return false;
    return Number.isFinite(Number(importe));
};

// Trozo de texto que va detrás de "Total...: ".
//   - con importe → "2297.90 €" (importe + servicios fijos, dos decimales, como siempre)
//   - sin importe → "pendiente de registrar"
// serviciosFijos se suma solo cuando hay importe; por sí solo no convierte en
// calculable un cuadrante que no lo está.
export const textoImporteTotal = (importe, serviciosFijos = 0) => {
    if (!hayImporteCalculado(importe)) return TEXTO_SIN_IMPORTE;
    const extra = Number.isFinite(Number(serviciosFijos)) ? Number(serviciosFijos) : 0;
    return `${(Number(importe) + extra).toFixed(2)} €`;
};
