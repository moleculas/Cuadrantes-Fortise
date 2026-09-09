import {
    esCentroDeBajaPorId,
    esOpcionCentroDeBaja,
    opcionCentroDeshabilitada
} from './logicaCentrosDeBaja';

// Listado general de centros tal como llega de listar.php
const listadoCentros = [
    { id: 295, nombre: 'AAF MAS DCA, S.L.', estado: 'alta' },
    { id: 301, nombre: 'ANQUOR CORPORATE FINANCE, S.L.U.', estado: 'baja' },
    { id: 412, nombre: 'ALFA PRINTING, S.L.', estado: 'alta' }
];

describe('esCentroDeBajaPorId', () => {

    test('centro de baja → true', () => {
        expect(esCentroDeBajaPorId(301, listadoCentros)).toBe(true);
    });

    test('centro de alta → false', () => {
        expect(esCentroDeBajaPorId(295, listadoCentros)).toBe(false);
    });

    test('id como string (viene así de los cuadrantes) → compara igual', () => {
        expect(esCentroDeBajaPorId('301', listadoCentros)).toBe(true);
        expect(esCentroDeBajaPorId('295', listadoCentros)).toBe(false);
    });

    test('id que no está en el listado → false', () => {
        expect(esCentroDeBajaPorId(999, listadoCentros)).toBe(false);
    });

    test('listado vacío o no cargado todavía → false (no bloquea nada)', () => {
        expect(esCentroDeBajaPorId(301, [])).toBe(false);
        expect(esCentroDeBajaPorId(301, null)).toBe(false);
        expect(esCentroDeBajaPorId(301, undefined)).toBe(false);
    });

    test('id nulo o vacío → false', () => {
        expect(esCentroDeBajaPorId(null, listadoCentros)).toBe(false);
        expect(esCentroDeBajaPorId('', listadoCentros)).toBe(false);
    });
});

describe('esOpcionCentroDeBaja', () => {

    test('la opción trae su propio estado de baja → true sin mirar el listado', () => {
        expect(esOpcionCentroDeBaja({ id: 777, estado: 'baja' }, [])).toBe(true);
    });

    test('la opción no trae estado → se resuelve por el listado', () => {
        expect(esOpcionCentroDeBaja({ id: 301, nombre: 'ANQUOR' }, listadoCentros)).toBe(true);
        expect(esOpcionCentroDeBaja({ id: 295, nombre: 'AAF MAS DCA' }, listadoCentros)).toBe(false);
    });

    test('opción inexistente → false', () => {
        expect(esOpcionCentroDeBaja(null, listadoCentros)).toBe(false);
        expect(esOpcionCentroDeBaja(undefined, listadoCentros)).toBe(false);
    });
});

describe('opcionCentroDeshabilitada — desplegable "Centro" del editor', () => {

    test('centro de baja NO seleccionado → deshabilitado (no se pueden crear cuadrantes nuevos)', () => {
        expect(opcionCentroDeshabilitada({ id: 301 }, listadoCentros, 295)).toBe(true);
    });

    test('centro de baja YA seleccionado → habilitado (hay que poder abrir su último cuadrante)', () => {
        expect(opcionCentroDeshabilitada({ id: 301 }, listadoCentros, 301)).toBe(false);
    });

    test('centro de baja ya seleccionado con id string → habilitado igualmente', () => {
        expect(opcionCentroDeshabilitada({ id: 301 }, listadoCentros, '301')).toBe(false);
    });

    test('centro de alta → nunca deshabilitado', () => {
        expect(opcionCentroDeshabilitada({ id: 295 }, listadoCentros, null)).toBe(false);
        expect(opcionCentroDeshabilitada({ id: 412 }, listadoCentros, 295)).toBe(false);
    });

    test('sin centro seleccionado todavía → el de baja sigue deshabilitado', () => {
        expect(opcionCentroDeshabilitada({ id: 301 }, listadoCentros, '')).toBe(true);
        expect(opcionCentroDeshabilitada({ id: 301 }, listadoCentros, null)).toBe(true);
    });

    test('listado de centros aún no cargado → no deshabilita nada', () => {
        expect(opcionCentroDeshabilitada({ id: 301 }, [], null)).toBe(false);
    });
});
