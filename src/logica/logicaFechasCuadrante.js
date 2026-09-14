// Mes y año de un cuadrante: la única fuente de verdad para fechar documentos.
//
// Regla (14 de septiembre de 2026, incidencia factura 001535 POINT FIRE):
//
//   La fecha de un documento sale del cuadrante, nunca del estado de la interfaz.
//
// Contexto: los lotes de facturación (FAC/LFA para Factusol y PDF por mail)
// tomaban anyo/mes de `calendarioAGestionar` (el selector "Mes a gestionar").
// Ese selector se reinicia al mes actual al montar /cuadrantes y puede quedar
// desajustado respecto a la lista que se ve en pantalla. Resultado real: las
// facturas de agosto de 2026, generadas el 7 de septiembre, salieron con fecha
// 30/9/2026 y vencimiento un mes tarde.
//
// Cada cuadrante lleva su mes en `nombre` = "AÑO-MES-IDCENTRO" (p. ej.
// "2026-8-295"). El envío individual y las remesas ya lo usaban; los lotes no.
// Ver documentacion/LOGICA_FECHA_DOCUMENTOS.md.

const parseAnyoMes = (parteAnyo, parteMes) => {
    const anyo = parseInt(parteAnyo, 10);
    const mes = parseInt(parteMes, 10);
    if (!Number.isInteger(anyo) || !Number.isInteger(mes)) return null;
    if (anyo < 2000 || mes < 1 || mes > 12) return null;
    return { anyo, mes };
};

// "AÑO-MES-IDCENTRO" → { anyo, mes } · null si el nombre no es válido.
// Un nombre que no parsea es un dato corrupto: el llamador debe fallar de
// forma visible, no caer a otra fuente.
export const anyoMesDeCuadrante = (nombre) => {
    if (typeof nombre !== 'string') return null;
    const partes = nombre.split('-');
    if (partes.length < 3) return null;
    return parseAnyoMes(partes[0], partes[1]);
};

// "AÑO-MES" (formato de calendarioAGestionar) → { anyo, mes } · null si no es válido.
export const anyoMesDeCalendario = (calendarioAGestionar) => {
    if (typeof calendarioAGestionar !== 'string') return null;
    const partes = calendarioAGestionar.split('-');
    if (partes.length < 2) return null;
    return parseAnyoMes(partes[0], partes[1]);
};

// Último día del mes (mes 1-12).
export const ultimoDiaDelMes = (anyo, mes) => new Date(anyo, mes, 0).getDate();

// Fecha de emisión tal como la imprimen el FAC y la cabecera del PDF: "31/8/2026"
// (sin relleno de ceros: es el formato histórico que espera Factusol).
export const fechaEmisionTexto = (anyo, mes) => `${ultimoDiaDelMes(anyo, mes)}/${mes}/${anyo}`;

// Cuadrantes de un lote que NO pertenecen al mes que muestra la pantalla.
// Las listas se cargan por mes, así que si hay alguno es que la pantalla está
// desajustada: hay que bloquear el lote y pedir que se vuelva a seleccionar el
// mes. Si el calendario no parsea, se devuelven todos (bloqueo total).
export const cuadrantesFueraDeMes = (arrayCuadrantes, calendarioAGestionar) => {
    if (!Array.isArray(arrayCuadrantes)) return [];
    const referencia = anyoMesDeCalendario(calendarioAGestionar);
    if (!referencia) return [...arrayCuadrantes];
    return arrayCuadrantes.filter(cuadrante => {
        const propio = anyoMesDeCuadrante(cuadrante?.nombre);
        return !propio || propio.anyo !== referencia.anyo || propio.mes !== referencia.mes;
    });
};

// Texto del aviso bloqueante cuando la guarda detecta cuadrantes fuera de mes.
export const mensajeCuadrantesFueraDeMes = (fueraDeMes, calendarioAGestionar) => {
    const n = fueraDeMes.length;
    const ejemplo = fueraDeMes[0];
    const centro = ejemplo?.total?.nombreCentro || ejemplo?.nombreCentro || 'centro desconocido';
    return `No se puede generar el lote: ${n} cuadrante${n === 1 ? '' : 's'} no ${n === 1 ? 'pertenece' : 'pertenecen'} al mes seleccionado (${calendarioAGestionar || 'sin mes'}). ` +
        `Ejemplo: ${centro} (${ejemplo?.nombre || 'sin nombre'}). ` +
        `Vuelve a seleccionar el mes en "Mes a gestionar" y repite la operación.`;
};
