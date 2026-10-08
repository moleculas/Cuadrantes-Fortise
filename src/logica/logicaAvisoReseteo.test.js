import { documentoEmitido, descripcionReseteoCuadrante } from './logicaAvisoReseteo';

const TEXTO_BASE = "Para volver el cuadrante a sus valores iniciales pulsa 'De acuerdo', de lo contrario pulsa 'No'.";

describe('documentoEmitido', () => {

    test('REGRESIÓN caso SOLANA PÉREZ: recibo emitido', () => {
        expect(documentoEmitido({ valor: 'si', numR: 4058, numF: null }))
            .toEqual({ tipo: 'el recibo', numero: 4058 });
    });

    test('factura emitida', () => {
        expect(documentoEmitido({ valor: 'si', numR: null, numF: 1441 }))
            .toEqual({ tipo: 'la factura', numero: 1441 });
    });

    test('la factura manda si por lo que fuera hubiera los dos', () => {
        expect(documentoEmitido({ valor: 'si', numR: 4058, numF: 1441 }).tipo).toBe('la factura');
    });

    test('cuadrante sin documento emitido → null', () => {
        expect(documentoEmitido({ valor: 'no', numR: null, numF: null })).toBeNull();
        expect(documentoEmitido({ valor: 'no', numR: '', numF: '' })).toBeNull();
    });

    test('procesado ausente o basura → null', () => {
        expect(documentoEmitido(null)).toBeNull();
        expect(documentoEmitido(undefined)).toBeNull();
        expect(documentoEmitido({})).toBeNull();
        expect(documentoEmitido('x')).toBeNull();
    });

    test('el número cero se considera documento emitido', () => {
        expect(documentoEmitido({ numR: 0, numF: null })).toEqual({ tipo: 'el recibo', numero: 0 });
    });
});

describe('descripcionReseteoCuadrante', () => {

    test('CONTRATO: sin documento emitido, el texto de siempre, sin cambios', () => {
        expect(descripcionReseteoCuadrante({ valor: 'no', numR: null, numF: null })).toBe(TEXTO_BASE);
        expect(descripcionReseteoCuadrante(null)).toBe(TEXTO_BASE);
        expect(descripcionReseteoCuadrante(undefined)).toBe(TEXTO_BASE);
    });

    test('con recibo emitido: avisa del número y conserva las instrucciones', () => {
        const texto = descripcionReseteoCuadrante({ valor: 'si', numR: 4058, numF: null });
        expect(texto).toContain('el recibo nº 4058');
        expect(texto).toContain('se perderá ese número');
        expect(texto).toContain('Factusol');
        expect(texto).toContain(TEXTO_BASE);
    });

    test('con factura emitida: avisa del número', () => {
        const texto = descripcionReseteoCuadrante({ valor: 'si', numR: null, numF: 1441 });
        expect(texto).toContain('la factura nº 1441');
        expect(texto).toContain(TEXTO_BASE);
    });
});
