import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet
} from "@react-pdf/renderer";
import Budget from "../Dashboard/Budget"

const styles = StyleSheet.create({
    page: {
        padding: 10
    },
    section: {
        flexGrow: 1
    }
});

function PDF() {
    return (
        <Document title="Futurecast Financial Plan">
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Financial Plan</Text>
                </View>
                <View style={styles.section}>
                    <Text>We're inside a PDF!</Text>
                </View>
            </Page>
        </Document>
    );
}

export default PDF;