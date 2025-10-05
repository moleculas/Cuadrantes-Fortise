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

const InstruccionesRemesas = () => {

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
                            <div className={classes.tituloInstrucciones} id="rem1">
                                Requisitos previos para remesar
                                <HashLink to={'#rem1'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Para poder remesar cuadrantes, estos deben cumplir ciertos requisitos previos de estado.</Typography>
                            <br />                           
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> Los cuadrantes deben estar como mínimo en estado <b>FACTURADO</b>, mostrándose en color verde en la pestaña "Facturados".</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> Alternativamente, pueden estar en estado <b>EMAIL ENVIADO</b>, mostrándose en color azul, lo que también los hace disponibles para remesar.</Typography>
                            <br />          
                            {/* Elemento 2 */}
                            <div className={classes.tituloInstrucciones} id="rem2">
                                Acceso a la gestión de remesas
                                <HashLink to={'#rem2'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Para gestionar las remesas, acceder a la sección correspondiente en la aplicación.</Typography>
                            <br />                           
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> Ir a la pestaña <b>"Remesas"</b> en la página de gestión de cuadrantes.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> Desplegar el elemento de color azul <b>"Procesar lote de remesas"</b>.</Typography>
                            <br />   
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[3]}</Typography> Aparecerá un botón doble: el de la izquierda "Seleccionar remesa" (desactivado) y el de la derecha que al pulsarlo despliega las opciones de remesas disponibles.</Typography>
                            <br />  
                            
                            {/* Elemento 3 */}
                            <div className={classes.tituloInstrucciones} id="rem3">
                                Tipos de remesas disponibles
                                <HashLink to={'#rem3'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">El sistema permite realizar tantas remesas como vencimientos haya configurados en los bancos con los que trabaja Fortise.</Typography>
                            <br />                           
                            <Typography component="span" variant="body2">Las remesas disponibles son un total de <b>8</b>:</Typography>
                            <br />
                            <Typography component="span" variant="body2">• Vto 05 BBVA</Typography>
                            <br />
                            <Typography component="span" variant="body2">• Vto 10 La Caixa</Typography>
                            <br />
                            <Typography component="span" variant="body2">• Vto 15 La Caixa</Typography>
                            <br />
                            <Typography component="span" variant="body2">• Vto 17 BBVA</Typography>
                            <br />
                            <Typography component="span" variant="body2">• Vto 20 La Caixa</Typography>
                            <br />
                            <Typography component="span" variant="body2">• Vto 25 La Caixa</Typography>
                            <br />
                            <Typography component="span" variant="body2">• Vto 28 BBVA</Typography>
                            <br />
                            <Typography component="span" variant="body2">• Vto 30 La Caixa</Typography>
                            <br />  
                            
                            {/* Elemento 4 */}
                            <div className={classes.tituloInstrucciones} id="rem4">
                                Proceso de selección y generación de remesa
                                <HashLink to={'#rem4'} className={classes.anchorLink} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}><LinkIcon /></HashLink>
                            </div>
                            <Typography component="span" variant="body2">Una vez seleccionada la remesa deseada, se procede con la selección de cuadrantes y generación del documento.</Typography>
                            <br />                           
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[1]}</Typography> Seleccionar la remesa específica (por ejemplo, "Vto 05 BBVA") del desplegable.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[2]}</Typography> Aparecerán todos los cuadrantes que vencen ese día y están disponibles para remesar.</Typography>
                            <br />   
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[3]}</Typography> Con el botón <b>"Seleccionar todos"</b> (izquierda) se seleccionan todos los cuadrantes de la lista, o seleccionar individualmente marcando las casillas check a la izquierda de cada cuadrante.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[4]}</Typography> Una vez seleccionados los cuadrantes, se activará el botón de la izquierda que muestra el nombre de la remesa, vencimiento y entre paréntesis el número de cuadrantes que se remesarán.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[5]}</Typography> Pulsar el botón activado para generar automáticamente el documento XML que se descargará en el área de descargas del ordenador.</Typography>
                            <br />
                            <Typography component="span" variant="body2"><Typography variant="h5" component="span" className={classes.cercleInstruccions}>{numeracioInstruccions[6]}</Typography> El documento XML generado es el archivo que debe subirse al banco correspondiente para tramitar la remesa.</Typography>
                            <br />  
                        </Fragment>
                    </Box>
                </Grid>
            </Grid>
            {/* {console.log(valuesFormConfiguracion)} */}
        </div>
    )
}

export default InstruccionesRemesas
