import { Fragment } from 'react';
import { Divider, Grid, Box, Typography } from '@material-ui/core';

//estilos
import Clases from "../../clases";


const InformacionCuadrantes = ({ arrayInformeLineas }) => {
    const classes = Clases();

    return (
        <Fragment>
            <Divider />
            <Grid container spacing={2} className={classes.mb25}>
                <Box p={2} mt={2}>
                    {arrayInformeLineas.map((linea, index) => {
                        if (linea[0] === 'divider') {
                            return <Box key={'divider' + index} className={classes.mb25}></Box>;
                        } else {
                            return (
                                <Typography
                                    className={linea[1] === 'error' ? classes.vermell : null}
                                    key={'tipo' + index}
                                    variant='body1'
                                >
                                    {linea[0]}
                                </Typography>
                            );
                        }
                    })}
                </Box>
            </Grid>
        </Fragment>
    );
};

export default InformacionCuadrantes;