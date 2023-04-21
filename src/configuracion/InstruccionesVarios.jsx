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

const InstruccionesVarios = () => {

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
                            <div className={classes.tituloInstrucciones} id="v1">
                                Crear listados Excel de datos
                                <HashLink to={'#v1'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Para crear listados de datos en formato XLSX (Excel). Desde la pantalla inicio:</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> Para crear un listado completo de Centros, seleccionar la pestaña <b>Centros</b> y pulsar el botón <b>Crear Excel listado CENTROS</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> Para crear un listado completo de Trabajadores, seleccionar la pestaña <b>Trabajadores </b>y pulsar el botón <b>Crear Excel listado TRABAJADORES</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2">El programa generará un archivo .xlsx que se podrá localizar en la carpeta <b>Descargas</b> del equipo.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={v1}>
                                    <img style={{ marginTop: 25 }} src={v1} alt="v1" />
                                </a>
                            </SRLWrapper>
                            <br />
                        </Fragment>
                    </Box>
                </Grid>
            </Grid>
            {/* {console.log(valuesFormConfiguracion)} */}
        </div>
    )
}

export default InstruccionesVarios
