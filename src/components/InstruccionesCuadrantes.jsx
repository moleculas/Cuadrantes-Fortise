import React, { useState, Fragment, useEffect } from 'react';
import Constantes from "../constantes";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { SRLWrapper } from "simple-react-lightbox";
import LinkIcon from '@material-ui/icons/Link';
import { HashLink } from 'react-router-hash-link';
import Alert from '@material-ui/lab/Alert';

//imágenes
import c1 from '../images/instrucciones/cuadrantes/c_1.jpg';
import c2 from '../images/instrucciones/cuadrantes/c_2.jpg';
import c3 from '../images/instrucciones/cuadrantes/c_3.jpg';
import c4 from '../images/instrucciones/cuadrantes/c_4.jpg';
import c5 from '../images/instrucciones/cuadrantes/c_5.jpg';
import c6 from '../images/instrucciones/cuadrantes/c_6.jpg';
import c7 from '../images/instrucciones/cuadrantes/c_7.jpg';
import c8 from '../images/instrucciones/cuadrantes/c_8.jpg';
import c9 from '../images/instrucciones/cuadrantes/c_9.jpg';
import c10 from '../images/instrucciones/cuadrantes/c_10.jpg';
import c11 from '../images/instrucciones/cuadrantes/c_11.jpg';
import c12 from '../images/instrucciones/cuadrantes/c_12.jpg';
import c13 from '../images/instrucciones/cuadrantes/c_13.jpg';
import c14 from '../images/instrucciones/cuadrantes/c_14.jpg';
import c15 from '../images/instrucciones/cuadrantes/c_15.jpg';
import c16 from '../images/instrucciones/cuadrantes/c_16.jpg';
import c17 from '../images/instrucciones/cuadrantes/c_17.jpg';
import c18 from '../images/instrucciones/cuadrantes/c_18.jpg';
import c19 from '../images/instrucciones/cuadrantes/c_19.jpg';
import c20 from '../images/instrucciones/cuadrantes/c_20.jpg';
import c21 from '../images/instrucciones/cuadrantes/c_21.jpg';
import c22 from '../images/instrucciones/cuadrantes/c_22.jpg';
import c23 from '../images/instrucciones/cuadrantes/c_23.jpg';
import c24 from '../images/instrucciones/cuadrantes/c_24.jpg';
import c25 from '../images/instrucciones/cuadrantes/c_25.jpg';
import c26 from '../images/instrucciones/cuadrantes/c_26.jpg';
import c27 from '../images/instrucciones/cuadrantes/c_27.jpg';

//carga componentes

//estilos
import Clases from "../clases";

//importaciones acciones

//constantes
const numeracioInstruccions = Constantes.NUMERACIO_INSTRUCCIONS;

const getHeightScrollable = () => (window.innerHeight - 315) || (document.documentElement.clientHeight - 315) || (document.body.clientHeight - 315);
const options = {
    caption: {
        showCaption: false
    },
    thumbnails: {
        showThumbnails: false
    },
    buttons: {
        showAutoplayButton: false,
        showCloseButton: true,
        showDownloadButton: true,
        showFullscreenButton: true,
        showNextButton: false,
        showPrevButton: false,
        showThumbnailsButton: false
    }
};

const InstruccionesCuadrantes = () => {

    const classes = Clases();

    //states

    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());

    //useEffect   

    useEffect(() => {
        const resizeListener = () => {
            setHeightScrollable(getHeightScrollable());
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    //funciones    

    //dialog    

    return (
        <div>
            <Grid container>
                <Grid item lg={12} sm={12} xs={12} className={classes.scrollable} style={{ height: heightScrollable }}>
                    <Box
                        className={classes.paper}
                        style={{ marginTop: 5, marginRight: 15, padding: 20 }}
                    >
                        <Fragment>
                            {/* Elemento 1 */}
                            <div className={classes.tituloInstrucciones} id="c1">
                                Ciclo de vida de un cuadrante
                                <HashLink to={'#c1'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">El ciclo de vida de un cuadrante es PENDIENTE / REGISTRADO / FACTURADO (sin haber emitido documento factura o recibo) / FACTURADO (con documento factura o recibo emitidos). El ciclo se puede controlar: </Typography>
                            <br />
                            <Typography component="span" variant="body2"><b>Desde la pantalla de inicio de la sección cuadrantes:</b></Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> Cuadrantes pendientes (No se han cargado ni registrado, todo cuadrante pendiente se cargará con los datos que provienen de la ficha Centro del correspondiente cuadrante).</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c2}>
                                    <img style={{ marginTop: 25, width: '90%' }} src={c2} alt="c2" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> Cuadrantes registrados (Se ha intervenido en el cuadrante y la intervención se ha registrado en la base de datos. El cuadrante se puede modificar en cualquier momento accediendo al mismo desde esta pantalla).</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c3}>
                                    <img style={{ marginTop: 25, width: '90%' }} src={c3} alt="c3" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[3]}</Typography> Cuadrantes facturados sin documento (Los datos del cuadrante son definitivos y se registra como facturado en la base de datos).</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[4]}</Typography> Cuadrantes facturados con documento (Se ha emitido documento factura o recibo según corresponda y se ha asignado numeración para ese documento).</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c4}>
                                    <img style={{ marginTop: 25, width: '90%' }} src={c4} alt="c4" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><b>Desde la etiqueta superior en cada ficha cuadrante:</b></Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> Cuadrantes pendientes. La etiqueta muestra el nombre del centro y el ESTADO del cuadrante que será <b>Pendiente de Registrar Cuadrante</b>. El indicador de la parte inferior derecha de la etiqueta parpadeará en color rojo.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c5}>
                                    <img style={{ marginTop: 25, width: '100%' }} src={c5} alt="c5" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Al desplegar el botón Gestión Cuadrantes el único procedimiento activo será <b>Registrar Cuadrante</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c6}>
                                    <img style={{ marginTop: 25 }} src={c6} alt="c6" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> Cuadrantes registrados. La etiqueta muestra el nombre del centro, el ESTADO del cuadrante que será <b>Registrado</b>, la marca horaria del momento en que se registró más el identificador de usuario que lo registró. El indicador de la parte inferior derecha de la etiqueta parpadeará en color naranja.</Typography>
                            <br />
                            <br />
                            <Alert severity="info"><b>Nota: </b>Cualquier modificación a nivel de configuración de centros en fichas centros (cambios de horario, cambios de trabajadores) o cualquier modificación a nivel de configuración de trabajadores en fichas trabajadores (gestión de bajas), no se verá reflejada en un cuadrante registrado. Para que el cambio aparezca reflejado, se deberán utilizar los procdimientos Actualizar trabajador o Resetear Cuadrante.</Alert>
                            <SRLWrapper options={options}>
                                <a href={c7}>
                                    <img style={{ marginTop: 25, width: '100%' }} src={c7} alt="c7" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Si no se efectúan cambios en el cuadrante registrado al desplegar el botón Gestión Cuadrantes los procedimientos activos serán:</Typography>
                            <br />
                            <Typography component="span" variant="body2">Si el cuadrante es del tipo Empresas: <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> <b>Facturar → Registrar Factura</b> - <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> <b>Resetear Cuadrante</b> (Devolver el cuadrante al estado Pendiente. Con este procedimiento todos los datos registrados se perderán y se cargará la configuración inicial del cuadrante).</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c8}>
                                    <img style={{ marginTop: 25 }} src={c8} alt="c8" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Si el cuadrante es del tipo Pisos: <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> <b>Facturar → Registrar Recibo</b> - <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> <b>Resetear Cuadrante</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c12}>
                                    <img style={{ marginTop: 25 }} src={c12} alt="c12" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Si se han efectuado cambios en el cuadrante registrado la etiqueta mostrará el nombre del centro y el ESTADO del cuadrante que será <b>Pendiente de Actualizar Cuadrante</b>. El indicador de la parte inferior derecha de la etiqueta parpadeará en color rojo.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c15}>
                                    <img style={{ marginTop: 25, width: '100%' }} src={c15} alt="c15" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Al desplegar el botón Gestión Cuadrantes los procedimientos activos serán 1 <b>Actualizar Cuadrante</b> - 2 <b>Resetear Cuadrante</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c9}>
                                    <img style={{ marginTop: 25 }} src={c9} alt="c9" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[3]}</Typography> Cuadrantes facturados. La etiqueta muestra el nombre del centro, el ESTADO del cuadrante que será <b>Facturado</b>, la marca horaria del momento en que se registró más el identificador de usuario que lo registró. El indicador de la parte inferior derecha de la etiqueta parpadeará en color verde. A partir de aquí la cantidad facturada en el cuadrante ya se contempla como ingresos mensuales. (Se refleja en las gráficas).</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c10}>
                                    <img style={{ marginTop: 25, width: '100%' }} src={c10} alt="c10" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Si no se efectúan cambios en el cuadrante registrado al desplegar el botón Gestión Cuadrantes los procedimientos activos serán:</Typography>
                            <br />
                            <Typography component="span" variant="body2">Si el cuadrante es del tipo Empresas: <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> <b>Facturar → Generar Archivos → Procesar</b> - <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> <b>Resetear Cuadrante</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c11}>
                                    <img style={{ marginTop: 25 }} src={c11} alt="c11" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Si el cuadrante es del tipo Pisos: <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> <b>Facturar → Generar Recibo → Emitir recibo</b> - <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> <b>Resetear Cuadrante</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c16}>
                                    <img style={{ marginTop: 25 }} src={c16} alt="c16" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Si se han efectuado cambios en el cuadrante facturado la etiqueta mostrará: </Typography>
                            <br />
                            <Typography component="span" variant="body2">Si el cuadrante es del tipo Empresas: el nombre del centro y el ESTADO del cuadrante que será <b>Pendiente de Registrar Factura</b>. El indicador de la parte inferior derecha de la etiqueta parpadeará en color rojo.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c14}>
                                    <img style={{ marginTop: 25, width: '100%' }} src={c14} alt="c14" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Si el cuadrante es del tipo Pisos: el nombre del centro y el ESTADO del cuadrante que será <b>Pendiente de Registrar Recibo</b>. El indicador de la parte inferior derecha de la etiqueta parpadeará en color rojo.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c13}>
                                    <img style={{ marginTop: 25, width: '100%' }} src={c13} alt="c13" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Al desplegar el botón Gestión Cuadrantes los procedimientos activos serán:</Typography>
                            <br />
                            <Typography component="span" variant="body2">Si el cuadrante es del tipo Empresas: <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> <b>Facturar → Registrar Factura</b> - <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> <b>Resetear Cuadrante</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c8}>
                                    <img style={{ marginTop: 25 }} src={c8} alt="c8" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Si el cuadrante es del tipo Pisos: <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> <b>Facturar → Registrar Recibo</b> - <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> <b>Resetear Cuadrante</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c12}>
                                    <img style={{ marginTop: 25 }} src={c12} alt="c12" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Una vez se ha emitido el documento correspondiente al cuadrante facturado (recibo o factura) la etiqueta se mostrará de color verde con el nombre del centro, el ESTADO del cuadrante que será <b>Emitido</b>, la marca horaria del momento en que se registró más el identificador de usuario que lo registró. El indicador de la parte inferior derecha de la etiqueta parpadeará en color verde.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c17}>
                                    <img style={{ marginTop: 25, width: '100%' }} src={c17} alt="c17" />
                                </a>
                            </SRLWrapper>
                            <br />
                            {/* Elemento 2 */}
                            <div className={classes.tituloInstrucciones} id="c2">
                                Crear intervalo de festivos
                                <HashLink to={`#c2`} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Para generar un intervalo de festivos: </Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> Pulsar el botón <b>Ajustes cuadrante</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> En el apartado <b>Gestión de festivos</b>. Seleccionar <b>Inicio período</b>, <b>Fin período</b> y <b>Tipo festivo</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[3]}</Typography> Pulsar botón <b>Registrar cambio</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c1}>
                                    <img style={{ marginTop: 25 }} src={c1} alt="c1" />
                                </a>
                            </SRLWrapper>
                            <br />
                            {/* Elemento 3 */}
                            <div className={classes.tituloInstrucciones} id="c3">
                                Actualizar estado trabajador
                                <HashLink to={`#c3`} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Cualquier cambio que se realice en la ficha del trabajador (añadir una baja, p. ej.) no se reflejará en un cuadrante ya registrado. Para actualizar el estado de un trabajador y hacer visible los cambios que se hayan efectuado (siempre hablamos de un cuadrante registrado):</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> Seleccionar la columna del trabajador a actualizar y desplegar el módulo superior (Nombre). Pulsar el botón <b>Actualizar trabajador</b>. De esta manera, cargaremos la última configuración del trabajador y se implementará el período de baja configurado en la ficha del trabajador sin necesidad de Resetear Cuadrante.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c18}>
                                    <img style={{ marginTop: 25 }} src={c18} alt="c18" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> Si el trabajador va seguido de un suplente que lo complementa, se deberá hacer el mismo proceso en la columna del suplente para actualizar los datos en función a la nueva columna del trabajador. De otro modo se generaría una incongruencia en el cómputo de horas.</Typography>
                            <br />
                            <br />
                            {/* Elemento 4 */}
                            <div className={classes.tituloInstrucciones} id="c4">
                                Asignar horas sin coste
                                <HashLink to={`#c4`} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Para asignar un intervalo de horas que no compute coste a cualquier casilla de día horaria en columnas trabajadores o suplentes:</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> Pulsar la casilla que se quiera editar y pulsar el botón <b>Añadir variación</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c19}>
                                    <img style={{ marginTop: 25 }} src={c19} alt="c19" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> En el desplegable que aparece <b>Variaciones</b> <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> elegir <b>Sin coste</b> y <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> pulsar el botón <b>Registrar cambio</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c20}>
                                    <img style={{ marginTop: 25 }} src={c20} alt="c20" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[3]}</Typography> El cómputo de horas del cuadrante se actualizará en función a la variación implementada. El rango horario determinado no intervendrá en el cómputo total de horas y la casilla mostrará un icono que señalará el tipo de variación (Sin coste).</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c21}>
                                    <img style={{ marginTop: 25 }} src={c21} alt="c21" />
                                </a>
                            </SRLWrapper>
                            <br />
                            {/* Elemento 5 */}
                            <div className={classes.tituloInstrucciones} id="c5">
                                Bloquear cómputo de horas
                                <HashLink to={`#c5`} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">En la gestión de un cuadrante se puede presentar el escenario en el que no se desee que los cambios efectuados en el cuadrante intervengan en el cómputo general de horas. Dicho escenario se replicaría en cuadrantes de tipo <b>Mensual pactado</b> o en la gestión de <b>Servicios Extra</b> de un cuadrante.</Typography>
                            <br />
                            <Typography component="span" variant="body2">Para bloquear el cómputo de horas de un cuadrante tipo Mensual pactado:</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> Pulsar el botón <b>Ajustes cuadrante</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> Seleccionar la casilla <b>Bloquear cálculo cómputo Mensual Pactado</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[3]}</Typography> Pulsar botón <b>Registrar cambio</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c22}>
                                    <img style={{ marginTop: 25 }} src={c22} alt="c22" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Para bloquear el cómputo de horas de los Servicios Extra de un cuadrante:</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> Pulsar el botón <b>Ajustes cuadrante</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> Seleccionar la casilla <b>Bloquear cálculo cómputo Servicios Extra</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[3]}</Typography> Pulsar botón <b>Registrar cambio</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c23}>
                                    <img style={{ marginTop: 25, width: '100%' }} src={c23} alt="c23" />
                                </a>
                            </SRLWrapper>
                            <br />
                            {/* Elemento 6 */}
                            <div className={classes.tituloInstrucciones} id="c6">
                                Revertir secuencia semanas
                                <HashLink to={`#c6`} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Todo centro registrado que tenga implementada la configuración horaria quincenal (Semana Sí, Semana No), por defecto generará los cuadrantes empezando por la primera semana. Es posible que esta configuración no se corresponda con la realidad en ciertos meses. Desde la ficha cuadrante se puede revertir esta secuencia para adaptarla a la configuración del mes sin necesidad de bloquear cálculos o recomponer casillas de horarios.</Typography>
                            <br />
                            <Typography component="span" variant="body2">Para cambiar la secuencia quincenal Semana Sí, Semana No:</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> Pulsar el botón <b>Ajustes cuadrante</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> Pulsar el interruptor <b>Cambio secuencia Semana Sí, Semana No</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[3]}</Typography> Pulsar botón <b>Registrar cambio</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c24}>
                                    <img style={{ marginTop: 25 }} src={c24} alt="c24" />
                                </a>
                            </SRLWrapper>
                            <br />
                            {/* Elemento 7 */}
                            <div className={classes.tituloInstrucciones} id="c7">
                                Horas sustitución festivos
                                <HashLink to={`#c7`} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Para asignar un intervalo de horas en cuadrantes tipo <b>Mensual Pactado</b> que no interese computar porque es una sustitución de días festivos. En cualquier columna de trabajador o suplente:</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> Pulsar la casilla que se quiera editar y pulsar el botón <b>Añadir variación</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c19}>
                                    <img style={{ marginTop: 25 }} src={c19} alt="c19" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> En el desplegable que aparece <b>Variaciones</b> <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> elegir <b>Sustitución festivos</b> y <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> pulsar el botón <b>Registrar cambio</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c25}>
                                    <img style={{ marginTop: 25 }} src={c25} alt="c25" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[3]}</Typography> El cómputo de horas del cuadrante se actualizará en función a la variación implementada. El rango horario determinado no intervendrá en el cómputo total de horas y la casilla mostrará un icono que señalará el tipo de variación (Sustitución festivos).</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c26}>
                                    <img style={{ marginTop: 25 }} src={c26} alt="c26" />
                                </a>
                            </SRLWrapper>
                            <br />
                            {/* Elemento 8 */}
                            <div className={classes.tituloInstrucciones} id="c8">
                                Tipos de festivos
                                <HashLink to={`#c8`} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Todo cuadrante cargará automáticamente los festivos anuales que correspondan por calendario laborar. Alternativamente, se podrán gestionar festivos concretos desde el mismo cuadrante. Para hacerlo:</Typography>
                            <br />
                            <Typography component="span" variant="body2">Al pulsar cualquier casilla Días (primera columna de todo cuadrante), elegir la opción deseada dels desplegable.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={c27}>
                                    <img style={{ marginTop: 25 }} src={c27} alt="c27" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> LABORAL: Sirve para devolver a la fila seleccionada el estado laboral en el caso que previamente se haya configurado como festivo. La fila afectada retornará los intervalos horarios si los tuviera.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> FESTIVO: Al seleccionar esta opción la fila afectada correspondiente al día elegido eliminará los intervalos horarios y ninguna casilla de la fila se podrá editar. Si el cuadrante responde a la configuración <b>precio/hora</b> en el cómputo horario se habrán restado las horas que contemple el día festivo. Si el cuadrante responde a la configuración <b>Mensual pactado</b> el cómputo horario no se verá afectado por las horas que se hayan restado de la correspondiente fila, a no ser que el cuadrante esté configurado con la excepción <b>Festivos restan cómputo de horas</b>. Ej: Cuadrante BILANX.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[3]}</Typography> CIERRE CENTRO: Al seleccionar esta opción la fila afectada correspondiente al día elegido eliminará los intervalos horarios y ninguna casilla de la fila se podrá editar. Todo cuadrante restará las horas correspondientes del cómputo horario.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[4]}</Typography> CIERRE CENTRO FACTURAR: Al seleccionar esta opción la fila afectada correspondiente al día elegido eliminará los intervalos horarios y ninguna casilla de la fila se podrá editar. Si el cuadrante responde a la configuración <b>precio/hora</b> en el cómputo horario se habrán restado las horas que contemple el día festivo. Si el cuadrante responde a la configuración <b>Mensual pactado</b> el cómputo horario no se verá afectado por las horas que se hayan restado de la correspondiente fila.</Typography>
                            <br />
                        </Fragment>
                    </Box>
                </Grid>
            </Grid>
            {/* {console.log(valuesFormConfiguracion)} */}
        </div>
    )
}

export default InstruccionesCuadrantes
