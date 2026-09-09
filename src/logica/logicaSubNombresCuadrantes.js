// Gestión del "Identificador" (sub_nombre) por cuadrante de un centro.
//
// Contexto: hasta ahora el Identificador era un único escalar compartido por
// todo el centro (columna `sub_nombre`). Ahora puede ser independiente por
// cuadrante y se guarda como lista JSON en la columna `sub_nombres_cuadrantes`
// (mismo patrón que `categoria`), manteniendo `sub_nombre` = identificador del
// 1er cuadrante para que todo lo que ya lo lee siga funcionando igual.
//
// Compatibilidad: los centros antiguos tienen `sub_nombres_cuadrantes` a null;
// en ese caso se cae al escalar `sub_nombre` como identificador del 1er
// cuadrante y el resto queda vacío.

export const OBJETO_SUB_NOMBRES = 'sub_nombre';

// Devuelve la lista de identificadores por cuadrante, dimensionada a
// `numeroCuadrantes`, con caída a datos antiguos.
//   - subNombresCuadrantesRaw: string JSON de la columna nueva (o null / objeto)
//   - subNombrePrincipal: escalar de la columna `sub_nombre` (identificador "de siempre")
//   - numeroCuadrantes: nº de cuadrantes del centro (para dimensionar la lista)
export const parseSubNombresCuadrantes = (subNombresCuadrantesRaw, subNombrePrincipal, numeroCuadrantes) => {
    const total = Number.isInteger(numeroCuadrantes) && numeroCuadrantes > 0 ? numeroCuadrantes : 1;
    let lista = null;
    if (subNombresCuadrantesRaw) {
        try {
            const parsed = typeof subNombresCuadrantesRaw === 'string'
                ? JSON.parse(subNombresCuadrantesRaw)
                : subNombresCuadrantesRaw;
            if (parsed && Array.isArray(parsed.sub_nombre)) {
                lista = parsed.sub_nombre;
            };
        } catch (e) {
            // Valor no-JSON (dato antiguo inesperado): caemos al escalar.
            lista = null;
        };
    };
    if (!lista) {
        // Centro antiguo o sin columna: el identificador escalar es el del 1er
        // cuadrante; el resto de cuadrantes quedan vacíos.
        lista = [subNombrePrincipal || ''];
    };
    // Normalizamos a `total` posiciones: rellenamos con '' y recortamos sobrante.
    const resultado = [];
    for (let i = 0; i < total; i++) {
        resultado.push(lista[i] ? lista[i] : '');
    };
    return resultado;
};

// Serializa la lista por cuadrante al formato de la columna nueva
// (mismo patrón `{ objeto, sub_nombre: [...] }` que usa `categoria`).
export const serializaSubNombresCuadrantes = (listaIdentificadores) => {
    const lista = Array.isArray(listaIdentificadores) ? listaIdentificadores.map(v => v || '') : [];
    return JSON.stringify({ objeto: OBJETO_SUB_NOMBRES, sub_nombre: lista });
};

// Identificador "principal" que se guarda en la columna escalar `sub_nombre`,
// para que desplegables, listados, emparejamientos y la CABECERA de la factura
// sigan mostrando un identificador. Es el PRIMER identificador NO vacío de la
// lista (normalmente el del 1er cuadrante; si ese está vacío, el siguiente con
// valor). Devuelve null si ninguno tiene valor.
export const subNombrePrincipal = (listaIdentificadores) => {
    if (!Array.isArray(listaIdentificadores)) return null;
    const principal = listaIdentificadores.find(id => id);
    return principal ? principal : null;
};
