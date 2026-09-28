import { horasFestivasDelMes } from './logicaHorasFestivas';

describe('horasFestivasDelMes — REGRESIÓN caso MARCET (2026-09-28)', () => {

    test('camino A: las dos columnas registran el festivo → 2 h, no 4', () => {
        expect(horasFestivasDelMes(2, 2)).toBe(2);
    });

    test('camino B: solo el suplente lo registra → 2 h', () => {
        expect(horasFestivasDelMes(0, 2)).toBe(2);
    });

    test('los dos caminos dan el mismo divisor y la misma factura', () => {
        const normalTitular = 18, bajasTitular = 6, mensualPactado = 465.40, horasTrabajadas = 24;
        const divisorA = normalTitular + bajasTitular + horasFestivasDelMes(2, 2);
        const divisorB = normalTitular + bajasTitular + horasFestivasDelMes(0, 2);
        expect(divisorA).toBe(26);
        expect(divisorB).toBe(26);
        expect(divisorA).toBe(divisorB);
        expect(horasTrabajadas * (mensualPactado / divisorA)).toBeCloseTo(429.60, 2);
    });

    test('lo que daba antes (4 h → divisor 28 → 398,91 €) queda descartado', () => {
        expect(horasFestivasDelMes(2, 2)).not.toBe(4);
    });
});

describe('horasFestivasDelMes — CONTRATO: casos que no deben cambiar', () => {

    test('sin suplente: manda el titular', () => {
        expect(horasFestivasDelMes(2, 0)).toBe(2);
        expect(horasFestivasDelMes(7.5, 0)).toBe(7.5);
    });

    test('mes sin festivos → 0', () => {
        expect(horasFestivasDelMes(0, 0)).toBe(0);
    });

    test('varias jornadas festivas en el mes', () => {
        expect(horasFestivasDelMes(6, 6)).toBe(6);
        expect(horasFestivasDelMes(0, 6)).toBe(6);
    });

    test('el titular registra más que el suplente (cubre solo parte del mes)', () => {
        expect(horasFestivasDelMes(6, 2)).toBe(6);
    });
});

describe('horasFestivasDelMes — datos ausentes o basura', () => {

    test('null, undefined, NaN y cadenas se tratan como cero', () => {
        expect(horasFestivasDelMes(null, 2)).toBe(2);
        expect(horasFestivasDelMes(undefined, 2)).toBe(2);
        expect(horasFestivasDelMes(NaN, 2)).toBe(2);
        expect(horasFestivasDelMes('basura', 2)).toBe(2);
        expect(horasFestivasDelMes(undefined, undefined)).toBe(0);
    });

    test('números en texto', () => {
        expect(horasFestivasDelMes('2', '2')).toBe(2);
    });
});
