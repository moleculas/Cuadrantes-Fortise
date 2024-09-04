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

const InstruccionesControlHorario = () => {

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
                            <div className={classes.tituloInstrucciones} id="h1">
                                Gestión Horas Trabajadores
                                <HashLink to={'#h1'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">La sección Horas Trabajadores se compone de 2 áreas. La primera Pantalla principal ofrece en el módulo de la izquierda el listado de trabajadores por mes en cuyos cuadrantes se han registrado horas de trabajo. Los módulos de la derecha se componen de un diagrama de barras que devuelve el registro del total de horas trabajadas por año y el módulo inferior el listado de trabajadores que están de baja.</Typography>
                            <br />
                            <Typography component="span" variant="body2">El listado de horas de trabajadores permite cierta interacción para calcular el total de horas trabajadas partiendo de una selección en base a grupos de trabajadores seleccionados. Para obtener el cálculo del total de horas trabajadas por selección:</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> Pulsar el objeto acordeón <b>Control horas trabajadores</b> y seleccionar el lote de trabajadores pulsando el objecto check situado a la izquierda del nombre del trabador. Una vez seleccionado pulsar el botón <b>CALCULAR LOTE</b>. Se contempla la posibilidad de seleccionar todos los elementos marcando el objeto check <b>Seleccionar todos</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> Para crear un listado completo de las horas de los trabajadores, pulsar el botón <b>Crear Excel listado horas Trabajadores</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2">El programa generará un archivo .xlsx que se podrá localizar en la carpeta <b>Descargas</b> del equipo.</Typography>
                            <br />             
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[3]}</Typography> Para acceder a la ficha completa de cada trabajador, seleccionar y clickar el objeto trabajador del listado. Se mostrará la pantalla Horas trabajadas por centro en el mes correspondiente de cada trabajador. Es una pantalla informativa cuya única interacción programada es imprimir la ficha de horas del trabjador.</Typography>
                            <br />              
                        </Fragment>
                    </Box>
                </Grid>
            </Grid>
            {/* {console.log(valuesFormConfiguracion)} */}
        </div>
    )
}

export default InstruccionesControlHorario
