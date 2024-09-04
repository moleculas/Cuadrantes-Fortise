import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../images/logo_fortise_facturas.jpg';

// Create styles
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 9,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 30,
        lineHeight: 1.5,
        flexDirection: 'column'
    },
    logo: {
        width: '100%'
    },
    titleHeaderDatosFortise: {
        flexDirection: 'row',
        marginTop: 24,
    },
    titleHeaderDatosFortiseText: {
        color: '#61dafb',
        fontSize: 25,
    }
});

const FacturaPDF = (props) => {
    const {
        objetoFacturaPDF
    } = props;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between'
                }}>
                    <View style={{ width: '50%', paddingRight: '40px' }}>
                        <Image style={styles.logo} src={logo} />
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#0000ff',
                            color: 'white',
                            marginTop: 10,
                            padding: '2.5px 10px 2.5px 10px',
                            borderRadius: 5
                        }}>
                            <Text style={{ flex: 2 }}>Documento</Text>
                            <Text style={{ flex: 2 }}>Número</Text>
                            <Text style={{ flex: 1 }}>Página</Text>
                            <Text style={{ flex: 1 }}>Fecha</Text>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 3,
                            padding: '2.5px 10px 2.5px 10px'
                        }}>
                            <Text style={{ flex: 2 }}>Factura</Text>
                            <Text style={{ flex: 2 }}>{objetoFacturaPDF.numero}</Text>
                            <Text style={{ flex: 1 }}>1</Text>
                            <Text style={{ flex: 1 }}>{objetoFacturaPDF.fecha}</Text>
                        </View>
                    </View>
                    <View style={{
                        border: '1px solid #0000ff',
                        borderRadius: 5,
                        backgroundColor: '#efefef',
                        padding: '15px 10px 15px 25px',
                        alignSelf: 'flex-end',
                        marginBottom: '40px',
                        width: '50%'
                    }}>
                        {objetoFacturaPDF.subNombreCentro !== "" ? (
                            <Text style={{ textTransform: 'uppercase' }}>{`${objetoFacturaPDF.nombreCentro} - ${objetoFacturaPDF.subNombreCentro}`}</Text>
                        ) : (
                            <Text style={{ textTransform: 'uppercase' }}>{objetoFacturaPDF.nombreCentro}</Text>
                        )}
                        <Text>{objetoFacturaPDF.domicilio}</Text>
                        <Text>{`${objetoFacturaPDF.codigoPostal} ${objetoFacturaPDF.poblacion}`}</Text>
                        <Text>{`${objetoFacturaPDF.provincia} ${objetoFacturaPDF.codigo}`}</Text>
                    </View>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#0000ff',
                    color: 'white',
                    marginTop: 10,
                    padding: '2.5px 10px 2.5px 10px',
                    borderRadius: 5
                }}>
                    <Text style={{ flex: 1 }}>N.I.F.</Text>
                    <Text style={{ flex: 1 }}>Agente</Text>
                    <Text style={{ flex: 1 }}>Forma de pago</Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 3,
                    padding: '2.5px 10px 2.5px 10px'
                }}>
                    <Text style={{ flex: 1 }}>{objetoFacturaPDF.nif}</Text>
                    <Text style={{ flex: 1 }}>1 Empresa</Text>
                    <Text style={{ flex: 1 }}>{objetoFacturaPDF.formaPago}</Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#0000ff',
                    color: 'white',
                    marginTop: 10,
                    padding: '2.5px 10px 2.5px 10px',
                    borderRadius: 5
                }}>
                    <Text style={{ flex: 1 }}>Artículo</Text>
                    <Text style={{ flex: 3 }}>Descripción</Text>
                    <Text style={{ flex: 1 }}>Cantidad</Text>
                    <Text style={{ flex: 1 }}>Precio Ud.</Text>
                    <Text style={{ flex: 1 }}>Subtotal</Text>
                    <Text style={{ flex: 1 }}>Descuento</Text>
                    <Text style={{ flex: 1 }}>Total</Text>
                </View>
                <View style={{ minHeight: 250 }}>
                    {objetoFacturaPDF.lineas.map((linea, index) => (
                        <View key={`p-${index}`}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 3,
                                padding: '2.5px 10px 2.5px 10px'
                            }}>
                            <Text style={{ flex: 1 }}>{linea[0]}</Text>
                            <Text style={{ flex: 3 }}>{linea[1]}</Text>
                            <Text style={{ flex: 1 }}>{linea[4]}</Text>
                            <Text style={{ flex: 1 }}>{linea[3]}</Text>
                            <Text style={{ flex: 1 }}>{linea[2]}</Text>
                            <Text style={{ flex: 1 }}> </Text>
                            <Text style={{ flex: 1 }}>{linea[2]}</Text>
                        </View>
                    ))}
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#0000ff',
                    color: 'white',
                    marginTop: 10,
                    padding: '2.5px 10px 2.5px 10px',
                    borderRadius: 5
                }}>
                    <Text style={{ flex: 1 }}>Tipo</Text>
                    <Text style={{ flex: 1 }}>Importe</Text>
                    <Text style={{ flex: 1 }}>Descuento</Text>
                    <Text style={{ flex: 1 }}>Pronto pago</Text>
                    <Text style={{ flex: 1 }}>Portes</Text>
                    <Text style={{ flex: 1 }}>Financiación</Text>
                    <Text style={{ flex: 1 }}>Base</Text>
                    <Text style={{ flex: 1 }}>I.V.A.</Text>
                    <Text style={{ flex: 1 }}>R.E.</Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                    marginTop: 3,
                    padding: '2.5px 10px 2.5px 10px',
                    minHeight: 50
                }}>
                    <Text style={{ flex: 1 }}>21</Text>
                    <Text style={{ flex: 1 }}>{objetoFacturaPDF.total}</Text>
                    <Text style={{ flex: 1 }}> </Text>
                    <Text style={{ flex: 1 }}> </Text>
                    <Text style={{ flex: 1 }}> </Text>
                    <Text style={{ flex: 1 }}> </Text>
                    <Text style={{ flex: 1 }}>{objetoFacturaPDF.total}</Text>
                    <Text style={{ flex: 1 }}>{objetoFacturaPDF.totalIva}</Text>
                    <Text style={{ flex: 1 }}> </Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '75%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#0000ff',
                        color: 'white',
                        marginTop: 10,
                        padding: '2.5px 10px 2.5px 10px',
                        borderRadius: 5,
                        marginRight: 5
                    }}>
                        <Text>Observaciones: </Text>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '25%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#0000ff',
                        color: 'white',
                        marginTop: 10,
                        padding: '2.5px 10px 2.5px 10px',
                        borderRadius: 5
                    }}>
                        <Text>Total: </Text>
                        <Text>{objetoFacturaPDF.totalMasIva}</Text>
                    </View>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                    marginTop: 3,
                    padding: '2.5px 10px 2.5px 10px',
                    minHeight: 25
                }}>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#0000ff',
                    color: 'white',
                    marginTop: 10,
                    padding: '2.5px 10px 2.5px 10px',
                    borderRadius: 5
                }}>
                    <Text style={{ flex: 1 }}>Vencimientos</Text>
                    <Text style={{ flex: 1 }}>Importe</Text>
                    <Text style={{ flex: 2 }}>Domiciliación</Text>
                    <Text style={{ flex: 2 }}>Oficina</Text>
                    <Text style={{ flex: 1 }}>Número de cuenta</Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                    marginTop: 3,
                    padding: '2.5px 10px 2.5px 10px',
                    minHeight: 80
                }}>
                    <Text style={{ flex: 1 }}>{objetoFacturaPDF.diaPago}</Text>
                    <Text style={{ flex: 1 }}>{objetoFacturaPDF.totalMasIva}</Text>
                    <Text style={{ flex: 2 }}> </Text>
                    <Text style={{ flex: 2 }}> </Text>
                    <Text style={{ flex: 1 }}> </Text>
                </View>
                <Text style={{ textAlign: 'center' }}>Inscrita en el Reg. Mercantil de Barcelona: Tomo 9.570, Libro 8.745, Sección 2ª, Folio 118, Hoja 107.372 - N.I.F. B58692237</Text>
            </Page>
        </Document >
    );
};

export default FacturaPDF