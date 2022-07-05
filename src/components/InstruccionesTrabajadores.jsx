import React, { useState, Fragment, useEffect } from 'react';
import Constantes from "../constantes";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { SRLWrapper } from "simple-react-lightbox";
import LinkIcon from '@material-ui/icons/Link';
import { HashLink } from 'react-router-hash-link';

//imágenes
import t1 from '../images/instrucciones/trabajadores/t_1.jpg';
import t2 from '../images/instrucciones/trabajadores/t_2.jpg';
import t3 from '../images/instrucciones/trabajadores/t_3.jpg';

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

const InstruccionesTrabajadores = () => {

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
                            <div className={classes.tituloInstrucciones} id="t1">
                                Agregar trabajador a listados de Servicios Extra
                                <HashLink to={'#t1'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}><LinkIcon /></HashLink>
                            </div>                           
                            <Typography component="span" variant="body2">Un trabajador por defecto pertenece a la categoría base <b>Trabajadores</b>, para que ese mismo trabajador pueda realizar Servicios Extra se debe añadir en su ficha la Subcategoría <b>Servicios Extra</b> de la siguiente manera:</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> Pulsar el selector <b>Subcategoría</b> en Datos generales del trabajador.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={t1}>
                                    <img style={{ marginTop: 25 }} src={t1} alt="t1" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> En el desplegable elegir la subcategoría <b>Servicios Extra</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={t2}>
                                    <img style={{ marginTop: 25 }} src={t2} alt="t2" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[3]}</Typography> En la botonera del menú Superior <b>Gestión de Trabajadores</b> pulsar <b>Actualizar Trabajador</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={t3}>
                                    <img style={{ marginTop: 25 }} src={t3} alt="t3" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Una vez registrada la subcategoría del trabajador tanto en las fichas de los Centros como en las fichas de los Cuadrantes dicho trabajador aparecerá en el desplegable de trabajadores que pueden realizar Servicios Extra.</Typography>
                        </Fragment>
                    </Box>
                </Grid>
            </Grid>
            {/* {console.log(valuesFormConfiguracion)} */}
        </div>
    )
}

export default InstruccionesTrabajadores
