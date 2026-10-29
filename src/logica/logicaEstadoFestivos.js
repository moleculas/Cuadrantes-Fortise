// Saber si un día del mes es festivo cuando se está construyendo una columna
// del cuadrante.
//
// La fuente normal es `stateFestivo`, el objeto de Redux con una entrada
// `estadoFestivoDia<N>` por cada día del mes. Pero el reseteo de un cuadrante lo
// deja VACÍO (`setStateFestivoAccion({})`) y lo repuebla un instante después, y
// las columnas que se calculan dentro de esa ventana no veían ningún festivo:
// el día festivo se contaba como hora de baja del titular, el divisor del
// prorrateo salía inflado y el mensual pactado se facturaba de menos
// (incidencia GRG NOTARIOS ASOCIADOS, 2026-10-29).
//
// La regla: si el estado está disponible manda el estado; si todavía no ha
// llegado, se calcula el festivo en vez de darlo por no festivo.

export const stateFestivoDisponible = (stateFestivo) =>
    !!stateFestivo && typeof stateFestivo === 'object' && Object.keys(stateFestivo).length > 0;

export const esDiaFestivo = (stateFestivo, dia, calcularRespaldo) => {
    if (stateFestivoDisponible(stateFestivo)) {
        return !!stateFestivo['estadoFestivoDia' + dia];
    };
    return typeof calcularRespaldo === 'function' ? !!calcularRespaldo(dia) : false;
};
