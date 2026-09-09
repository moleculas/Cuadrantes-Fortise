// Centros dados de baja en la gestión de cuadrantes.
//
// Regla acordada (9 de septiembre de 2026, a raíz de la incidencia ANQUOR):
//
//   Un centro de baja NO genera trabajo nuevo, pero un cuadrante que ya existe
//   es real y se factura con normalidad.
//
// Consecuencias:
//   - No se puede seleccionar un centro de baja en el desplegable "Centro" del
//     editor de cuadrantes. Esa era la puerta por la que se seguían creando
//     cuadrantes de meses posteriores a la baja, mes tras mes, indefinidamente.
//   - El centro de baja que YA está seleccionado sigue disponible en el
//     desplegable, para poder abrir y editar su último cuadrante (el que tiene
//     el resto pendiente de cobrar).
//   - Los cuadrantes existentes se listan y facturan como cualquier otro: solo
//     se señalan con la etiqueta "(Centro de baja)", sin marca de error.
//
// Nota de modelo: un centro solo tiene `estado: 'alta' | 'baja'`, sin fecha de
// baja (a diferencia de los trabajadores, que sí tienen inicio/fin). Por eso la
// decisión se toma por presencia de cuadrante y no por fecha.
// Ver documentacion/LOGICA_CENTROS_DE_BAJA.md.

const ESTADO_BAJA = 'baja';

const mismoId = (idA, idB) =>
    idA !== null && idA !== undefined && idA !== '' &&
    idB !== null && idB !== undefined && idB !== '' &&
    Number(idA) === Number(idB);

// ¿El centro con este id está de baja, según el listado general de centros?
export const esCentroDeBajaPorId = (idCentro, listadoCentros) => {
    if (!Array.isArray(listadoCentros)) return false;
    return listadoCentros.some(centro => centro && mismoId(centro.id, idCentro) && centro.estado === ESTADO_BAJA);
};

// ¿Esta opción del desplegable corresponde a un centro de baja?
// Usa el estado que traiga la propia opción y, si no lo trae, lo busca en el
// listado general (que siempre lo lleva).
export const esOpcionCentroDeBaja = (opcionCentro, listadoCentros) => {
    if (!opcionCentro) return false;
    if (opcionCentro.estado === ESTADO_BAJA) return true;
    return esCentroDeBajaPorId(opcionCentro.id, listadoCentros);
};

// ¿Hay que deshabilitar esta opción del desplegable "Centro"?
// Sí para los centros de baja, salvo el que ya está seleccionado: ese debe
// seguir disponible para poder abrir su cuadrante.
export const opcionCentroDeshabilitada = (opcionCentro, listadoCentros, idCentroSeleccionado) => {
    if (!opcionCentro) return false;
    if (mismoId(opcionCentro.id, idCentroSeleccionado)) return false;
    return esOpcionCentroDeBaja(opcionCentro, listadoCentros);
};
