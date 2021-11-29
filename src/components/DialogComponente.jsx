import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const DialogComponente = (props) => {

    //funciones

    const handleCloseDialogBotones = (respuesta) => {
        props.prHandleCloseDialogBotones(respuesta);
    };

    return (
        <div>
            <Dialog
                open={props.prIsOpen}
                onClose={() => { handleCloseDialogBotones('acuerdo') }}
                fullWidth={props.prFullWidth ? true : false}
                maxWidth={props.prMaxWidth ? 'md' : 'xs'}
            >
                <DialogTitle id="alert-dialog-title">{props.prTituloDialog}</DialogTitle>
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
                                Desacuerdo
                            </Button>
                        </Fragment>
                    ) : null}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogComponente
