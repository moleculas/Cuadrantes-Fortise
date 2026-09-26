import { hayImporteCalculado, textoImporteTotal, TEXTO_SIN_IMPORTE } from './logicaImporteCuadrante';

describe('hayImporteCalculado', () => {

    test('números válidos, incluido el cero', () => {
        expect(hayImporteCalculado(2297.9)).toBe(true);
        expect(hayImporteCalculado(0)).toBe(true);
        expect(hayImporteCalculado('125.5')).toBe(true);
    });

    test('ausente o no numérico → false', () => {
        expect(hayImporteCalculado(null)).toBe(false);
        expect(hayImporteCalculado(undefined)).toBe(false);
        expect(hayImporteCalculado('')).toBe(false);
        expect(hayImporteCalculado(NaN)).toBe(false);
        expect(hayImporteCalculado('pendiente')).toBe(false);
    });
});

describe('textoImporteTotal', () => {

    test('CONTRATO: con importe se comporta exactamente como antes', () => {
        expect(textoImporteTotal(2297.9, 0)).toBe('2297.90 €');
        expect(textoImporteTotal(500.53, 308.39)).toBe('808.92 €');
        expect(textoImporteTotal(1473.95)).toBe('1473.95 €');
    });

    test('REGRESIÓN: sin importe ya no sale "NaN €"', () => {
        expect(textoImporteTotal(null, 0)).toBe(TEXTO_SIN_IMPORTE);
        expect(textoImporteTotal(undefined, 0)).toBe(TEXTO_SIN_IMPORTE);
        expect(textoImporteTotal(NaN, 0)).toBe(TEXTO_SIN_IMPORTE);
        expect(textoImporteTotal(undefined, 125.5)).toBe(TEXTO_SIN_IMPORTE);
        expect(textoImporteTotal(null)).not.toContain('NaN');
    });

    test('importe cero es un importe válido, no "pendiente"', () => {
        expect(textoImporteTotal(0, 0)).toBe('0.00 €');
    });

    test('servicios fijos ausentes o inválidos no rompen el importe', () => {
        expect(textoImporteTotal(100, null)).toBe('100.00 €');
        expect(textoImporteTotal(100, undefined)).toBe('100.00 €');
        expect(textoImporteTotal(100, NaN)).toBe('100.00 €');
    });

    test('redondeo a dos decimales', () => {
        expect(textoImporteTotal(27.999999999999996)).toBe('28.00 €');
        expect(textoImporteTotal(18.314, 0)).toBe('18.31 €');
    });
});
