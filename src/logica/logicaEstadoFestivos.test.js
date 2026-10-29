import { stateFestivoDisponible, esDiaFestivo } from './logicaEstadoFestivos';

// Estado tal como lo deja configuraStateFestivoAccion: una entrada por cada día
// del mes, con el día 12 marcado como festivo (octubre de 2026, caso GRG).
const stateFestivoOctubre = (() => {
    const objeto = {};
    for (let i = 1; i <= 31; i++) {
        objeto['estadoFestivoDia' + i] = i === 12;
        objeto['tipoFestivoDia' + i] = i === 12 ? 1 : 0;
    };
    return objeto;
})();

describe('stateFestivoDisponible', () => {
    test('un estado con días es utilizable', () => {
        expect(stateFestivoDisponible(stateFestivoOctubre)).toBe(true);
    });

    test('el objeto vacío que deja el reseteo no es utilizable', () => {
        expect(stateFestivoDisponible({})).toBe(false);
    });

    test('null y undefined no son utilizables', () => {
        expect(stateFestivoDisponible(null)).toBe(false);
        expect(stateFestivoDisponible(undefined)).toBe(false);
    });
});

describe('esDiaFestivo con el estado disponible', () => {
    const respaldoQueNoDebeUsarse = () => {
        throw new Error('no se debe recurrir al respaldo si el estado está disponible');
    };

    test('manda el estado: el día 12 es festivo', () => {
        expect(esDiaFestivo(stateFestivoOctubre, 12, respaldoQueNoDebeUsarse)).toBe(true);
    });

    test('manda el estado: el día 13 no es festivo', () => {
        expect(esDiaFestivo(stateFestivoOctubre, 13, respaldoQueNoDebeUsarse)).toBe(false);
    });

    test('un día fuera del mes no es festivo', () => {
        expect(esDiaFestivo(stateFestivoOctubre, 40, respaldoQueNoDebeUsarse)).toBe(false);
    });

    test('el estado manda aunque el respaldo opine lo contrario', () => {
        expect(esDiaFestivo(stateFestivoOctubre, 13, () => true)).toBe(false);
    });
});

describe('esDiaFestivo durante la ventana del reseteo', () => {
    // El respaldo es esFestivoFuncionAccion, la misma fuente que usará
    // configuraStateFestivoAccion para repoblar el estado.
    const respaldo = (dia) => dia === 12;

    test('con el estado vacío se recurre al respaldo: el día 12 es festivo', () => {
        expect(esDiaFestivo({}, 12, respaldo)).toBe(true);
    });

    test('con el estado vacío el día 13 sigue sin ser festivo', () => {
        expect(esDiaFestivo({}, 13, respaldo)).toBe(false);
    });

    test('sin estado y sin respaldo no se inventa un festivo', () => {
        expect(esDiaFestivo({}, 12, null)).toBe(false);
        expect(esDiaFestivo(null, 12, undefined)).toBe(false);
    });

    test('el respaldo se normaliza a booleano', () => {
        expect(esDiaFestivo({}, 12, () => 1)).toBe(true);
        expect(esDiaFestivo({}, 12, () => 0)).toBe(false);
        expect(esDiaFestivo({}, 12, () => undefined)).toBe(false);
    });
});

describe('regresión GRG NOTARIOS ASOCIADOS (octubre 2026)', () => {
    // Sanz García está de baja todo el mes y la cubre una suplente. Los 22 días
    // laborables son de 2,5 h. El lunes 12 es festivo y NO debe contar como hora
    // de baja: 21 días × 2,5 = 52,5 h, no 22 × 2,5 = 55 h.
    const diasLaborablesOctubre = [1, 2, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30];
    const respaldo = (dia) => dia === 12;

    const horasDeBaja = (stateFestivo) => diasLaborablesOctubre.reduce(
        (total, dia) => esDiaFestivo(stateFestivo, dia, respaldo) ? total : total + 2.5,
        0
    );

    test('con el estado poblado el festivo queda fuera: 52,5 h', () => {
        expect(horasDeBaja(stateFestivoOctubre)).toBe(52.5);
    });

    test('con el estado vacío el respaldo da el mismo resultado: 52,5 h', () => {
        expect(horasDeBaja({})).toBe(52.5);
    });

    test('sin respaldo se reproduce el fallo que arreglamos: 55 h', () => {
        const sinRespaldo = diasLaborablesOctubre.reduce(
            (total, dia) => esDiaFestivo({}, dia, null) ? total : total + 2.5,
            0
        );
        expect(sinRespaldo).toBe(55);
    });
});
