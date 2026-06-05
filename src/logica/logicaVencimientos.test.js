import {
    calcularFechaVencimiento,
    formatoDDMMYYYY,
    formatoYYYYMMDD
} from './logicaVencimientos';
import Constantes from '../constantes';

const formasDePago = Constantes.FORMA_DE_PAGO;

// Casos validados contra ~27 facturas reales de Factusol (octubre 2025).
// Si alguno falla, no tocar el test antes de confirmar con Factusol que la regla cambió.

describe('calcularFechaVencimiento — regla Factusol', () => {

    describe('formas de pago RE (3 días) — patrón validado contra Factusol', () => {
        test('ANCO RE día 28 cuadrante 01/2026 → 28/02/2026', () => {
            const fecha = calcularFechaVencimiento(28, 1, 2026, 'RE', formasDePago);
            expect(formatoDDMMYYYY(fecha)).toBe('28-02-2026');
            expect(formatoYYYYMMDD(fecha)).toBe('2026-02-28');
        });

        test('ANCO RE día 28 cuadrante 02/2026 → 28/03/2026', () => {
            const fecha = calcularFechaVencimiento(28, 2, 2026, 'RE', formasDePago);
            expect(formatoDDMMYYYY(fecha)).toBe('28-03-2026');
        });

        test('C.P. MUNTANER RE día 10 cuadrante 01/2026 → 10/02/2026', () => {
            const fecha = calcularFechaVencimiento(10, 1, 2026, 'RE', formasDePago);
            expect(formatoDDMMYYYY(fecha)).toBe('10-02-2026');
            expect(formatoYYYYMMDD(fecha)).toBe('2026-02-10');
        });

        test('C.P. SÓCRATES RE día 15 cuadrante 03/2026 → 15/04/2026', () => {
            const fecha = calcularFechaVencimiento(15, 3, 2026, 'RE', formasDePago);
            expect(formatoDDMMYYYY(fecha)).toBe('15-04-2026');
            expect(formatoYYYYMMDD(fecha)).toBe('2026-04-15');
        });

        test('ASSEMBLEA RE día 25 cuadrante 05/2026 → 25/06/2026', () => {
            const fecha = calcularFechaVencimiento(25, 5, 2026, 'RE', formasDePago);
            expect(formatoDDMMYYYY(fecha)).toBe('25-06-2026');
            expect(formatoYYYYMMDD(fecha)).toBe('2026-06-25');
        });
    });

    describe('formas de pago aplazadas', () => {
        test('R1 día 10 cuadrante 01/2026 → 10/03/2026 (hipotético blueprint)', () => {
            const fecha = calcularFechaVencimiento(10, 1, 2026, 'R1', formasDePago);
            expect(formatoYYYYMMDD(fecha)).toBe('2026-03-10');
        });

        test('R2 día 10 cuadrante 01/2026 → +60 días desde fin de enero', () => {
            // 31-ene-2026 + 60 días = 1-abr-2026 → primer día 10 ≥ 1-abr = 10-abr-2026
            const fecha = calcularFechaVencimiento(10, 1, 2026, 'R2', formasDePago);
            expect(formatoYYYYMMDD(fecha)).toBe('2026-04-10');
        });

        test('R3 día 10 cuadrante 01/2026 → +90 días desde fin de enero', () => {
            // 31-ene-2026 + 90 días = 1-may-2026 → primer día 10 ≥ 1-may = 10-may-2026
            const fecha = calcularFechaVencimiento(10, 1, 2026, 'R3', formasDePago);
            expect(formatoYYYYMMDD(fecha)).toBe('2026-05-10');
        });
    });

    describe('casos límite', () => {
        test('día de pago coincide con fecha base → vencimiento ese mismo día', () => {
            // RE (3 días): 31-ene + 3 = 3-feb. Día de pago 3 → 3-feb.
            const fecha = calcularFechaVencimiento(3, 1, 2026, 'RE', formasDePago);
            expect(formatoYYYYMMDD(fecha)).toBe('2026-02-03');
        });

        test('día de pago anterior a la fecha base en su mes → salta al siguiente', () => {
            // RE (3 días): 31-ene + 3 = 3-feb. Día de pago 2 (anterior a 3) → salta a 2-mar.
            const fecha = calcularFechaVencimiento(2, 1, 2026, 'RE', formasDePago);
            expect(formatoYYYYMMDD(fecha)).toBe('2026-03-02');
        });

        test('día de pago 31 con mes resultante de 30 días → JS normaliza al 1 del siguiente', () => {
            // RE (3 días) cuadrante 03/2026: 31-mar + 3 = 3-abr. Día 31 en abril → JS devuelve 1-may.
            // Comportamiento conocido y consistente.
            const fecha = calcularFechaVencimiento(31, 3, 2026, 'RE', formasDePago);
            expect(formatoYYYYMMDD(fecha)).toBe('2026-05-01');
        });

        test('sin día de pago (null) → vencimiento = fecha base', () => {
            // RE (3 días): 31-ene + 3 = 3-feb.
            const fecha = calcularFechaVencimiento(null, 1, 2026, 'RE', formasDePago);
            expect(formatoYYYYMMDD(fecha)).toBe('2026-02-03');
        });

        test('sin día de pago (cadena vacía) → vencimiento = fecha base', () => {
            const fecha = calcularFechaVencimiento('', 1, 2026, 'RE', formasDePago);
            expect(formatoYYYYMMDD(fecha)).toBe('2026-02-03');
        });

        test('día de pago como string numérico → se interpreta como número', () => {
            const fecha = calcularFechaVencimiento('15', 3, 2026, 'RE', formasDePago);
            expect(formatoYYYYMMDD(fecha)).toBe('2026-04-15');
        });

        test('febrero año no bisiesto → emisión 28/02', () => {
            // RE día 5 cuadrante 02/2026: 28-feb + 3 = 3-mar. Día 5 ≥ 3-mar → 5-mar.
            const fecha = calcularFechaVencimiento(5, 2, 2026, 'RE', formasDePago);
            expect(formatoYYYYMMDD(fecha)).toBe('2026-03-05');
        });

        test('febrero año bisiesto → emisión 29/02', () => {
            // RE día 5 cuadrante 02/2024 (bisiesto): 29-feb + 3 = 3-mar. Día 5 → 5-mar.
            const fecha = calcularFechaVencimiento(5, 2, 2024, 'RE', formasDePago);
            expect(formatoYYYYMMDD(fecha)).toBe('2024-03-05');
        });

        test('cuadrante de diciembre → cambio de año', () => {
            // RE día 10 cuadrante 12/2025: 31-dic + 3 = 3-ene-2026. Día 10 → 10-ene-2026.
            const fecha = calcularFechaVencimiento(10, 12, 2025, 'RE', formasDePago);
            expect(formatoYYYYMMDD(fecha)).toBe('2026-01-10');
        });
    });

    describe('formatos', () => {
        test('formatoDDMMYYYY rellena con ceros', () => {
            expect(formatoDDMMYYYY(new Date(2026, 0, 5))).toBe('05-01-2026');
            expect(formatoDDMMYYYY(new Date(2026, 11, 25))).toBe('25-12-2026');
        });

        test('formatoYYYYMMDD rellena con ceros', () => {
            expect(formatoYYYYMMDD(new Date(2026, 0, 5))).toBe('2026-01-05');
            expect(formatoYYYYMMDD(new Date(2026, 11, 25))).toBe('2026-12-25');
        });
    });
});
