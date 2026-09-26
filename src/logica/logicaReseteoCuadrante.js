// Mensaje de las horas retiradas del control horario al resetear un cuadrante.
//
// Contexto: "Resetear Cuadrante" borra el cuadrante de la base de datos. Hasta
// 2026-09-26 no retiraba las horas que ese cuadrante había apuntado en el
// control horario (tabla horas_trabajadores), y quedaban como horas fantasma:
// visibles en el control horario, inexistentes en cualquier cuadrante.
// Incidencia: C.P. Copérnico 15-1, agosto 2026, 11,5 h de una suplente.
//
// Ahora las retira el backend (eliminarCuadrante en funciones.php), que devuelve
// el resumen de lo retirado. Aquí solo se compone el aviso para el usuario.
// Ver documentacion/LOGICA_RESETEO_CUADRANTE.md.

// Formato español: 80.5 → "80,5" · 45 → "45"
const formatoHoras = (horas) => {
    const n = Number(horas);
    if (!Number.isFinite(n)) return '0';
    return (Math.round(n * 100) / 100).toString().replace('.', ',');
};

// Nombres de los trabajadores afectados, como texto legible.
// Máximo 3; a partir de ahí, "y N más".
const listaTrabajadores = (horasRetiradas) => {
    const nombres = horasRetiradas
        .map(item => item && item.trabajador ? `${item.trabajador} (${formatoHoras(item.horas)} h)` : null)
        .filter(Boolean);
    if (nombres.length === 0) return '';
    if (nombres.length <= 3) return nombres.join(', ');
    return `${nombres.slice(0, 3).join(', ')} y ${nombres.length - 3} más`;
};

// Devuelve el aviso, o null si no hay nada que avisar.
//   - respuesta sin datos (backend antiguo aún sin desplegar) → null
//   - reseteo sin horas apuntadas → null (basta el "reseteado correctamente" de siempre)
export const mensajeHorasRetiradas = (resultado) => {
    if (!resultado || typeof resultado !== 'object') return null;
    const total = Number(resultado.totalHoras);
    if (!Number.isFinite(total) || total <= 0) return null;
    const retiradas = Array.isArray(resultado.horasRetiradas) ? resultado.horasRetiradas : [];
    const cuantos = retiradas.length;
    const sujeto = cuantos === 1 ? '1 trabajador' : `${cuantos} trabajadores`;
    const detalle = listaTrabajadores(retiradas);
    return `Cuadrante reseteado. Se han retirado del control horario ${formatoHoras(total)} h de ${sujeto}` +
        (detalle ? `: ${detalle}.` : '.');
};
