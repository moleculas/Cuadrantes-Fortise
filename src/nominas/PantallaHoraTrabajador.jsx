import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    Typography,
    Avatar,
    ListItemText,
    ListItemAvatar,
    List,
    ListItem,
    Paper,
    IconButton,
    Tooltip
} from '@material-ui/core';
import clsx from 'clsx';
import {
    Print as PrintIcon,
    Person as PersonIcon
} from '@material-ui/icons';

//estilos
import Clases from "../clases";

//pdf
import { pdf } from "@react-pdf/renderer";
import InformePDF from "../comun/InformePDF";

//importaciones acciones
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';
import { obtenerCentrosAccion } from '../redux/centrosDucks';

//constantes
import Constantes from "../constantes";
const {
    TIPO_SERVICIO_FIJO: tipoServicioFijo,
    TIPO_SERVICIO: tipoServicio
} = Constantes;

const PantallaHoraTrabajador = (props) => {
    const {
        heightScrollable
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        calendarioAGestionarHorasTrabajadores,
        horaTrabajador
    } = useSelector(store => store.variablesHorasTrabajadores);
    const trabajadorAGestionar = useSelector(store => store.variablesTrabajadores.objetoTrabajador);
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const { monthLet, monthNum, year } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionarHorasTrabajadores));

    //states 
    const [arrayInformeLineas, setArrayInformeLineas] = useState([]);

    //useEffect

    useEffect(() => {
        if (listadoCentros.length === 0) {
            dispatch(obtenerCentrosAccion('centros', false)); //sense filtrar les baixes
        };
    }, [dispatch, listadoCentros.length]);

    useEffect(() => {
        const anyoMes = `${year}-${monthNum}`;
        const inicioInforme = [
            ['Mes: ' + anyoMes, 'normal'],
            ['Trabajador: ' + trabajadorAGestionar.nombre, 'normal'],
            ['DNI-NIE: ' + trabajadorAGestionar?.dni || "", 'normal'],
            ['NSS: ' + trabajadorAGestionar?.segSocial || "", 'normal'],
            ['divider', 'normal']
        ];
        if (horaTrabajador && horaTrabajador.datosHoraTrabajador) {
            let nuevoArrayInforme = [...inicioInforme];
            horaTrabajador.datosHoraTrabajador.forEach(datos => {
                const arrayInformeTemp = generarArrayInformeTemp(datos);
                nuevoArrayInforme = [...nuevoArrayInforme, ...arrayInformeTemp];
                const { informeLineas } = procesarDatosHoras(datos);
                nuevoArrayInforme = [...nuevoArrayInforme, ...informeLineas];
            });
            setArrayInformeLineas(nuevoArrayInforme);
        } else {
            setArrayInformeLineas(inicioInforme);
        }
    }, [year, monthNum, trabajadorAGestionar, horaTrabajador, listadoCentros]);

    //funciones    

    const gestionarInformePDF = async () => {
        const arrayImprimir = [...arrayInformeLineas, [`Total horas trabajadas: ${retornaTotalHorasTrabajador()}`, 'normal']];
        const element = <InformePDF objetoInformePDF={arrayImprimir} titulo="Informe Horas Trabajador" />;
        const myPdf = pdf([]);
        myPdf.updateContainer(element);
        const blob = await myPdf.toBlob();
        if (blob) {
            let file = new File([blob], 'Informe-Horas-Trabajador.pdf', { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const pdfWindow = window.open();
            pdfWindow.location.href = fileURL;
        };
    };

    const retornaTextoCentro = (datos) => {
        const centro = listadoCentros.find(centro => centro.id === Number(datos.centro));
        const nombre = centro ? centro.nombre : null;
        const subNombre = centro ? (centro.sub_nombre || null) : null;
        const textoCentro = `Horas trabajadas en el centro: ${nombre}${subNombre ? ` - ${subNombre}` : ''}`;
        return textoCentro;
    }

    const dividirStringPorGuion = (input) => {
        const str = String(input);
        if (str.includes("-")) {
            const [valor1, valor2] = str.split("-");
            return [valor1.trim(), valor2.trim()];
        } else {
            return [str.trim()];
        }
    }

    const generarArrayInformeTemp = (datos) => {
        let arrayInformeTemp = [];
        const textoCentro = retornaTextoCentro(datos);
        arrayInformeTemp.push([textoCentro, 'normal']);
        const cuadrante = dividirStringPorGuion(datos.cuadrante);
        const tipo = dividirStringPorGuion(datos.tipo);
        const tipoMapeado = tipo.map(c => c === "trabajadorSF" ? "trabajador servicios fijos" : c);
        const textoCuadrante = `Recuento de horas en cuadrante${cuadrante.length > 1 ? 's' : ''} ${cuadrante.join(' y ')}`;
        const textoTipo = ` como ${tipoMapeado.join(' y ')}.`;
        const textoCuadranteTipo = textoCuadrante + textoTipo;
        arrayInformeTemp.push([textoCuadranteTipo, 'normal']);
        return arrayInformeTemp;
    };

    const getAvatarClass = (prefix) => {
        const tipoServPrefixes = {
            "L": "tipoServ1",
            "E": "tipoServ2",
            "P": "tipoServ3",
            "N": "tipoServ4",
            "R": "tipoServ5",
            "L1": "tipoServ6",
            "L2": "tipoServ6",
            "F": "tipoServ7"
        };
        const cabeceraServiciosPrefixes = [
            "TO", "CR", "CE", "CI", "MO", "OF", "AL", "LA", "TE", "FI", "FE", "AB", "MA", "PO",
            "BA", "FT", "C3", "C2", "C4", "ES", "PA", "FR"
        ];
        if (tipoServPrefixes[prefix]) {
            return tipoServPrefixes[prefix];
        }
        if (cabeceraServiciosPrefixes.includes(prefix)) {
            return "cabeceraServicios";
        }
        return "cabeceraServicios";
    };

    const retornaTotalHorasTrabajador = () => {
        return `${horaTrabajador.datosHoraTrabajador.reduce((s, obj) => s + obj.totalHoras, 0)} horas`
    }

    //componentes

    const procesarDatosHoras = (datos) => {
        const informeLineas = [];
        const elementosVisuales = Object.entries(datos).reduce((acumulador, [key, value]) => {
            let objetoHoras = null;
            if (key.startsWith('totalHorasNormal_') || key.startsWith('totalHorasExtra_')) {
                const prefix = key.split('_')[1];
                const tipoServicioEncontrado = tipoServicio.find(ts => ts.prefix === prefix);
                if (tipoServicioEncontrado) {
                    objetoHoras = {
                        nombre: tipoServicioEncontrado.label,
                        cantidad: value,
                        prefix
                    };
                }
            } else if (key.startsWith('totalHorasSF_')) {
                const [_, valueKey = '', descripcionServicioFijoPersonalizado = ''] = key?.split('_') || [];
                const tipoServicioFijoEncontrado = tipoServicioFijo.find(tsf => tsf.value === valueKey);
                objetoHoras = tipoServicioFijoEncontrado
                    ? {
                        nombre: tipoServicioFijoEncontrado.label,
                        cantidad: value,
                        prefix: tipoServicioFijoEncontrado.prefix
                    }
                    : {
                        nombre: descripcionServicioFijoPersonalizado,
                        cantidad: value,
                        prefix: valueKey
                    };
            };
            if (objetoHoras) {
                informeLineas.push([`${objetoHoras.nombre}: ${objetoHoras.cantidad} horas`, 'normal']);
                const avatarClass = getAvatarClass(objetoHoras.prefix);
                acumulador.push(
                    <Box
                        key={`${key}_${objetoHoras.prefix}`}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 5,
                            marginRight: 25,
                            gap: 10,
                            width: "100%"
                        }}
                    >
                        <Box
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10
                            }}
                        >
                            <Avatar className={clsx(classes[avatarClass], classes.small4, classes.fuentePequena)}>
                                {objetoHoras.prefix}
                            </Avatar>
                            <Typography component="span" variant="body2">
                                {objetoHoras.nombre}
                            </Typography>
                        </Box>
                        {`Horas: ${objetoHoras.cantidad}`}
                    </Box>
                );
            }
            return acumulador;
        }, []);
        informeLineas.push(['divider', 'normal']);
        return { elementosVisuales, informeLineas };
    };

    const ElementoHoras = ({ datos }) => {
        const textoCentro = retornaTextoCentro(datos);
        const cuadrante = dividirStringPorGuion(datos.cuadrante);
        const tipo = dividirStringPorGuion(datos.tipo);
        const tipoMapeado = tipo.map(c => c === "trabajadorSF" ? "trabajador servicios fijos" : c);
        const textoCuadrante = `Recuento de horas en cuadrante${cuadrante.length > 1 ? 's' : ''} ${cuadrante.join(' y ')}`;
        const textoTipo = ` como ${tipoMapeado.join(' y ')}.`;
        const textoCuadranteTipo = textoCuadrante + textoTipo;
        const { elementosVisuales } = procesarDatosHoras(datos);
        if (datos.totalHoras === 0) {
            return null;
        };
        return (
            <Fragment>
                <Grid container style={{ marginBottom: 25 }}>
                    <Grid item xs={12} className={classes.boxTotalHT} style={{ padding: 10, marginRight: 25, marginBottom: 10 }}>
                        <Typography
                            component="span"
                            variant="body2"
                        >
                            {textoCentro}
                        </Typography>
                    </Grid>
                    <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                        style={{ marginBottom: 15 }}
                    >
                        {textoCuadranteTipo}
                    </Typography>
                    {elementosVisuales}
                </Grid>
            </Fragment>
        )
    }

    const retornaHoraTrabajador = () => {
        return (
            <Paper>
                <List>
                    <ListItem
                        alignItems="flex-start"
                        style={{ paddingLeft: 50 }}
                    >
                        <Grid
                            container
                            direction="column"
                            justifycontent="flex-start"
                            alignItems="flex-start"
                        >
                            <Box
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    marginBottom: 25,
                                    marginTop: 5,
                                    gap: 10,
                                }}>
                                <List style={{ margin: -20 }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={classes.bgHTTaronja}>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant="body1"
                                                >
                                                    {trabajadorAGestionar.nombre}
                                                </Typography>
                                            }
                                            secondary={`DNI-NIE: ${trabajadorAGestionar?.dni || ""} - NSS: ${trabajadorAGestionar?.segSocial || ""}`}
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                            <Grid style={{ height: heightScrollable - 250, padding: 10 }}
                                className={classes.scrollable}>
                                {horaTrabajador.datosHoraTrabajador.map((registro, index) => (
                                    <ElementoHoras key={`registro${index}`} datos={registro} />
                                ))}
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem
                        className={classes.casillaNominasFinal}
                        alignItems="flex-start"
                    >
                        <Grid
                            container
                            direction="column"
                            justifycontent="flex-start"
                            alignItems="flex-start"
                        >
                            <Fragment>
                                <Grid container
                                    style={{ paddingBottom: 3, marginTop: 5, paddingLeft: 35, paddingRight: 35 }}>
                                    <Grid item xs={6}>
                                        <Typography
                                            component="span"
                                            variant="body1"
                                        >
                                            Total horas trabajadas:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}
                                        className={classes.alignRight}
                                    >
                                        <Typography
                                            component="span"
                                            variant="body1"
                                        >
                                            {retornaTotalHorasTrabajador()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Fragment>
                        </Grid>
                    </ListItem >
                </List>
            </Paper>
        )
    }

    if (!trabajadorAGestionar || !horaTrabajador) {
        return null;
    }

    return (
        <div>
            {/* {console.log(arrayInformeLineas)} */}
            <Grid
                spacing={1}
                container
                direction="row"
                justifycontent="flex-start"
                alignItems="flex-start"
            >
                <Grid item xs={8}>
                    <Box
                        p={1.5}
                        m={0.5}
                        bgcolor="secondary.light"
                        color="secondary.contrastText"
                        className={classes.mb10}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%"
                        }}
                    >
                        <Typography variant="body1">Horas trabajadas por centro en el mes de {monthLet}</Typography>
                        <Tooltip title="Imprimir informe" arrow placement="left">
                            <IconButton
                                style={{ marginTop: -5, marginBottom: -10 }}
                                onClick={gestionarInformePDF}
                            >
                                <PrintIcon style={{ color: "#FFFFFF" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    {(horaTrabajador && trabajadorAGestionar) && retornaHoraTrabajador()}
                </Grid>
            </Grid>
        </div>
    );
}

export default PantallaHoraTrabajador;