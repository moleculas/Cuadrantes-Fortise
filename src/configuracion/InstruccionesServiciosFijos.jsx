import React, { useState, Fragment, useEffect } from 'react';
import Constantes from "../constantes";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { SRLWrapper } from "simple-react-lightbox";
import LinkIcon from '@material-ui/icons/Link';
import { HashLink } from 'react-router-hash-link';

//imágenes
import v1 from '../images/instrucciones/varios/v_1.jpg';

//carga componentes

//estilos
import Clases from "../clases";

//importaciones acciones

//constantes
const numeracioInstruccions = Constantes.NUMERACIO_INSTRUCCIONS;

const getHeightScrollable = () => (window.innerHeight - 320) || (document.documentElement.clientHeight - 320) || (document.body.clientHeight - 310);
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

const InstruccionesServiciosFijos = () => {

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
            <Grid container >
                <Grid item lg={12} sm={12} xs={12} className={classes.scrollable} style={{ height: heightScrollable }}>
                    <Box
                        className={classes.paper}
                        style={{ marginTop: 5, marginRight: 15, padding: 20 }}
                    >
                        <Fragment>
                            {/* Elemento 1 */}
                            <div className={classes.tituloInstrucciones} id="sf1">
                                Gestión horas Servicios Extra
                                <HashLink to={'#sf1'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">La gestión de las horas trabajadas por trabajor en Servicio extra se realiza directamente en el cuadrante.</Typography>
                            <br />                           
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> Pulsar el día en que se quieren registrar horas en un trabajador extra. Se abrira un objeto popup que permite registrar las horas realizadas calculando los datos entrados en la casilla inicio y la casilla fin. Es un registro tipo RANGO de HORAS. Entrar hora vinicio, hora fin y pulsar botón <b>REGISTRAR</b>. Es posible resetear la casilla pulsando el botón superior derecho <b>Resetear casilla</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2">El registro de horas se establecerá esté el cuadrante en estado PENDIENTE, REGISTRADO o FACTURADO, es indiferente. Si el cuadrante se actualiza las horas de los trabajadores implicados se actualizarán en base a la última intervención realizada en el cuadrante.</Typography>
                            <br />          
                            {/* Elemento 1 */}
                            <div className={classes.tituloInstrucciones} id="sf2">
                                Gestión Servicios Extra Personalizados
                                <HashLink to={'#sf2'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">La gestión de los Servicios Extra Personalizados se realiza directamente en el cuadrante.</Typography>
                            <br />                           
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> Para crear un Servicio Extra personalizado pulsar el botón de acceso (con forma de campana) a la configuración de Servicios Extra situado en la barra lateral del cuadrante. Una vez abierto el objeto popup con la configuración de los Servicios Extra, pulsar el botón <b>SERVICIO PERSONALIZADO</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> Una vez pulsado el botón se generará automáticamente un ítem para rellenar (diferenciado del resto de servicios extra por el fondo verde). Se deberá completar los campos <b>Descripción</b>, <b>Precio</b>, <b>Trabajador</b>, y opcional <b>Integrado en cómputo</b>.</Typography>
                            <br />   
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[3]}</Typography> Cuando se hayan rellenado los datos de todos los Servicios Extra personalizados pulsar el botón <b>REGISTRAR CAMBIO</b> y en el cuadrante aparecerá una nueva columna de servicios fijos que corresponderá al nuevo Servicio Extra personalizado registrado.</Typography>
                            <br />   
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[4]}</Typography> La gestión de la horas trabajadas por trabajador / Servicio Extra es exactamente igual que con los Servicios Extra normales.</Typography>
                            <br />  
                        </Fragment>
                    </Box>
                </Grid>
            </Grid>
            {/* {console.log(valuesFormConfiguracion)} */}
        </div>
    )
}

export default InstruccionesServiciosFijos
