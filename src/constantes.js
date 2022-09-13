let rutaApi, rutaServer
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    rutaApi = "http://localhost/api_quadrants/";
    //rutaServer = window.location.protocol + "//" + window.location.host   
} else {
    rutaServer = window.location.protocol + "//" + window.location.host;
    rutaApi = rutaServer + "/api/";
};

const subdirectoriProduccio = '';
//afegir a package.json: "homepage": "https://domini/subdomini",

const retornaDiaMes = (fecha) => {
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const laData = dia + '-' + mes;
    return laData;
};

const devuelveFestivos = () => {
    const hoy = new Date();
    const any = hoy.getFullYear();
    let m;
    let n;
    let a;
    let b;
    let c;
    let d;
    let e;
    let f;
    let dia;
    let mes;
    if (any > 1583 && any < 1699) { m = 22; n = 2; }
    else if (any > 1700 && any < 1799) { m = 23; n = 3; }
    else if (any > 1800 && any < 1899) { m = 23; n = 4; }
    else if (any > 1900 && any < 2099) { m = 24; n = 5; }
    else if (any > 2100 && any < 2199) { m = 24; n = 6; }
    else if (any > 2200 && any < 2299) { m = 25; n = 0; }
    a = any % 19;
    b = any % 4;
    c = any % 7;
    d = ((19 * a) + m) % 30;
    e = ((2 * b) + (4 * c) + (6 * d) + n) % 7;
    f = d + e;
    if (f < 10) {
        dia = f + 22;
        mes = 3;
    } else {
        dia = f - 9;
        mes = 4;
    };
    if (dia === 26 && mes === 4) {
        dia = 19;
    };
    if (dia === 25 && mes === 4 && d === 28 && e === 6 && a > 10) {
        dia = 18;
    };
    //const laFecha = mes + '-' + dia + '-' + any; //només vàlid a chrome
    const laFecha = any + '/' + mes + '/' + dia + ' 00:00:00'; //vàlid chrome + firefox
    const domingoPascua1 = new Date(laFecha);
    const viernesSanto = new Date(domingoPascua1.setDate(domingoPascua1.getDate() - 2));
    const domingoPascua2 = new Date(laFecha);
    const lunesPascua = new Date(domingoPascua2.setDate(domingoPascua2.getDate() + 1));
    const domingoPascua3 = new Date(laFecha);
    const segundaPascua = new Date(domingoPascua3.setDate(domingoPascua3.getDate() + 50));
    const arrayFestivos = [
        '1-1',
        '6-1',
        retornaDiaMes(viernesSanto),
        retornaDiaMes(lunesPascua),
        '1-5',
        retornaDiaMes(segundaPascua),
        '24-6',
        '15-8',
        '11-9',
        '24-9',
        '12-10',
        '1-11',
        '6-12',
        '8-12',
        '25-12',
        '26-12'
    ];
    return arrayFestivos;
};

const festivos = devuelveFestivos();

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const numeracioInstruccions = ['🄌', '➊', '➋', '➌', '➍', '➎', '➏', '➐', '➑', '➒', '➓'];

const Constantes = {
    SUBDIRECTORI_PRODUCCIO: subdirectoriProduccio,
    RUTA_API: rutaApi,
    CATEGORIAS_CENTROS: [
        { value: 1, label: 'Barcelona' },
        { value: 2, label: 'Comunidades de pisos' },
        { value: 3, label: 'Farmacias' },
        { value: 4, label: 'Fuera de Barcelona' },
        { value: 5, label: 'Pisos' },
        { value: 6, label: 'Residencias' }
    ],
    CANTIDAD_HORAS_CENTROS: [
        { value: 30, label: '30 min.' },
        { value: 45, label: '45 min.' },
        { value: 60, label: '1 hora' },
        { value: 75, label: '1 hora 15 min.' },
        { value: 90, label: '1 hora 30 min.' },
        { value: 105, label: '1 hora 45 min.' },
        { value: 120, label: '2 horas' },
        { value: 135, label: '2 horas 15 min.' },
        { value: 140, label: '2 horas 20 min.' },
        { value: 150, label: '2 horas 30 min.' },
        { value: 165, label: '2 horas 45 min.' },
        { value: 180, label: '3 horas' },
        { value: 210, label: '3 horas 30 min.' },
        { value: 240, label: '4 horas' },
        { value: 270, label: '4 horas 30 min.' },
        { value: 300, label: '5 horas' },
        { value: 330, label: '5 horas 30 min.' },
        { value: 360, label: '6 horas' },
        { value: 390, label: '6 horas 30 min.' },
        { value: 420, label: '7 horas' },
        { value: 450, label: '7 horas 30 min.' },
        { value: 480, label: '8 horas' },
        { value: 540, label: '9 horas' },
        { value: 600, label: '10 horas' },
        { value: 660, label: '11 horas' },
        { value: 720, label: '12 horas' }
    ],
    VARIACIONES_HORARIOS_CENTROS: [
        { value: 'todasSemanas', label: 'Todas las semanas' },
        { value: 'semanaSiNo', label: 'Semana sí, semana no' }
    ],
    MODO_ENTRADA_HORARIOS: [
        { value: 'rango', label: 'Rango de horas' },
        { value: 'cantidad', label: 'Cantidad de horas' },
        { value: 'rangoDescanso', label: 'Rango de horas con descanso' }
    ],
    EXCEPCIONES_CENTROS: [
        { value: 1, label: 'Festivos restan cómputo horas' }
    ],
    SUBCATEGORIAS_TRABAJADORES: [
        { value: 2, label: 'Servicios Extra' }
    ],
    TIPO_FESTIVO: [
        { value: 0, label: 'Laboral' },
        { value: 1, label: 'Festivo' },
        { value: 2, label: 'Cierre centro' },
        { value: 3, label: 'Cierre centro facturar' }
    ],
    TRABAJADORES_ASIGNADOS_CENTRO: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
    ],
    ESTADO_LABORAL_TRABAJADOR: [
        { value: 'alta', label: 'Alta' },
        { value: 'ausenciaINJ', label: 'Ausencia injustificada' },
        { value: 'personales', label: 'Ausencia por motivos personales' },
        { value: 'bajaACCTE', label: 'Baja ACCTE' },
        { value: 'bajaCIA', label: 'Baja CIA' },
        { value: 'bajaIT', label: 'Baja IT' },
        { value: 'excedencia', label: 'Excedencia' },
        { value: 'permisoRET', label: 'Permiso retribuido' },
        { value: 'reserva', label: 'Reserva' },
        { value: 'vacaciones', label: 'Vacaciones' }
    ],
    CALENDARIO_FESTIVOS: festivos,
    VARIACIONES_CUADRANTES: [
        { value: 1, label: 'Sin coste' },
        { value: 2, label: 'Sustitución festivos' }
    ],
    COMPUTO_HORAS: [
        { value: 1, label: 'Total mensual pactado' },
        { value: 2, label: 'Precio hora estipulado' },
        { value: 3, label: 'Gestión especial horas' },
        { value: 4, label: 'Sin coste' }
    ],
    TIPO_SERVICIO: [
        { value: 'LIM', label: 'SERVICIO DE LIMPIEZA' },
        { value: 'LIME', label: 'SERVICIO DE LIMPIEZA ESPECIAL' },
        { value: 'LIMP', label: 'SERVICIO DE LIMPIEZA DEL PARKING' },
        { value: 'NAVE2', label: 'SERVICIO DE LIMPIEZA NAVE 2' },
        { value: 'REFZ', label: 'SERVICIO DE LIMPIEZA REFUERZO' },
        { value: 'LIM1', label: 'SERVICIO DE LIMPIEZA_1' },
        { value: 'LIM2', label: 'SERVICIO DE LIMPIEZA_2' },
        { value: 'FEST', label: 'SERVICIO DE LIMPIEZA DÍA FESTIVO' }
    ],
    TIPO_SERVICIO_FIJO: [
        { value: 'TOL', label: 'SERVICIO DE LIMPIEZA DE TOLDOS' },
        { value: 'CRIS', label: 'SERVICIO DE LIMPIEZA DE CRISTALES' },
        { value: 'CRISE', label: 'LIMPIEZA CRISTALES EXTERIORES' },
        { value: 'CRISI', label: 'LIMPIEZA CRISTALES INTERIORES' },
        { value: 'MOQ', label: 'SERVICIO DE LIMPIEZA MOQUETA' },
        { value: 'OF', label: 'SERVICIO DE LIMPIEZA OFICINAS' },
        { value: 'ALMC', label: 'SERVICIO DE LIMPIEZA ALMACENES' },
        { value: 'LAB', label: 'SERVICIO DE LIMPIEZA LABORATORIO' },
        { value: 'TELÑ', label: 'SERVICIO DE LIMPIEZA TELARAÑAS' },
        { value: 'FCH.IN', label: 'SERVICIO DE LIMPIEZA FACHADA INTERIOR' },
        { value: 'FCH.EX', label: 'SERVICIO DE LIMPIEZA FACHADA EXTERIOR' },
        { value: 'ABRLL', label: 'SERVICIO DE LIMPIEZA ABRILLANTADO' },
        { value: 'MANT', label: 'SERVICIO DE MANTENIMIENTO MÁQUINA' },
        { value: 'PORT', label: 'SERVICIO DE LIMPIEZA PORTERÍA' },
        { value: 'BACT', label: 'BOT. NOUBACT' },
        { value: 'FEST', label: 'SERVICIO DE LIMPIEZA DÍA FESTIVO' },
        { value: 'CRTRIM', label: 'LIMPIEZA DE CRISTALES TRIMESTRAL' },
        { value: 'CRBIM', label: 'LIMPIEZA DE CRISTALES BIMENSUAL' },
        { value: 'LIME', label: 'SERVICIO DE LIMPIEZA ESPECIAL' },
        { value: 'LIMP', label: 'SERVICIO DE LIMPIEZA DEL PARKING' }
    ],
    FORMA_DE_PAGO: [
        { value: 'C1', label: 'Cheque bancario a 30 días' },
        { value: 'C3', label: 'Cheque bancario a 90 días' },
        { value: 'C4', label: 'Confirming a 120 días' },
        { value: 'C5', label: 'Confirming a 180 días' },
        { value: 'C2', label: 'Contado' },
        { value: '@C', label: 'Contrareembolso - Entrega' },
        { value: 'CH', label: 'Envían cheque' },
        { value: 'F1', label: 'Factoring' },
        { value: 'ME', label: 'Metálico' },
        { value: 'P1', label: 'Pagaré' },
        { value: 'RE', label: 'Recibo domiciliado' },
        { value: 'R1', label: 'Recibo domiciliado a 30 días' },
        { value: 'R2', label: 'Recibo domiciliado a 60 días' },
        { value: 'R3', label: 'Recibo domiciliado a 90 días' },
        { value: '@T', label: 'Tarjeta de crédito' },
        { value: 'TR', label: 'Transferencia' },
        { value: 'T1', label: 'Transferencia a 30 días' },
        { value: 'T4', label: 'Transferencia a 45 días' },
        { value: 'T2', label: 'Transferencia a 60 días' },
        { value: 'T3', label: 'Transferencia a 90 días' }
    ],
    TEMPORIZACION_PAGO: [
        { value: 'mensual', label: 'Mensual' },
        { value: 'bimensual', label: 'Bimensual' },
        { value: 'trimestral', label: 'Trimestral' }
    ],
    DIA_PAGO: [
        { value: 1, label: 'Día 1' },
        { value: 2, label: 'Día 2' },
        { value: 3, label: 'Día 3' },
        { value: 4, label: 'Día 4' },
        { value: 5, label: 'Día 5' },
        { value: 6, label: 'Día 6' },
        { value: 7, label: 'Día 7' },
        { value: 8, label: 'Día 8' },
        { value: 9, label: 'Día 9' },
        { value: 10, label: 'Día 10' },
        { value: 11, label: 'Día 11' },
        { value: 12, label: 'Día 12' },
        { value: 13, label: 'Día 13' },
        { value: 14, label: 'Día 14' },
        { value: 15, label: 'Día 15' },
        { value: 16, label: 'Día 16' },
        { value: 17, label: 'Día 17' },
        { value: 18, label: 'Día 18' },
        { value: 19, label: 'Día 19' },
        { value: 20, label: 'Día 20' },
        { value: 21, label: 'Día 21' },
        { value: 22, label: 'Día 22' },
        { value: 23, label: 'Día 23' },
        { value: 24, label: 'Día 24' },
        { value: 25, label: 'Día 25' },
        { value: 26, label: 'Día 26' },
        { value: 27, label: 'Día 27' },
        { value: 28, label: 'Día 28' },
        { value: 29, label: 'Día 29' },
        { value: 30, label: 'Día 30' },
        { value: 31, label: 'Día 31' }
    ],
    VARIACIONES_SERVICIOS_FIJOS_CENTROS: [
        { value: 1, label: 'Todas las semanas' },
        { value: 2, label: 'Semana sí, semana no' },
        { value: 3, label: 'Una vez al mes' },
    ],
    DIAS_SEMANA: [
        { value: 'lunes', label: 'Lunes' },
        { value: 'martes', label: 'Martes' },
        { value: 'miercoles', label: 'Miércoles' },
        { value: 'jueves', label: 'Jueves' },
        { value: 'viernes', label: 'Viernes' },
        { value: 'sabado', label: 'Sábado' },
        { value: 'domingo', label: 'Domingo' }
    ],
    MESES: meses,
    NUMERACIO_INSTRUCCIONS: numeracioInstruccions,
};
export default Constantes;