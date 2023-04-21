import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

//importaciones acciones

// Create styles
Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald',
        marginBottom: 30
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald'
    },
    text: {        
        fontSize: 13,
        textAlign: 'left',
        fontFamily: 'Oswald'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    mb25: {
        marginBottom: 25
    },
    vermell: {
        color: 'red'
    },
});

const InformePDF = ({ objetoInformePDF }) => {

    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>
                    ~ Gestión de cuadrantes de Servicio Fortise S.L. ~
                </Text>
                <Text style={styles.title}>Informe Cuadrante de Servicio</Text>
                {objetoInformePDF.map((linea, index) => {
                    if (linea[0] === 'divider') {
                        return <Text key={'divider' + index} style={styles.mb25}></Text>
                    } else {
                        return <Text style={linea[1] === 'error' ? [styles.vermell, styles.text] : styles.text} key={'tipo' + index}>{linea[0]}</Text>
                    }
                })}
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
};

export default InformePDF