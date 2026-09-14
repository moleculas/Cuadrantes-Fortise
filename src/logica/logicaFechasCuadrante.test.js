import {
    anyoMesDeCuadrante,
    anyoMesDeCalendario,
    ultimoDiaDelMes,
    fechaEmisionTexto,
    cuadrantesFueraDeMes
} from './logicaFechasCuadrante';
import { calcularFechaVencimiento, formatoDDMMYYYY } from './logicaVencimientos';

const formasDePago = [
    { value: 'RE', label: 'Recibo domiciliado', dias: 3 },
    { value: 'R1', label: 'Recibo domiciliado a 30 días', dias: 30 }
];

describe('anyoMesDeCuadrante — "AÑO-MES-IDCENTRO"', () => {

    test('nombre normal → { anyo, mes } numéricos', () => {
        expect(anyoMesDeCuadrante('2026-8-295')).toEqual({ anyo: 2026, mes: 8 });
    });

    test('mes de dos cifras', () => {
        expect(anyoMesDeCuadrante('2026-12-1')).toEqual({ anyo: 2026, mes: 12 });
    });

    test('solo "AÑO-MES" (formato del selector, sin centro) → null: no es nombre de cuadrante', () => {
        expect(anyoMesDeCuadrante('2026-9')).toBeNull();
    });

    test('mes fuera de rango → null', () => {
        expect(anyoMesDeCuadrante('2026-13-295')).toBeNull();
        expect(anyoMesDeCuadrante('2026-0-295')).toBeNull();
    });

    test('basura, vacío, null, undefined, número → null', () => {
        expect(anyoMesDeCuadrante('cuadrante')).toBeNull();
        expect(anyoMesDeCuadrante('')).toBeNull();
        expect(anyoMesDeCuadrante(null)).toBeNull();
        expect(anyoMesDeCuadrante(undefined)).toBeNull();
        expect(anyoMesDeCuadrante(20268295)).toBeNull();
    });
});

describe('anyoMesDeCalendario — "AÑO-MES" (calendarioAGestionar)', () => {

    test('selector normal', () => {
        expect(anyoMesDeCalendario('2026-9')).toEqual({ anyo: 2026, mes: 9 });
    });

    test('también acepta un nombre de cuadrante completo (ignora el resto)', () => {
        expect(anyoMesDeCalendario('2026-8-295')).toEqual({ anyo: 2026, mes: 8 });
    });

    test('vacío (estado inicial del store) → null', () => {
        expect(anyoMesDeCalendario('')).toBeNull();
        expect(anyoMesDeCalendario(null)).toBeNull();
    });
});

describe('ultimoDiaDelMes / fechaEmisionTexto', () => {

    test('agosto tiene 31, septiembre 30', () => {
        expect(ultimoDiaDelMes(2026, 8)).toBe(31);
        expect(ultimoDiaDelMes(2026, 9)).toBe(30);
    });

    test('febrero bisiesto y no bisiesto', () => {
        expect(ultimoDiaDelMes(2024, 2)).toBe(29);
        expect(ultimoDiaDelMes(2026, 2)).toBe(28);
    });

    test('formato histórico sin ceros: "31/8/2026"', () => {
        expect(fechaEmisionTexto(2026, 8)).toBe('31/8/2026');
        expect(fechaEmisionTexto(2026, 12)).toBe('31/12/2026');
    });
});

describe('cuadrantesFueraDeMes — guarda de mes cruzado en los lotes', () => {

    const lote = [
        { id: 1, nombre: '2026-8-295', total: { nombreCentro: 'AAF MAS DCA' } },
        { id: 2, nombre: '2026-8-533', total: { nombreCentro: 'POINT FIRE' } },
        { id: 3, nombre: '2026-8-301', total: { nombreCentro: 'ANQUOR' } }
    ];

    test('todos del mes de pantalla → nada fuera', () => {
        expect(cuadrantesFueraDeMes(lote, '2026-8')).toEqual([]);
    });

    test('pantalla en septiembre con lista de agosto (el caso real) → todos fuera', () => {
        expect(cuadrantesFueraDeMes(lote, '2026-9').map(c => c.id)).toEqual([1, 2, 3]);
    });

    test('un solo cuadrante de otro mes → solo ese', () => {
        const mixto = [...lote, { id: 4, nombre: '2026-7-100', total: { nombreCentro: 'OTRO' } }];
        expect(cuadrantesFueraDeMes(mixto, '2026-8').map(c => c.id)).toEqual([4]);
    });

    test('mismo mes de otro año → fuera', () => {
        expect(cuadrantesFueraDeMes([{ id: 9, nombre: '2025-8-295' }], '2026-8').map(c => c.id)).toEqual([9]);
    });

    test('cuadrante con nombre corrupto → fuera (bloquea, no se cuela)', () => {
        expect(cuadrantesFueraDeMes([{ id: 5, nombre: 'sin-formato' }], '2026-8').map(c => c.id)).toEqual([5]);
    });

    test('selector vacío o inválido → todos fuera (bloqueo total)', () => {
        expect(cuadrantesFueraDeMes(lote, '').length).toBe(3);
        expect(cuadrantesFueraDeMes(lote, null).length).toBe(3);
    });

    test('lote vacío o no array → []', () => {
        expect(cuadrantesFueraDeMes([], '2026-8')).toEqual([]);
        expect(cuadrantesFueraDeMes(null, '2026-8')).toEqual([]);
    });
});

describe('REGRESIÓN factura 001535 · POINT FIRE · cuadrante 2026-8, R1, día de pago 5', () => {

    const cuadrante = { nombre: '2026-8-533', total: { formaPago: 'R1', diaPago: '5' } };
    const selectorDesajustado = '2026-9';   // lo que había en pantalla el 7-sep-2026

    test('con el mes DEL CUADRANTE: fecha 31/8/2026 y vencimiento 05-10-2026 (lo correcto)', () => {
        const { anyo, mes } = anyoMesDeCuadrante(cuadrante.nombre);
        expect(fechaEmisionTexto(anyo, mes)).toBe('31/8/2026');
        const vto = calcularFechaVencimiento(cuadrante.total.diaPago, mes, anyo, cuadrante.total.formaPago, formasDePago);
        expect(formatoDDMMYYYY(vto)).toBe('05-10-2026');
    });

    test('con el mes DEL SELECTOR se reproduce exactamente el PDF defectuoso: 30/9/2026 y 05-11-2026', () => {
        const { anyo, mes } = anyoMesDeCalendario(selectorDesajustado);
        expect(fechaEmisionTexto(anyo, mes)).toBe('30/9/2026');
        const vto = calcularFechaVencimiento(cuadrante.total.diaPago, mes, anyo, cuadrante.total.formaPago, formasDePago);
        expect(formatoDDMMYYYY(vto)).toBe('05-11-2026');
    });

    test('la guarda habría bloqueado ese lote', () => {
        expect(cuadrantesFueraDeMes([cuadrante], selectorDesajustado)).toHaveLength(1);
    });
});

describe('mensajeCuadrantesFueraDeMes', () => {
    const { mensajeCuadrantesFueraDeMes } = require('./logicaFechasCuadrante');

    test('singular, con centro y nombre del ejemplo', () => {
        const msg = mensajeCuadrantesFueraDeMes([{ nombre: '2026-8-533', total: { nombreCentro: 'POINT FIRE' } }], '2026-9');
        expect(msg).toContain('1 cuadrante no pertenece al mes seleccionado (2026-9)');
        expect(msg).toContain('POINT FIRE (2026-8-533)');
        expect(msg).toContain('Mes a gestionar');
    });

    test('plural', () => {
        const msg = mensajeCuadrantesFueraDeMes([{ nombre: '2026-8-1', total: { nombreCentro: 'A' } }, { nombre: '2026-8-2', total: { nombreCentro: 'B' } }], '2026-9');
        expect(msg).toContain('2 cuadrantes no pertenecen');
    });
});
