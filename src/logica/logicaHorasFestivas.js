// Horas festivas de un cuadrante, contadas una sola vez.
//
// Cada columna del cuadrante (titular y suplente) lleva su propio contador
// `horasFestivasComputables`. Pero los días festivos del mes son los MISMOS para
// todas las columnas: es el mismo calendario. Sumar los contadores cuenta el
// mismo festivo tantas veces como columnas lo hayan registrado.
//
// Incidencia 2026-09-28 (MARCET FERNÁNDEZ, septiembre): centro con cómputo
// "Total mensual pactado" y excepción "Festivos restan cómputo horas", con una
// sola jornada festiva de 2 h (viernes 11) y una columna de suplente.
//
//   camino A (carga normal → añadir suplente)   titular 2 + suplente 2 = 4 h  ✘
//   camino B (resetear → añadir suplente)       titular 0 + suplente 2 = 2 h  ✔
//
// El divisor del prorrateo salía 28 h en vez de 26 (13 días × 2 h), la proporción
// bajaba de 17,90 a 16,62 €/h y la factura de 429,60 a 398,91 €: se facturaba de
// menos. Y el resultado dependía del camino recorrido por la interfaz.
//
// Tomando el máximo en vez de la suma, los dos caminos convergen en las 2 h
// reales. Además absorbe el defecto de que el contador del titular salga a 0 en
// algunos caminos (queda anotado aparte).
//
// Límite conocido: si un mismo titular tuviera dos suplentes distintos en el mes,
// el agregado de suplentes valdría el doble y el máximo se quedaría con él. No se
// da en ningún centro conocido. La solución definitiva sería calcular las horas
// teóricas del mes desde el horario del centro, sin contadores por columna.
// Ver documentacion/LOGICA_HORAS_FESTIVAS.md.

export const horasFestivasDelMes = (festivasTitulares, festivasSuplentes) => {
    const numero = (valor) => {
        const n = Number(valor);
        return Number.isFinite(n) ? n : 0;
    };
    return Math.max(numero(festivasTitulares), numero(festivasSuplentes));
};
