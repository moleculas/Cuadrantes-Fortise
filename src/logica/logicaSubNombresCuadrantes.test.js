import {
    parseSubNombresCuadrantes,
    serializaSubNombresCuadrantes,
    subNombrePrincipal
} from './logicaSubNombresCuadrantes';

const nuevo = (arr) => JSON.stringify({ objeto: 'sub_nombre', sub_nombre: arr });

describe('parseSubNombresCuadrantes — lectura por cuadrante con compatibilidad', () => {

    describe('formato nuevo (columna sub_nombres_cuadrantes)', () => {
        test('lista de 2 identificadores con 2 cuadrantes → tal cual', () => {
            expect(parseSubNombresCuadrantes(nuevo(['CP Ventalló 6', 'CP Ventalló 8']), 'CP Ventalló 6', 2))
                .toEqual(['CP Ventalló 6', 'CP Ventalló 8']);
        });

        test('acepta objeto ya parseado (no solo string)', () => {
            expect(parseSubNombresCuadrantes({ objeto: 'sub_nombre', sub_nombre: ['A', 'B'] }, 'A', 2))
                .toEqual(['A', 'B']);
        });

        test('lista más corta que el nº de cuadrantes → se rellena con ""', () => {
            expect(parseSubNombresCuadrantes(nuevo(['A']), 'A', 2)).toEqual(['A', '']);
        });

        test('lista más larga que el nº de cuadrantes → se recorta', () => {
            expect(parseSubNombresCuadrantes(nuevo(['A', 'B']), 'A', 1)).toEqual(['A']);
        });
    });

    describe('compatibilidad con centros antiguos (columna nueva a null)', () => {
        test('escalar antiguo con 1 cuadrante → [escalar]', () => {
            expect(parseSubNombresCuadrantes(null, 'CP Ventalló 6', 1)).toEqual(['CP Ventalló 6']);
        });

        test('escalar antiguo con 2 cuadrantes → [escalar, ""] (el 1º hereda, el 2º vacío)', () => {
            expect(parseSubNombresCuadrantes(null, 'CP Ventalló 6', 2)).toEqual(['CP Ventalló 6', '']);
        });

        test('sin identificador antiguo → [""]', () => {
            expect(parseSubNombresCuadrantes(null, null, 1)).toEqual(['']);
        });

        test('valor no-JSON inesperado → cae al escalar', () => {
            expect(parseSubNombresCuadrantes('texto suelto no json', 'P', 2)).toEqual(['P', '']);
        });
    });

    describe('robustez', () => {
        test('numeroCuadrantes inválido → asume 1', () => {
            expect(parseSubNombresCuadrantes(nuevo(['A', 'B']), 'A', 0)).toEqual(['A']);
            expect(parseSubNombresCuadrantes(nuevo(['A', 'B']), 'A', undefined)).toEqual(['A']);
        });
    });
});

describe('serializaSubNombresCuadrantes — escritura', () => {
    test('serializa al formato { objeto, sub_nombre: [...] }', () => {
        expect(serializaSubNombresCuadrantes(['A', 'B'])).toBe(nuevo(['A', 'B']));
    });

    test('conserva posiciones vacías', () => {
        expect(serializaSubNombresCuadrantes(['A', ''])).toBe(nuevo(['A', '']));
    });

    test('normaliza null/undefined a ""', () => {
        expect(serializaSubNombresCuadrantes(['A', null, undefined])).toBe(nuevo(['A', '', '']));
    });
});

describe('subNombrePrincipal — primer identificador no vacío para la columna escalar', () => {
    test('devuelve el 1er identificador cuando tiene valor', () => {
        expect(subNombrePrincipal(['CP Ventalló 6', 'CP Ventalló 8'])).toBe('CP Ventalló 6');
    });

    test('1º vacío → devuelve el primero no vacío (el 2º)', () => {
        expect(subNombrePrincipal(['', 'CP Ventalló 8'])).toBe('CP Ventalló 8');
    });

    test('todos vacíos → null', () => {
        expect(subNombrePrincipal(['', ''])).toBeNull();
    });

    test('lista vacía → null', () => {
        expect(subNombrePrincipal([])).toBeNull();
    });
});

describe('ida y vuelta (round-trip)', () => {
    test('serializar y volver a parsear devuelve la misma lista', () => {
        const lista = ['CP Ventalló 6', 'CP Ventalló 8'];
        const serializado = serializaSubNombresCuadrantes(lista);
        expect(parseSubNombresCuadrantes(serializado, subNombrePrincipal(lista), 2)).toEqual(lista);
    });
});
