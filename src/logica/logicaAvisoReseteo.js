// Aviso del diálogo de "Resetear Cuadrante" cuando ya hay documento emitido.
//
// Resetear borra el cuadrante y, con él, el número de factura o de recibo que
// tuviera asignado: al recalcular, `procesado` se reinicia a
// { valor:'no', numR:null, numF:null } (logicaGestionCuadrantes.js:1749).
//
// Hasta ahora el diálogo no lo decía. Incidencia 2026-10-09 (SOLANA PÉREZ,
// AGUSTÍN): se cambió la forma de facturar del centro, el cuadrante de
// septiembre se reprocesó y el número del documento anterior desapareció sin
// dejar rastro, de modo que al revisar la base de datos solo constaba el último.
//
// Nota: el botón "Actualizar Cuadrante" ya está deshabilitado cuando el estado
// es 'facturado' (Menu.jsx), así que el reseteo es la única vía por la que se
// pierde el número. Por eso el aviso va solo aquí.
// Ver documentacion/LOGICA_AVISO_RESETEO.md.

const TEXTO_BASE = "Para volver el cuadrante a sus valores iniciales pulsa 'De acuerdo', de lo contrario pulsa 'No'.";

// Documento emitido de un cuadrante, a partir de su objeto `procesado`.
// Devuelve { tipo, numero } o null si no hay ninguno.
export const documentoEmitido = (procesado) => {
    if (!procesado || typeof procesado !== 'object') return null;
    if (procesado.numF !== null && procesado.numF !== undefined && procesado.numF !== '') {
        return { tipo: 'la factura', numero: procesado.numF };
    };
    if (procesado.numR !== null && procesado.numR !== undefined && procesado.numR !== '') {
        return { tipo: 'el recibo', numero: procesado.numR };
    };
    return null;
};

// Descripción del diálogo de reseteo. Si el cuadrante tiene documento emitido,
// se avisa de que se perderá su número; si no, el texto de siempre.
export const descripcionReseteoCuadrante = (procesado) => {
    const documento = documentoEmitido(procesado);
    if (!documento) return TEXTO_BASE;
    return `Atención: este cuadrante tiene emitido ${documento.tipo} nº ${documento.numero}. ` +
        `Al resetearlo se perderá ese número en el programa y habrá que volver a emitir el documento. ` +
        `Si ya se ha enviado al cliente o registrado en Factusol, revísalo antes de continuar. ` +
        TEXTO_BASE;
};
