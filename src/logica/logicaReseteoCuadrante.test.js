import { mensajeHorasRetiradas } from './logicaReseteoCuadrante';

// Respuesta real del backend en la prueba de local (cuadrante 2026-9-26)
const respuestaReal = {
    ok: true,
    horasRetiradas: [
        { trabajadorId: 25, trabajador: 'Azua Baque, Lincoln Assad', tipo: 'trabajador', horas: 45 },
        { trabajadorId: 127, trabajador: 'Bibian Soler, Trini', tipo: 'suplente', horas: 80.5 }
    ],
    totalHoras: 125.5,
    trabajadoresAfectados: 2
};

describe('mensajeHorasRetiradas', () => {

    test('caso real: dos trabajadores, con nombres y horas', () => {
        expect(mensajeHorasRetiradas(respuestaReal)).toBe(
            'Cuadrante reseteado. Se han retirado del control horario 125,5 h de 2 trabajadores: ' +
            'Azua Baque, Lincoln Assad (45 h), Bibian Soler, Trini (80,5 h).'
        );
    });

    test('un solo trabajador → singular', () => {
        const msg = mensajeHorasRetiradas({
            totalHoras: 11.5,
            horasRetiradas: [{ trabajador: 'Ávila Fontecha, Sofia Aracely', tipo: 'suplente', horas: 11.5 }]
        });
        expect(msg).toContain('11,5 h de 1 trabajador');
        expect(msg).toContain('Ávila Fontecha, Sofia Aracely (11,5 h)');
    });

    test('más de tres → se listan tres y "y N más"', () => {
        const msg = mensajeHorasRetiradas({
            totalHoras: 50,
            horasRetiradas: ['A', 'B', 'C', 'D', 'E'].map(n => ({ trabajador: n, horas: 10 }))
        });
        expect(msg).toContain('A (10 h), B (10 h), C (10 h) y 2 más');
    });

    test('reseteo sin horas apuntadas → null (no se avisa de nada)', () => {
        expect(mensajeHorasRetiradas({ ok: true, horasRetiradas: [], totalHoras: 0 })).toBeNull();
    });

    test('backend antiguo todavía sin desplegar → null, sin romper nada', () => {
        expect(mensajeHorasRetiradas({})).toBeNull();
        expect(mensajeHorasRetiradas(null)).toBeNull();
        expect(mensajeHorasRetiradas(undefined)).toBeNull();
        expect(mensajeHorasRetiradas('')).toBeNull();
        expect(mensajeHorasRetiradas({ queryString: null, affectedRows: 1 })).toBeNull();
    });

    test('error del backend → null', () => {
        expect(mensajeHorasRetiradas({ ok: false, error: 'cuadrante no encontrado', totalHoras: 0 })).toBeNull();
    });

    test('decimales con coma y sin ceros sobrantes', () => {
        const msg = mensajeHorasRetiradas({ totalHoras: 27.999999999999996, horasRetiradas: [{ trabajador: 'X', horas: 27.999999999999996 }] });
        expect(msg).toContain('28 h de 1 trabajador');
    });

    test('registros sin nombre de trabajador → mensaje sin detalle, pero con el total', () => {
        const msg = mensajeHorasRetiradas({ totalHoras: 9, horasRetiradas: [{ trabajadorId: 7, horas: 9 }] });
        expect(msg).toBe('Cuadrante reseteado. Se han retirado del control horario 9 h de 1 trabajador.');
    });
});
