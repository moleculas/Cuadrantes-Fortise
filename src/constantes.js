let rutaApi, rutaServer
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    rutaApi = "http://localhost/api_quadrants/";
    //rutaServer = window.location.protocol + "//" + window.location.host   
} else {
    rutaServer = window.location.protocol + "//" + window.location.host;
    rutaApi = rutaServer + "/api/";
}

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
    const laFecha = mes + '-' + dia + '-' + any;
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
        '11-9',
        '24-9',
        '12-10',
        '1-11',
        '6-12',
        '8-12',
        '25-12'
    ];
    return arrayFestivos;
}

const festivos = devuelveFestivos();

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

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
        { value: 60, label: '1 hora' },
        { value: 90, label: '1.5 horas' },
        { value: 120, label: '2 horas' },
        { value: 150, label: '2.5 horas' },
        { value: 180, label: '3 horas' },
        { value: 210, label: '3.5 horas' },
        { value: 240, label: '4 horas' },
        { value: 270, label: '4.5 horas' },
        { value: 300, label: '5 horas' },
        { value: 330, label: '5.5 horas' },
        { value: 360, label: '6 horas' },
        { value: 390, label: '6.5 horas' },
        { value: 420, label: '7 horas' },
        { value: 450, label: '7.5 horas' },
        { value: 480, label: '8 horas' },
    ],
    VARIACIONES_HORARIOS_CENTROS: [
        { value: 'todasSemanas', label: 'Todas las semanas' },
        { value: 'semanaSiNo', label: 'Semana sí, semana no' }
    ],
    MODO_ENTRADA_HORARIOS: [
        { value: 'rango', label: 'Modo Rango de horas' },
        { value: 'cantidad', label: 'Modo Cantidad de horas' },
        { value: 'rangoDescanso', label: 'Modo Rango de horas con descanso' }
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
        { value: 'baja', label: 'Baja' },
        { value: 'vacaciones', label: 'Vacaciones' },
        { value: 'excedencia', label: 'Excedencia' },
        { value: 'personales', label: 'Ausencia por motivos personales' }
    ],
    CALENDARIO_FESTIVOS: festivos,
    VARIACIONES_CUADRANTES: [
        { value: 1, label: 'Considerar como horas extra' },
        { value: 2, label: 'Añadir 0.5 horas extra de trabajo' },
        { value: 3, label: 'Añadir 1 hora extra de trabajo' },
        { value: 4, label: 'Añadir 1.5 horas extra de trabajo' },
        { value: 5, label: 'Añadir 2 horas extra de trabajo' },
        { value: 6, label: 'Horas especiales (+15%)' }
    ],
    COMPUTO_HORAS: [
        { value: 1, label: 'Total mensual pactado' },
        { value: 2, label: 'Precio hora estipulado' },
        { value: 3, label: 'Gestión especial horas' }
    ],
    TIPO_SERVICIO: [
        { value: 'LIM', label: 'SERVICIO DE LIMPIEZA' },
        { value: 'CRIS', label: 'SERVICIO DE LIMPIEZA DE CRISTALES' },
        { value: 'CRISE', label: 'LIMPIEZA CRISTALES EXTERIORES' },
        { value: 'CRISI', label: 'LIMPIEZA CRISTALES INTERIORES' },
        { value: 'LIME', label: 'SERVICIO DE LIMPIEZA DE ESCALERA Y ZONAS COMUNES' },
        { value: 'TOL', label: 'SERVICIO DE LIMPIEZA DE TOLDOS' },
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
        { value: 'RE', label: 'Recibo domiciliado a 3 días' },
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
    MESES: meses,
};
export default Constantes;