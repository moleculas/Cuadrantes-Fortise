import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    List,
    ListItem,
    ListItemSecondaryAction,
    Typography,
    CircularProgress,
    ListItemText,
    Button,
    Chip,
    Checkbox,
    ButtonGroup,
    Popper,
    Grow,
    Paper,
    MenuItem,
    MenuList,
    ClickAwayListener
} from '@material-ui/core';
import {
    ExitToApp as ExitToAppIcon,
    CheckBoxOutlineBlankOutlined as CheckBoxOutlineBlankOutlinedIcon,
    CheckBoxOutlined as CheckBoxOutlinedIcon,
    ExpandMore as ExpandMoreIcon,
    Mail as MailIcon,
    ArrowDropDown as ArrowDropDownIcon,
    Check as CheckIcon
} from '@material-ui/icons';
import Constantes from "../constantes";

//importaciones acciones
import {
    cambioEstadoInicioCuadrantesAccion,
    activarDesactivarCambioBotonRegistrarAccion,
    setCentroAccion
} from '../redux/cuadrantesDucks';
import {
    venimosDeRegistradosAccion,
    vaciarDatosPendientesAccion
} from '../redux/pendientesDucks';
import { obtenerCentroAccion, vaciarDatosCentrosAccion } from '../redux/centrosDucks';
import {
    Alert,
    getHeightContenedoresGra,
    AccordionCua as Accordion,
    AccordionDetailsCua as AccordionDetails,
    AccordionSummary3Cua as AccordionSummary,
    controlActualizacionesPorFecha
} from '../logica/logicaApp';

import {
    gestionarRemesaLoteAccion,
    actualizarCuadrantesRemesasAccion,
    reseteaRemesasAccion
} from '../redux/cuadrantesRemesasDucks';
import { obtenerConfiguracionAccion } from '../redux/appDucks';

//carga componentes
import CustomSnack from '../comun/CustomSnack';

//estilos
import Clases from "../clases";

//constantes
const {
    REMESAS: optionsRemesas,
    FORMA_DE_PAGO: formasDePago
} = Constantes;

//parche temporal
const arrayIbans = [
    { centro: "ANCO SISTEMAS DE GESTIÓN, S.A.", iban: "ES3921000679180200512931" },
    { centro: "ANQUOR CORPORATE FINANCE, S.L.U.", iban: "ES3000810036450002702574" },
    { centro: "APARELLAJES Y CUADROS ELECTRICOS, S.L.", iban: "ES4521000722510200070519" },
    { centro: "ART KEEPING, S.L.", iban: "ES9321003029732200461342" },
    { centro: "ASSEMBLEA NACIONAL CATALANA", iban: "ES9121000829010200966175" },
    { centro: "FORNESA AUGUSTA ABOGADOS, S.L.P.", iban: "ES9321000888100200328465" },
    { centro: "AUTOESCOLA 24 S.L.", iban: "ES9500811709300001191425" },
    { centro: "AUTOMÓVILES CONCEPCIÓN, S.L.", iban: "ES9601821025880010140503" },
    { centro: "BARNAPES S.L.", iban: "ES0421003430802200032435" },
    { centro: "BILANX, S.A.", iban: "ES4921003054692200207910" },
    { centro: "CASAL CATOLIC", iban: "ES5821000804380200776183" },
    { centro: "CENTRE D'ESTUDIS IGNASI IGLESIAS", iban: "ES5321000804350200703088" },
    { centro: "CIPRÉS AZUL, S.L.", iban: "ES9821000555300202437693" },
    { centro: "EIGENMANN & VERONELLI IBERICA, S.L.", iban: "ES4900810603060001023107" },
    { centro: "EPICA BUILDING SERVICES, S.L.", iban: "ES9621000804310200764493" },
    { centro: "GARCÍA RUIZ, JAVIER", iban: "ES8000756002370600191955" },
    { centro: "GLOBAL RISK S.L.", iban: "ES7900750480630600141267" },
    { centro: "GOLDINVER INMOBILIARIA, S.L.", iban: "ES7621003006982200725607" },
    { centro: "GESTIO I SERVEIS TRADE CENTER", iban: "ES4201824370810201526385" },
    { centro: "INDUSTRIAS ORIOL 1942, S.L.", iban: "ES2121003249932500007028" },
    { centro: "INDUSTRIAS POLLIE S.L.", iban: "ES2721003249912200062939" },
    { centro: "LOTUM, S.A.", iban: "ES8401825427990201502549" },
    { centro: "GRG NOTARIOS ASOCIADOS", iban: "ES7720130394630200607674" },
    { centro: "RENTA CORPORACION REAL ESTATE, S.A.", iban: "ES9621000804310200764493" },
    { centro: "STAAR SURGICAL AG SUCURSAL EN ESPAÑA", iban: "ES9101510001630060402722" },
    { centro: "SUBMINISTRAMENTS ELECTRIC I SANITARIS MARSET SL", iban: "ES9621000804310200764493" },
    { centro: "TECENAP, S.L.", iban: "ES0200811768250001005706" },
    { centro: "TOT CAT S.L.U.P.", iban: "ES8321000811710201530851" },
    { centro: "UDON BARCELONA, S.L.", iban: "ES1500815197510001066809" },
    { centro: "XIOL, MIRACLE, FORET I ASSOCIATS ADVOCATS, S.C.P.", iban: "ES3431710000181663723920" },
    { centro: "VITAS ASSOCIATS CONSULTORS, S.L.U.", iban: "ES9100810058850001313741" },
    { centro: "ALUMINIOS BARCELONA, S.L.", iban: "ES0500810533910001046708" },
    { centro: "CHEMIFLOOR,SA", iban: "ES3500810900850002681574" },
    { centro: "COMMTIA SYSTEMS,S.A", iban: "ES9621000804310200764493" },
    { centro: "C.P. ARIBAU, 168-170", iban: "ES7721003433142200036048" },
    { centro: "HNAS. RAMIREZ (CP Besalu 94)", iban: "ES7800810138790001424244" },
    { centro: "C.P. BONSUCCES, 2", iban: "ES9621000804310200764493" },
    { centro: "C.P. Botánica, 45-47", iban: "ES2031400001940018625600" },
    { centro: "C.P. CABRERA 13", iban: "ES9621000804310200764493" },
    { centro: "C.P. CARTAGENA, 403", iban: "ES4321003205132200346481" },
    { centro: "C.P. CARTAGENA, 403 PK", iban: "ES4321003205132200346481" },
    { centro: "C.P. CORDELLAS, 16", iban: "ES2520810501060000014082" },
    { centro: "C.P. IGNASI IGLESIAS, 9", iban: "ES4421000804320200991293" },
    { centro: "C.P. LIUVA 15", iban: "ES3100490754012110536280" },
    { centro: "C.P. MIREIA, 52-54", iban: "ES4401827367810200176997" },
    { centro: "C.P. MIQUEL ANGEL, 97", iban: "ES8500811664050001112921" },
    { centro: "C.P. MOLES, 22", iban: "ES9621000804310200764493" },
    { centro: "C.P. MONGES, 17", iban: "ES5121001019610100459642" },
    { centro: "C.P. MONGES, 35", iban: "ES1900810058850001337735" },
    { centro: "GRAU MONTANER, MARÍA", iban: "ES7800810138790001424244" },
    { centro: "C.P. MUNTANER, 108", iban: "ES4321003205132200346481" },
    { centro: "C.P. NEOPATRIA, 117", iban: "ES8500810058800001544663" },
    { centro: "C.P. ANDORRA, 9", iban: "ES8700810010210001461551" },
    { centro: "C.P. CASTILLEJOS, 259-261", iban: "ES7200810066660001310637" },
    { centro: "C.P. PALLARS 409 -419", iban: "ES9621000804310200764493" },
    { centro: "C.P. SALVA, 23", iban: "ES9621000804310200764493" },
    { centro: "PICAZO USTRELL, LLUISA (C.P. St.Sebastià, 14)", iban: "ES1500494714902293078230" },
    { centro: "C.P. SANTA CATERINA, 19-23", iban: "ES3700811664020001079012" },
    { centro: "C.P. SERVET, 81", iban: "ES5020130080160201155783" },
    { centro: "C.P. SÓCRATES 55", iban: "ES1900810058850001337735" },
    { centro: "C.P. SÓCRATES, 59", iban: "ES1900810058850001337735" },
    { centro: "C.P. VERDI, 311", iban: "ES3867190001698510833367" },
    { centro: "CT GUTENBERG, S.L", iban: "ES9621000804310200764493" },
    { centro: "FARMACIA POBLENOU CB", iban: "ES1401820209740201623829" },
    { centro: "ALSINA CASALDUERO, MACARENA (Farmacia)", iban: "ES0600493398912314113312" },
    { centro: "AUDET BONET, GEMMA (Farmacia)", iban: "ES5801821355060201545692" },
    { centro: "AUDET BONET, LAURA (Farmacia)", iban: "ES1221003168552200156420" },
    { centro: "FARMACIA BAETA-BOU, C.B.", iban: "ES1121001108820200057684" },
    { centro: "FARMACIA FRANQUESA GRAN SANT ANDREU, C.B.", iban: "ES7421001109280200071174" },
    { centro: "GRAU NOGUERA, MARTA (Farmacia)", iban: "ES2901823031070208500976" },
    { centro: "LUCEA TERUEL, ESTHER (Farmacia)", iban: "ES4301250002862045100457" },
    { centro: "MARÉ VIVES, JAUME (Farmacia)", iban: "ES7421003043442200388976" },
    { centro: "NAJAR MARTÓN, JOAN (Farmacia)", iban: "ES9221001027440200144879" },
    { centro: "PERIS GRAU, JOAQUIM (Farmacia)", iban: "ES9100302514400298098273" },
    { centro: "JIMENEZ JIMENEZ, PIA ALMUDENA", iban: "ES4321000868580200770236" },
    { centro: "UDON BARCELONA, S.L.", iban: "ES1500815197510001066809" },
    { centro: "UDÓN FRANCHISING, S.L.", iban: "ES8600815197510001079111" },
    { centro: "PEKOS VALVES S.L.U.", iban: "ES9621000804310200764493" },
    { centro: "IRIS LA GARRIGA, S.A.U", iban: "ES7100815197580001002602" },
    { centro: "FESADENT", iban: "ES3100190010134010014881" },
    { centro: "SCHRÖEDER INTERNACIONAL, S.L.", iban: "ES2001822373810018700054" },
    { centro: "S.A. ROBAMA", iban: "ES0700750287080600354146" },
    { centro: "AAF MAS DCA, S.L. (Residencia Armonia)", iban: "ES7400491884862810301711" },
    { centro: "RESIDENCIA Y ATENCIÓN SOCIAL, S.L.", iban: "ES1900491884852910301699" },
    { centro: "RESIDENCIA VALL D´HEBRON, S.L.", iban: "ES9600491884892510301702" },
    { centro: "GREENS PROWER PRODUCTS, S.L.", iban: "ES7900815197570001002701" },
    { centro: "ROQUET FERNÁNDEZ, CONCHITA (Farmacia)", iban: "ES6501823054990010008614" },
    { centro: "SERRA TRULL, ANDREU (Farmacia)", iban: "ES1401825870830201541807" },
    { centro: "TERRE HERNANDEZ, INMACULADA (Farmacia)", iban: "ES5601823326790200304724" },
    { centro: "VIVES PAL, Mª CARMEN (Farmacia)", iban: "ES1201820295440010044483" },
    { centro: "ENRICH MURT, JAUME (Farmacia)", iban: "ES8620130489560200854820" },
    { centro: "ALONSO HERNÁNDEZ, FERNANDO", iban: "ES3700810058850001043307" },
    { centro: "PUJOL RADIGALES, JOAQUIM", iban: "ES6221001019660200000211" },
    { centro: "MELERO LÓPEZ, JOSÉ ANTONIO", iban: "ES4530250017421400028100" },
    { centro: "ALAIX BLASCO, JOSEFINA", iban: "ES5001820297330201630781" },
    { centro: "ESPADALER GAMISSANS, MONTSERRAT", iban: "ES3330250012131400094977" },
    { centro: "HERNANDEZ HERRERA, EULALIA", iban: "ES2000810058800006401847" },
    { centro: "PREVENJOBS S.L.", iban: "ES6600810062890001647766" },
    { centro: "SALA TORELLÓ, Mº MAGDALENA (CP Vallespir 100)", iban: "ES7700811664070001008304" },
    { centro: "PEKOS VALVES S.L.U.", iban: "ES9621000804310200764493" },
    { centro: "GARCÍA-SANCHA SÁEZ, BELEN (Notaria)", iban: "ES8821008126600200120181" },
    { centro: "BORRAS BORRAS, PERE LLUIS", iban: "ES7501822392810010039603" },
    { centro: "VALVULAS NACIONAL, S.A.", iban: "ES9101820847950010038085" },
    { centro: "FORNIELES DURÀ, ELISA", iban: "ES5821000554940101171304" },
    { centro: "OLR SOFTWARE, S.L.", iban: "ES1201821025830208529279" },
    { centro: "FATIM ZAHRA TBER", iban: "ES1621000863270200864835" },
    { centro: "SAFONT-TRIA JOVÉ, LAURA", iban: "ES1121000884170200447459" },
    { centro: "POINT FIRE, S.L.", iban: "ES3321000976710200056861" },
    { centro: "MARTINEZ HERRAIZ, RAIMUNDA", iban: "ES7321003034122200469873" },
    { centro: "C.P. PONS I GALARZA, 75", iban: "ES1900810058850001337735" },
    { centro: "VELEZ LORENZO, SANDRA", iban: "ES9000810371140001651273" },
    { centro: "BRUN BOSCH, M ROSA", iban: "ES5121000824870102500850" },
    { centro: "OPTIMIZA CENTRO SERVICIOS COMPARTIDOS, S.L.", iban: "ES4100810005840002242429" },
    { centro: "C.P. JOAN PALLARES, 32", iban: "ES3200810055400006287438" },
    { centro: "C.P. PARETO, 31", iban: "ES6201823366600202149457" },
    { centro: "COMALER, S.L.", iban: "ES8121000555330202783754" },
    { centro: "ROCAS Y MARMOLES, S.A.", iban: "ES3401828732110208558244" },
    { centro: "C.P. BLAS FDEZ LIROLA, 36-38", iban: "ES8600810161750001780882" },
    { centro: "C.P. BLAS FDEZ LIROLA, 10", iban: "ES8121000445230100365892" },
    { centro: "UROANDROLOGIA BARCELONA, S.L.", iban: "ES3421004659280200345444" },
    { centro: "ALFA PRINTING, S.L.", iban: "ES4401820815800208018557" },
    { centro: "C.P. FRANCIA 52", iban: "ES3301829732180200067949" },
    { centro: "C.P. FRANCIA 15", iban: "ES1201829732170200057900" },
    { centro: "C.P. FRANCIA 54", iban: "ES7801829732130200076114" },
    { centro: "C.P. AV. EUROPA 11", iban: "ES8121000286970100062338" },
    { centro: "C.P. FRANCIA 50", iban: "ES1300811677110006300542" },
    { centro: "CERRAJERÍA ARCU, S.A.", iban: "ES0621003260222500000818" },
    { centro: "MARTIN & VALVERDE, S.C.P.", iban: "ES6421003423442200117277" },
    { centro: "ASESORIA CAMPALANS, S.C.C.L.", iban: "ES6620859318260335082141" },
    { centro: "TECNIARTE, S.A.", iban: "ES2521003178242200057877" },
    { centro: "GESPRO GESTION PROFESIONAL, S.C.C.L.", iban: "ES8800810161740001407445" },
    { centro: "C.P. BAILEN 107", iban: "ES1800810200290003874797" },
    { centro: "WUBOOK ALPHA SERVICES, S.L.", iban: "ES3200815224410001720975" },
    { centro: "PRODUCCIONES NEW BETA DISC, S.L.U.", iban: "ES9700494573052610003071" },
    { centro: "REMLE, S.A.", iban: "ES8601820812490101503964" },
    { centro: "GARAJE MIJARES-ORTELLS M VICTORIA", iban: "ES2020810288153300000174" },
    { centro: "C.P. GENERAL PRIM, 56-58 PARKING", iban: "ES4700811838410001000903" },
    { centro: "CENTRO DE ESTETICA INTEGRAL", iban: "ES5521004568180100455529" },
    { centro: "BARRIGA SERRANO, PAQUITA (OCCIDENT)", iban: "ES8021002450070200042778" },
    { centro: "GALTES I RODRÍGUEZ ASSEGURANCES, S.L.", iban: "ES8100494953072416114338" },
    { centro: "COSMÉTICOS NAMAX, S.L.", iban: "ES9621008636120200122400" },
    { centro: "KBOX SALES TOOLS, S.L.", iban: "ES4821000923710200268955" },
    { centro: "ANCO SISTEMAS DE GESTIÓN, S.A.", iban: "ES3921000679180200512931" },
    { centro: "TRANSPORTES BRAILLON", iban: "FR7616807004003719816221120" },
    { centro: "BERROSPI GAMIS, MONTSE", iban: "ES9630250017481400029992" },
    { centro: "C.P. AV. MERIDIANA 748 PK", iban: "ES1021000710900101001992" },
    { centro: "HOUARI, MERIYEM", iban: "ES7900190026654010050633" },
    { centro: "CODABAES, S.L.", iban: "ES6202340002504021098126" },
    { centro: "BORRAS AND MANGEN, S.L.", iban: "ES1001821015050202506930" },
    { centro: "PERREAU DE PINNINCK GONZÁLEZ, ADELA", iban: "ES4121000487020200044681" },
    { centro: "FARMACIA SESÉ BLANCAS, C.B.", iban: "ES5401820829370201531939" },
    { centro: "COMISSIO DE FESTES DE SANT ANDREU DEL PALOMAR", iban: "ES5321000804370200631307" },
    { centro: "SURYAPA, S.L.", iban: "ES9621000804310200764493" },
    { centro: "NETSOR 2020, S.L.", iban: "ES3221008636180200144210" },
    { centro: "SURYAPA, S.L.", iban: "ES9621000804310200764493" },
    { centro: "UDON BARCELONA, S.L.", iban: "ES1500815197510001066809" }
];

const PendientesRemesas = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        cuadrantesFacturadosArray,
        numeroCuadrantesFacturados
    } = useSelector(store => store.variablesPendientes);
    const calendarioAGestionar = useSelector(store => store.variablesCuadrantes.calendarioAGestionar);
    const {
        exitoGenerarRemesas,
        isRemesaComplete
    } = useSelector(store => store.variablesCuadrantesRemesas);
    const objetoConfiguracion = useSelector(store => store.variablesApp.objetoConfiguracion);
    const [arrayCuadrantesRemesa, setArrayCuadrantesRemesa] = useState([]);
    const [expandedAccordion, setExpandedAccordion] = useState(false);
    const [heightContenedoresGra, setHeightContenedoresGra] = useState(getHeightContenedoresGra(280));
    const [heighCambio, setHeighCambio] = useState({
        scroller: heightContenedoresGra - 90,
        accordion: 0
    });
    const [marcarTodosVisible, setMarcarTodosVisible] = useState(true);
    const [checked, setChecked] = useState({});
    const [alert, setAlert] = useState({});
    const [openSnack, setOpenSnack] = useState(false);
    const remesasRef = useRef();
    const [selectedIndexBotoRemesas, setSelectedIndexBotoRemesas] = useState(0);
    const [openBotoRemesas, setOpenBotoRemesas] = useState(false);
    const [anchorWidthBotoRemesas, setAnchorWidthBotoRemesas] = useState(0);

    //useEffect

    useEffect(() => {
        dispatch(obtenerConfiguracionAccion('configuracion', 1));
    }, [dispatch]);

    useEffect(() => {
        if (remesasRef.current) {
            setAnchorWidthBotoRemesas(remesasRef.current.offsetWidth);
        }
    }, [openBotoRemesas]);

    useEffect(() => {
        const resizeListener = () => {
            setHeightContenedoresGra(getHeightContenedoresGra(280));
            setHeighCambio({
                scroller: getHeightContenedoresGra(280) - 90,
                accordion: 0
            });
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    //temporal habilitat a canviar en 3 mesos

    // useEffect(() => {
    //     if (cuadrantesFacturadosArray.length > 0) {
    //         let cuadrantes = [];
    //         cuadrantesFacturadosArray.forEach((cuadrante, index) => {
    //             if (cuadrante.total?.procesado?.valor === "si") {
    //                 // Filtrar solo formas de pago de recibo domiciliado
    //                 const formaPago = cuadrante.total?.formaPago;
    //                 if (['RE', 'R1', 'R2', 'R3'].includes(formaPago)) {
    //                     const nombreSplitted = cuadrante.nombre.split("-");
    //                     const objeto = normalizarCuadrante({
    //                         ...cuadrante,
    //                         ['nombreCentro']: cuadrante.total.nombreCentro,
    //                         idCentro: nombreSplitted[2]
    //                     });
    //                     cuadrantes.push(objeto);
    //                 }
    //             }
    //         });
    //         cuadrantes.sort((a, b) => a.nombreCentro.localeCompare(b.nombreCentro));
    //         setArrayCuadrantesRemesa(cuadrantes);
    //     }
    // }, [cuadrantesFacturadosArray]);

    //temporal deshabilitat a canviar en 3 mesos

    useEffect(() => {
        if (cuadrantesFacturadosArray.length > 0) {
            let cuadrantes = [];
            cuadrantesFacturadosArray.forEach((cuadrante, index) => {
                if (cuadrante.total?.procesado?.valor === "si") {
                    const formaPago = cuadrante.total?.formaPago;
                    if (['RE', 'R1', 'R2', 'R3'].includes(formaPago)) {
                        const nombreSplitted = cuadrante.nombre.split("-");

                        // Preparar el cuadrante con IBAN
                        let cuadranteConIban = { ...cuadrante };

                        // Si no tiene IBAN, buscar en la constante
                        if (!cuadrante.total.iban || cuadrante.total.iban.trim() === '') {
                            const centroEncontrado = arrayIbans.find(item =>
                                item.centro === cuadrante.total.nombreCentro
                            );

                            if (centroEncontrado && centroEncontrado.iban) {
                                // Se encontró el IBAN en la constante
                                cuadranteConIban.total = {
                                    ...cuadrante.total,
                                    iban: centroEncontrado.iban
                                };
                            } else {
                                // No se encontró ni en el cuadrante ni en la constante
                                // Dejar el IBAN como null o vacío
                                cuadranteConIban.total = {
                                    ...cuadrante.total,
                                    iban: null
                                };
                            }
                        }

                        const objeto = normalizarCuadrante({
                            ...cuadranteConIban,
                            ['nombreCentro']: cuadranteConIban.total.nombreCentro,
                            idCentro: nombreSplitted[2]
                        });
                        cuadrantes.push(objeto);
                    }
                }
            });
            cuadrantes.sort((a, b) => a.nombreCentro.localeCompare(b.nombreCentro));
            setArrayCuadrantesRemesa(cuadrantes);
        }
    }, [cuadrantesFacturadosArray]);

    useEffect(() => {
        if (exitoGenerarRemesas) {
            setAlert({
                mensaje: "Remesa generada correctamente. En la carpeta Descargas encontrarás el archivo XML con los datos de la remesa.",
                tipo: 'success'
            });
            setOpenSnack(true);
        };
    }, [exitoGenerarRemesas]);

    useEffect(() => {
        const procesarRemesaFinalizado = async () => {
            try {
                const resultadoActualizacion = await dispatch(actualizarCuadrantesRemesasAccion());
                if (resultadoActualizacion.payload) {
                    dispatch(reseteaRemesasAccion());
                    setExpandedAccordion(false);
                    setHeighCambio((prev) => ({
                        scroller: prev.scroller + 70,
                        accordion: prev.accordion
                    }));
                    dispatch(vaciarDatosPendientesAccion());
                    dispatch(vaciarDatosCentrosAccion());
                    selectNoneChecked();
                    setSelectedIndexBotoRemesas(0);
                }
            } catch (error) {
                console.error('Error en el procesamiento de mailing:', error);
            }
        };
        if (isRemesaComplete) {
            procesarRemesaFinalizado();
        }
    }, [isRemesaComplete]);

    //funciones

    const normalizarCuadrante = (cuadrante) => {
        return {
            ...cuadrante,
            total: {
                ...cuadrante.total,
                remesado: cuadrante.total.remesado || 'no'
            }
        };
    };

    const handleChangeChecked = (e) => {
        setChecked({ ...checked, [e.target.name]: e.target.checked });
    };

    const handleCuadrantesFacturados = (centro) => {
        dispatch(setCentroAccion(centro));
        dispatch(obtenerCentroAccion('centros', centro));
        dispatch(cambioEstadoInicioCuadrantesAccion(false));
        dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
        //dispatch(registrarIntervencionCuadranteNuevoAccion(true));
        dispatch(venimosDeRegistradosAccion(true));
    };

    const handleCambioAccordionPendientes = (expandedAccordion, panel) => {
        setExpandedAccordion(expandedAccordion ? panel : true);
        if (expandedAccordion) {
            setHeighCambio({
                scroller: heighCambio.scroller - 70,
                accordion: heighCambio.accordion + 0
            });
        } else {
            setHeighCambio({
                scroller: heighCambio.scroller + 70,
                accordion: heighCambio.accordion - 0
            });
        };
    };

    const selectAllChecked = () => {
        const cuadrantesFiltrados = retornaCuadrantesFiltrados();
        const object = cuadrantesFiltrados.reduce((acc, cuadrante) => {
            if (cuadrante.total.remesado === 'no' &&
                cuadrante.total.iban &&
                cuadrante.total.iban.trim() !== '') {
                acc[`checked-${cuadrante.id}`] = true;
            }
            return acc;
        }, {});
        setChecked(object);
        setMarcarTodosVisible(false);
    };

    const selectNoneChecked = () => {
        const object = cuadrantesFacturadosArray.reduce((acc, cuadrante) => {
            acc[`checked-${cuadrante.id}`] = false;
            return acc;
        }, {});
        setChecked(object);
        setMarcarTodosVisible(true);
    };

    const retornaCantidadChecked = () => {
        const cuadrantesFiltrados = retornaCuadrantesFiltrados();
        const idsFiltered = cuadrantesFiltrados.map(c => `checked-${c.id}`);
        return Object.entries(checked)
            .filter(([key, value]) => idsFiltered.includes(key) && value === true)
            .length;
    };

    const retornaDisabledChecked = () => !Object.values(checked).includes(true);

    const retornaDisabledCheckedItem = (total) => {
        return total.remesado === "si" || !total.iban?.trim();
    };

    const handleToggleBotoRemesas = () => {
        setOpenBotoRemesas((prevOpen) => !prevOpen);
    };

    const handleCloseBotoRemesas = (event) => {
        if (remesasRef.current && remesasRef.current.contains(event.target)) {
            return;
        }
        setOpenBotoRemesas(false);
    };

    const handleMenuItemClickBotoRemesas = (event, index) => {
        setSelectedIndexBotoRemesas(index);
        setOpenBotoRemesas(false);
        selectNoneChecked();
    };

    const handleGenerarLoteRemesados = () => {
        if (selectedIndexBotoRemesas === 0) {
            return;
        }
        // Validar que existe la configuración
        if (!objetoConfiguracion || !objetoConfiguracion.cuenta1 || !objetoConfiguracion.cuenta2) {
            setAlert({
                mensaje: "No se ha cargado la configuración bancaria. Por favor, recarga la página.",
                tipo: 'error'
            });
            setOpenSnack(true);
            return;
        }
        const cuadrantesFiltrados = retornaCuadrantesFiltrados();
        const arrayCuadrantesRemesaDef = cuadrantesFiltrados.filter(cuadrante =>
            checked[`checked-${cuadrante.id}`] === true &&
            cuadrante.total?.iban &&
            cuadrante.total.iban.trim() !== ""
        );
        const [anyo, mes] = calendarioAGestionar.split("-");

        dispatch(gestionarRemesaLoteAccion(arrayCuadrantesRemesaDef, anyo, mes, optionsRemesas[selectedIndexBotoRemesas].value, objetoConfiguracion));
    };

    const retornaCuadrantesFiltrados = () => {
        const numeroSeleccionado = optionsRemesas[selectedIndexBotoRemesas].numero;
        if (!numeroSeleccionado) {
            return [];
        }
        return arrayCuadrantesRemesa.filter(cuadrante =>
            cuadrante.total?.diaPago === numeroSeleccionado
        );
    };

    //retorno componentes

    const retornaCuadranteFacturado = (cuadrante, index) => {
        const nombreSplitted = cuadrante.nombre.split("-");
        return (
            <Box
                key={'listaCuadrantes' + index}
            >
                <ListItem
                    className={cuadrante.total.remesado === 'si' ? classes.casillaRemesasRemesado : classes.casillaRemesas}
                    style={{ display: 'flex', alignItems: 'flex-start' }}
                >
                    <Checkbox
                        edge="start"
                        checked={checked['checked-' + cuadrante.id] || false}
                        name={'checked-' + cuadrante.id}
                        onChange={handleChangeChecked}
                        style={{ marginTop: -3 }}
                        disabled={retornaDisabledCheckedItem(cuadrante.total)}
                    />
                    <ListItemText
                        primary={
                            <span style={{
                                color: cuadrante.total.remesado === 'si' ? 'green' : 'inherit',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                {cuadrante.total.remesado === 'si' && (
                                    <CheckIcon
                                        style={{
                                            fontSize: 18,
                                            marginRight: 8,
                                            color: 'green'
                                        }}
                                    />
                                )}
                                {cuadrante.total.subNombreCentro
                                    ? cuadrante.nombreCentro + " - " + cuadrante.total.subNombreCentro
                                    : cuadrante.nombreCentro}
                            </span>
                        }
                        secondary={
                            cuadrante.total.remesado === 'si' ? (
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        style={{ color: 'green' }}
                                    >
                                        Remesado el {cuadrante.actualizacion}
                                    </Typography>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                    >
                                        Emitido el {cuadrante.actualizacion}
                                    </Typography>
                                    <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        {cuadrante.total.procesado.numR ? (
                                            <Typography
                                                component="span"
                                                variant="body2"
                                            > {'Recibo nº ' + cuadrante.total.procesado.numR}
                                            </Typography>
                                        ) : (
                                            cuadrante.total.mailEnviado === "si" ? (
                                                <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end' }}>
                                                    <MailIcon
                                                        style={{ fontSize: 17 }}
                                                    />
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        style={{ marginLeft: 5 }}
                                                    >
                                                        {'Factura nº ' + cuadrante.total.procesado.numF + ' - enviada por mail'}
                                                    </Typography>
                                                </span>
                                            ) : (
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                > {'Factura nº ' + cuadrante.total.procesado.numF}
                                                </Typography>
                                            )
                                        )}
                                    </span>
                                </Fragment>
                            )}
                        onClick={() => handleCuadrantesFacturados(parseInt(nombreSplitted[2]))}
                    />
                    <ListItemSecondaryAction>
                        <ExitToAppIcon
                            className={classes.gris}
                        />
                    </ListItemSecondaryAction>
                </ListItem >
            </Box >
        )
    };

    return (
        <div>
            {/* {console.log(props.prOpenLoading)}  */}
            <Grid
                spacing={1}
                container
                direction="column"
                alignItems="center"
                justify="center"
                p={2}
                className={classes.rootPendientes}
                style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra, width: props.prWidthContenedores + 10 }}
            >
                {props.prOpenLoading ? (
                    <Box
                        className={classes.centrado}
                    >
                        <CircularProgress />
                    </Box>
                ) : (numeroCuadrantesFacturados < 1 ? (
                    <Box p={3} style={{ width: '100%', minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra, marginTop: 0, marginLeft: 0 }}>
                        <Alert severity="info">No hay cuadrantes facturados por gestionar.</Alert>
                    </Box>
                ) : (
                    <>
                        <Accordion
                            expanded={expandedAccordion === 'panelPendientes'}
                            className={classes.remesa}
                            style={{ marginTop: (heighCambio.accordion + 20), width: '100%', marginLeft: 25, marginRight: 15, marginBottom: -10 }}
                            onChange={(e, expandedAccordion) => { handleCambioAccordionPendientes(expandedAccordion, 'panelPendientes') }}
                            disabled={!controlActualizacionesPorFecha("2024-5", calendarioAGestionar)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className={classes.blanc} />}
                            >
                                <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>Procesar lote de remesas</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container style={{ paddingTop: 5, paddingBottom: 0 }}>
                                    <Grid item md={12} lg={6}>
                                        {selectedIndexBotoRemesas !== 0 && (
                                            marcarTodosVisible ? (
                                                <Chip
                                                    variant='outlined'
                                                    style={{ padding: 5, marginTop: 5 }}
                                                    icon={<CheckBoxOutlinedIcon />}
                                                    label={`Seleccionar todos ${optionsRemesas[selectedIndexBotoRemesas].special}`}
                                                    clickable
                                                    onClick={() => selectAllChecked()}
                                                />
                                            ) : (
                                                <Chip
                                                    variant='outlined'
                                                    style={{ padding: 5, marginTop: 5 }}
                                                    icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                    label={`Desmarcar todos ${optionsRemesas[selectedIndexBotoRemesas].special}`}
                                                    clickable
                                                    onClick={() => selectNoneChecked()}
                                                />
                                            )
                                        )}
                                    </Grid>
                                    <Grid item md={12} lg={6}>
                                        <ButtonGroup
                                            variant="contained"
                                            ref={remesasRef}
                                            fullWidth
                                            style={{
                                                marginRight: 8,
                                                '& .MuiButtonGroupGrouped': {
                                                    minWidth: 'auto',
                                                }
                                            }}
                                        >
                                            <Button
                                                style={{
                                                    flex: 1,
                                                    textTransform: 'none',
                                                    justifyContent: 'flex-start',
                                                }}
                                                onClick={handleGenerarLoteRemesados}
                                                disabled={retornaDisabledChecked() || selectedIndexBotoRemesas === 0}
                                            >
                                                {selectedIndexBotoRemesas === 0
                                                    ? optionsRemesas[selectedIndexBotoRemesas].label
                                                    : `${optionsRemesas[selectedIndexBotoRemesas].label} (${retornaCantidadChecked()})`
                                                }
                                            </Button>
                                            <Button
                                                size="small"
                                                style={{
                                                    minWidth: 48,
                                                    maxWidth: 48,
                                                }}
                                                onClick={handleToggleBotoRemesas}
                                            >
                                                <ArrowDropDownIcon />
                                            </Button>
                                        </ButtonGroup>
                                        <Popper
                                            open={openBotoRemesas}
                                            anchorEl={remesasRef.current}
                                            role={undefined}
                                            transition
                                            disablePortal
                                            style={{
                                                zIndex: 1300,
                                                width: anchorWidthBotoRemesas
                                            }}
                                            placement="bottom-start"
                                        >
                                            {({ TransitionProps, placement }) => (
                                                <Grow
                                                    {...TransitionProps}
                                                    style={{
                                                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                                    }}
                                                >
                                                    <Paper>
                                                        <ClickAwayListener
                                                            onClickAway={handleCloseBotoRemesas}
                                                        >
                                                            <MenuList>
                                                                {optionsRemesas.map((option, index) => (
                                                                    <MenuItem
                                                                        key={option.value}
                                                                        selected={index === selectedIndexBotoRemesas}
                                                                        onClick={(event) => handleMenuItemClickBotoRemesas(event, index)}
                                                                    >
                                                                        {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </MenuList>
                                                        </ClickAwayListener>
                                                    </Paper>
                                                </Grow>
                                            )}
                                        </Popper>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Box
                            className={classes.scrollable}
                            style={{ width: props.prWidthContenedores, height: heighCambio.scroller, margin: 10 }}
                        >
                            <List dense={true}
                                style={{ padding: 15 }}>
                                {retornaCuadrantesFiltrados().map((cuadrante, index) => (
                                    retornaCuadranteFacturado(cuadrante, index)
                                ))}
                            </List>
                        </Box>
                    </>
                ))}
                <CustomSnack
                    open={openSnack}
                    message={alert.mensaje}
                    severity={alert.tipo}
                    tipoCuadrante={false}
                    setOpenSnack={setOpenSnack}
                />
            </Grid>
        </div>
    )
}

export default PendientesRemesas
