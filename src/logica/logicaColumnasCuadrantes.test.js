import { periodoBajaTrabajadorAccion } from './logicaColumnasCuadrantes';

// periodoBajaTrabajadorAccion(calendarioAGestionar, inicioBaja, finBaja, diasMes)
// -> devuelve el array de días del mes GESTIONADO que quedan cubiertos por la baja.
//
// Formatos (confirmados en el código):
//   calendarioAGestionar: "YYYY-M"     (p.ej. "2026-7")
//   inicioBaja / finBaja: "YYYY-M-D"   (p.ej. "2026-8-1"); finBaja puede ser null (baja abierta)
//   diasMes: número de días del mes gestionado (losDiasDelMes.length)
//
// Helper para expresar rangos esperados de forma legible.
const rango = (desde, hasta) =>
    Array.from({ length: hasta - desde + 1 }, (_, i) => i + desde);

describe('periodoBajaTrabajadorAccion — acotación de la baja al mes gestionado', () => {

    // ------------------------------------------------------------------
    // CONTRATO: comportamiento que YA funciona y NO debe romperse.
    // Estos casos deben estar verdes tanto antes como después del fix.
    // ------------------------------------------------------------------
    describe('contrato (comportamiento actual que no debe romperse)', () => {

        test('baja abierta que empieza a mitad del mes gestionado → desde ese día hasta fin de mes', () => {
            expect(periodoBajaTrabajadorAccion('2026-7', '2026-7-10', null, 31)).toEqual(rango(10, 31));
        });

        test('baja abierta que viene de un mes anterior → todo el mes gestionado', () => {
            expect(periodoBajaTrabajadorAccion('2026-7', '2026-6-20', null, 31)).toEqual(rango(1, 31));
        });

        test('baja que empieza y termina dentro del mes gestionado → solo esos días', () => {
            expect(periodoBajaTrabajadorAccion('2026-7', '2026-7-5', '2026-7-12', 31)).toEqual(rango(5, 12));
        });

        test('baja que viene de un mes anterior y termina dentro del gestionado → desde el 1 hasta el fin real', () => {
            expect(periodoBajaTrabajadorAccion('2026-7', '2026-6-20', '2026-7-8', 31)).toEqual(rango(1, 8));
        });

        test('baja que empieza dentro y termina en un mes posterior → desde su inicio hasta fin de mes', () => {
            expect(periodoBajaTrabajadorAccion('2026-7', '2026-7-20', '2026-9-3', 31)).toEqual(rango(20, 31));
        });

        test('cambio de año: baja que cruza desde diciembre a enero → días correctos en enero', () => {
            expect(periodoBajaTrabajadorAccion('2027-1', '2026-12-20', '2027-1-10', 31)).toEqual(rango(1, 10));
        });

        test('cambio de año: baja abierta que viene de noviembre → todo enero', () => {
            expect(periodoBajaTrabajadorAccion('2027-1', '2026-11-1', null, 31)).toEqual(rango(1, 31));
        });
    });

    // ------------------------------------------------------------------
    // BUG reportado (cliente): una baja cuyo inicio cae en un mes POSTERIOR
    // al gestionado no debe marcar ningún día. Antes del fix, estos fallan.
    // ------------------------------------------------------------------
    describe('bug: la baja no debe afectar a meses anteriores a su inicio', () => {

        test('baja CIA abierta que empieza el 1 de agosto NO marca ningún día de julio', () => {
            // Caso exacto reportado por el cliente.
            expect(periodoBajaTrabajadorAccion('2026-7', '2026-8-1', null, 31)).toEqual([]);
        });

        test('baja futura acotada (agosto) no marca ningún día de julio', () => {
            expect(periodoBajaTrabajadorAccion('2026-7', '2026-8-1', '2026-8-20', 31)).toEqual([]);
        });

        test('cambio de año: baja que empieza en enero del año siguiente no marca días de diciembre', () => {
            expect(periodoBajaTrabajadorAccion('2026-12', '2027-1-5', null, 31)).toEqual([]);
        });
    });

    // ------------------------------------------------------------------
    // Caso hermano latente: una baja ya terminada en un mes ANTERIOR
    // tampoco debe marcar días del mes gestionado.
    // ------------------------------------------------------------------
    describe('baja ya finalizada antes del mes gestionado', () => {

        test('baja que terminó en junio no marca ningún día de julio', () => {
            expect(periodoBajaTrabajadorAccion('2026-7', '2026-5-1', '2026-6-15', 31)).toEqual([]);
        });
    });
});
