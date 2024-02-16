'use client'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 'auto',
        marginTop: '25px'
    },
    billInfo: {
        fontSize: '1rem',
        fontFamily:'Roboto',
        padding: '2px'
    }
})

export const MyDocument = () => {
    return (
        <Document>
            <Page>
                <View style={styles.container}>
                    <BillInfo />
                    <BillInfo />
                </View>

            </Page>
        </Document>
    )
}

const ImagePDF = () => {
    return (
        <View>
            <Image src={''}/>
        </View>

    )
}

const BillInfo = ({ }) => {
    return (
        <View style={styles.billInfo}>
            <Text>Nom</Text>
            <Text>Cognom</Text>
            <Text>Adreça</Text>
            <Text>Codi Postal</Text>
            <Text>Ciutat</Text>
            <Text>Pais</Text>
            <Text>Telèfon</Text>
            <Text>Email</Text>
        </View>
    )
}

const TableProducts = () => {
    return (
        <View>

        </View>
    )
}

