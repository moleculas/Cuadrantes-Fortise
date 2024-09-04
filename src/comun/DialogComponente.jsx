import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

//pdf
import { pdf } from "@react-pdf/renderer";
import InformePDF from "../comun/InformePDF";

const DialogComponente = (props) => {

    const arrayInformeLineas = useSelector(store => store.variablesCuadrantesSetters.arrayInformeLineas);

    //funciones

    const handleCloseDialogBotones = (respuesta) => {
        props.prHandleCloseDialogBotones(respuesta);
    };

    const gestionarInformePDF = async () => {  
        const element = <InformePDF objetoInformePDF={arrayInformeLineas} titulo="Informe Cuadrante de Servicio" />;
        const myPdf = pdf([]);
        myPdf.updateContainer(element);
        const blob = await myPdf.toBlob();
        if (blob) {
            let file = new File([blob], 'Informe-Cuadrante-Servicio.pdf', { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const pdfWindow = window.open();
            pdfWindow.location.href = fileURL;
        };
    };

    return (
        <div>
            <Dialog
                open={props.prIsOpen}
                onClose={() => { handleCloseDialogBotones('acuerdo') }}
                fullWidth={props.prFullWidth ? true : false}
                maxWidth={props.prMaxWidth ? 'md' : 'xs'}
            >
                <DialogTitle id="alert-dialog-title">
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        {props.prTituloDialog}
                        {props.prBotonImprimir ? (
                            <IconButton
                                style={{ marginTop: -5, marginBottom: -10 }}
                                onClick={gestionarInformePDF}
                            >
                                <PrintIcon />
                            </IconButton>
                        ) : null}
                    </Box>
                </DialogTitle>
                <DialogContent>{!props.prFullWidth ? (
                    <DialogContentText id="alert-dialog-description">
                        {props.prDescripcionDialog}
                    </DialogContentText>
                ) : props.prDescripcionDialog}
                    {!props.prNoTieneBotones ? (
                        <Fragment>
                            <Button onClick={() => { handleCloseDialogBotones('acuerdo') }} color="primary">
                                De acuerdo
                            </Button>
                            <Button onClick={() => { handleCloseDialogBotones('desacuerdo') }} color="primary">
                                No
                            </Button>
                        </Fragment>
                    ) : null}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogComponente
