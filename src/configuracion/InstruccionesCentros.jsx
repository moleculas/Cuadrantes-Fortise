import React, { useState, Fragment, useEffect } from 'react';
import Constantes from "../constantes";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { SRLWrapper } from "simple-react-lightbox";
import LinkIcon from '@material-ui/icons/Link';
import { HashLink } from 'react-router-hash-link';

//imágenes
import ce1 from '../images/instrucciones/centros/ce_1.jpg';
import ce2 from '../images/instrucciones/centros/ce_2.jpg';
import ce3 from '../images/instrucciones/centros/ce_3.jpg';
import ce4 from '../images/instrucciones/centros/ce_4.jpg';
import ce5 from '../images/instrucciones/centros/ce_5.jpg';
import ce6 from '../images/instrucciones/centros/ce_6.jpg';
import ce7 from '../images/instrucciones/centros/ce_7.jpg';
import ce8 from '../images/instrucciones/centros/ce_8.jpg';

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

const InstruccionesCentros = () => {
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
                            <div className={classes.tituloInstrucciones} id="ce1">
                                Dar un centro de baja
                                <HashLink to={'#ce1'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Para dar un centro de baja (el centro continuará registrado en la base de datos pero no aparecerá listado para generar cuadrantes): </Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> Pulsar el interruptor <b>Alta / Baja</b> en Datos generales y elegir el estado <b>Baja</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={ce1}>
                                    <img style={{ marginTop: 25 }} src={ce1} alt="ce1" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> La ficha del Centro cambiará a color Baja.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={ce2}>
                                    <img style={{ marginTop: 25, width: '100%' }} src={ce2} alt="ce2" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[3]}</Typography> En la botonera del menú Superior <b>Gestión de Centros</b> pulsar <b>Actualizar Centro</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={ce3}>
                                    <img style={{ marginTop: 25 }} src={ce3} alt="ce3" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Los centros dados de baja aparecerán en el listado de centros de la pantalla de Inicio de color Baja.</Typography>
                            <br />
                            {/* Elemento 2 */}
                            <div className={classes.tituloInstrucciones} id="ce2">
                                Centro con varios cuadrantes
                                <HashLink to={'#ce2'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Un mismo centro puede contemplar varias configuraciones, la estandarizada, se registra un centro con una configuración que generará cuadrantes, o las siguientes variaciones:</Typography>
                            <br />
                            <Typography component="span" variant="body2"><b>Centro registrado dos (o más) veces:</b> Se generan 2 (o más) fichas del centro (con el mismo código de centro pero con nombres diferentes). Esta variación generará 2 (o más) cuadrantes distintos, por lo tanto 2 (o más) facturas distintas. Ejemplo: UDON BARCELONA, S.L. (DIAGONAL MAR) - UDON BARCELONA, S.L.(BORN) - UDON BARCELONA, S.L.(ANEC BLAU).</Typography>
                            <br />
                            <Typography component="span" variant="body2"><b>Centro registrado una vez con varios cuadrantes:</b> En una misma ficha de centro pueden registrarse varios cuadrantes. Los diversos cuadrantes se gestionarán desde a misma ficha del cuadrante y todos juntos generarán una sola factura con el sumatorio total de servicios de todos ellos. Ejemplo: ALUMINIOS BARCELONA, S.L.</Typography>
                            <br />
                            <Typography component="span" variant="body2">Para configurar un centro registrado con varios cuadrantes, desde la ficha centro (apartados Editar o Registrar), pulsar el botón <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> añadir cuadrante al centro. Configurar el resto de parámetros como si de un centro indivudual se tratara. Para cambiar de cuadrantes usar el selector <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> Número cuadrante.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={ce4}>
                                    <img style={{ marginTop: 25 }} src={ce4} alt="ce4" />
                                </a>
                            </SRLWrapper>
                            <br />
                            {/* Elemento 3 */}
                            <div className={classes.tituloInstrucciones} id="ce3">
                                Servicios Extra incluidos
                                <HashLink to={'#ce3'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Para integrar en el cómputo general cualquier Servicio Extra (el precio estará integrado en el total Mensual Pactado):</Typography>
                            <br />
                            <Typography component="span" variant="body2">En el apartado <b>Servicios Extra</b> marcar la casilla <b>Integrado en cómputo</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={ce5}>
                                    <img style={{ marginTop: 25, width: '100%' }} src={ce5} alt="ce5" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">En la botonera del menú Superior <b>Gestión de Centros</b> pulsar <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[3]}</Typography> <b>Actualizar Centro</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={ce3}>
                                    <img style={{ marginTop: 25 }} src={ce3} alt="ce3" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">En la ficha del cuadrante el Servicio Extra Integrado <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[2]}</Typography> se mostrará de color verde distinto al de los Servicios Extra normales <Typography variant="h5" component="span" className={classes.cercleInstruccionsVer}>{numeracioInstruccions[1]}</Typography> y el tipo de servicio estará marcado como (I).</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={ce6}>
                                    <img style={{ marginTop: 25 }} src={ce6} alt="ce6" />
                                </a>
                            </SRLWrapper>
                            <br />
                            {/* Elemento 4 */}
                            <div className={classes.tituloInstrucciones} id="ce4">
                                Gestión especial de horas
                                <HashLink to={'#ce4'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Para configurar un centro del tipo Gestión especial de horas (Se emite recibo):</Typography>
                            <br />
                            <br />
                            <Typography component="span" variant="body2">Si el centro contempla un horario de trabajadores: una vez seleccionada la pestaña superior <b>Horario</b> en el apartado <b>Cómputo de horas</b> del desplegable Tipo cómputo elegir <b>Gestión especial horas</b>.</Typography>
                            <br />
                            <Typography component="span" variant="body2">Una vez seleccionado el Tipo cómputo Gestión especial de horas añadir el precio del total Mensual Pactado (para cómputo mensual pactado) o Precio/Hora del Servicio concreto (para cómputo por precio/hora).</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={ce7}>
                                    <img style={{ marginTop: 25 }} src={ce7} alt="ce7" />
                                </a>
                            </SRLWrapper>
                            <br />
                            <Typography component="span" variant="body2">Si el centro solo contempla Servicios Extra: una vez seleccionada la pestaña superior <b>Servicios Extra</b> pulsar la casilla inferior <b>Gestión especial horas para Servicios Extra</b>.</Typography>
                            <br />
                            <SRLWrapper options={options}>
                                <a href={ce8}>
                                    <img style={{ marginTop: 25 }} src={ce8} alt="ce8" />
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

export default InstruccionesCentros
