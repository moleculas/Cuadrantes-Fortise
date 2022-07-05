import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { useDispatch } from 'react-redux';

//importaciones acciones
import { obtenerNumeroRecibosAccion } from '../redux/appDucks';

// Create styles
Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
};

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
};

const fecha = formatDate(new Date());

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    header: {
        fontSize: 11,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
        fontFamily: 'Oswald',
    },
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 25,
        border: '2px solid #2e1bba'
    },
    bordeBotAz1: {
        borderBottom: '2px solid #2e1bba'
    },
    bordeTopAz2: {
        borderTop: '1px solid #8682d0'
    },
    bordeBotAz2: {
        borderBottom: '1px solid #8682d0'
    },
    fondoBlanco: {
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    fondoAzul1: {
        backgroundColor: '#2e1bba',
        color: '#ffffff',
    },
    fondoAzul2: {
        backgroundColor: '#8682d0',
        color: '#ffffff',
    },
    ancho20: {
        width: '20%',
    },
    ancho40: {
        width: '40%',
    },
    ancho50: {
        width: '50%',
    },
    ancho60: {
        width: '60%',
    },
    ancho80: {
        width: '80%',
    },
    ancho100: {
        width: '1000%',
    },
    pt5: {
        paddingTop: 5
    },
    textoGran: {
        fontSize: 14,
        fontFamily: 'Oswald',
        paddingLeft: 10,
    },
    gran: {
        height: 50
    },
    peq: {
        height: 25
    },
    med: {
        height: 32
    },
    flexRow: {
        flexDirection: 'row',
        textAlign: 'left',
    },
    flexCol: {
        flexDirection: 'column',
    },
    alignCent: {
        alignItems: 'center',
        textAlign: 'center',
    },
    textoPeq: {
        fontSize: 12,
        fontFamily: 'Oswald',
        paddingLeft: 10,
        paddingRight: 10,
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        fontFamily: 'Oswald',
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

const ReciboPDF = ({ objetoReciboPDF }) => {

    const dispatch = useDispatch();
    let elNumeroRecibo;
    if(objetoReciboPDF.numeroRecibos){
        elNumeroRecibo = objetoReciboPDF.numeroRecibos;
    }else{
        elNumeroRecibo = dispatch(obtenerNumeroRecibosAccion('configuracion')) + '-2';
    };    
    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>
                    ~ Gestión de recibos ~
                </Text>
                <View style={styles.tableContainer}>
                    <View style={[styles.fondoBlanco, styles.gran, styles.ancho60, styles.flexRow]}>
                    </View>
                    <View style={[styles.gran, styles.ancho40, styles.flexCol]}>
                        <View style={[styles.peq, styles.flexRow]}>
                            <Text style={[styles.ancho50, styles.fondoAzul1, styles.textoGran]}>Nº recibo</Text>
                            <Text style={[styles.ancho50, styles.fondoBlanco, styles.textoGran]}>{objetoReciboPDF.numeroRecibos}</Text>
                        </View>
                        <View style={[styles.peq, styles.flexRow]}>
                            <Text style={[styles.ancho50, styles.fondoAzul1, styles.textoGran]}>Fecha Emisión</Text>
                            <Text style={[styles.ancho50, styles.fondoBlanco, styles.textoGran, styles.bordeBotAz1]}>{fecha}</Text>
                        </View>
                    </View>
                    <View style={[styles.ancho100, styles.fondoBlanco, styles.gran]}>
                    </View>
                    <View style={[styles.ancho100, styles.med, styles.flexRow]}>
                        <View style={[styles.ancho20, styles.flexRow]}>
                            <Text style={[styles.ancho100, styles.fondoAzul2, styles.textoGran, styles.bordeBotAz2, styles.pt5]}>Recibí de:</Text>
                        </View>
                        <View style={[styles.ancho80, styles.flexRow]}>
                            <Text style={[styles.ancho100, styles.fondoBlanco, styles.textoPeq, styles.bordeTopAz2, styles.pt5]}>{objetoReciboPDF.centro}</Text>
                        </View>
                    </View>
                    <View style={[styles.ancho100, styles.med, styles.flexRow]}>
                        <View style={[styles.ancho20, styles.flexRow]}>
                            <Text style={[styles.ancho100, styles.fondoAzul2, styles.textoGran, styles.bordeBotAz2, styles.pt5]}>La suma de:</Text>
                        </View>
                        <View style={[styles.ancho80, styles.flexRow]}>
                            <Text style={[styles.ancho100, styles.fondoBlanco, styles.textoPeq, styles.bordeTopAz2, styles.pt5]}>{objetoReciboPDF.totalLetra}</Text>
                        </View>
                    </View>
                    <View style={[styles.ancho100, styles.flexRow, styles.med, styles.fondoBlanco]}>
                        <View style={[styles.ancho20, styles.flexRow]}>
                            <Text style={[styles.ancho100, styles.fondoAzul2, styles.textoGran, styles.pt5]}>En concepto de:</Text>
                        </View>
                        <View style={[styles.ancho80, styles.flexRow]}>
                            <Text style={[styles.ancho100, styles.fondoBlanco, styles.textoPeq, styles.bordeTopAz2, styles.bordeBotAz2, styles.pt5]}>{objetoReciboPDF.concepto}</Text>
                        </View>
                    </View>
                    <View style={[styles.ancho100, styles.gran, styles.fondoBlanco]}>
                    </View>
                    <View style={[styles.ancho60, styles.gran, styles.flexRow, styles.alignCent, styles.fondoAzul1]}>
                    </View>
                    <View style={[styles.ancho40, styles.gran, styles.flexRow, styles.alignCent, styles.fondoAzul1]}>
                        <View style={[styles.peq, styles.flexRow]}>
                            <Text style={[styles.ancho50, styles.fondoAzul2, styles.textoGran]}>Total</Text>
                            <Text style={[styles.ancho50, styles.fondoBlanco, styles.textoGran]}>{objetoReciboPDF.total + ' €'}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document >
    );
};

export default ReciboPDF