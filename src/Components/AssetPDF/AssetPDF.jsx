import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: { padding: 40 },
  header: { marginBottom: 20, textAlign: 'center' },
  content: { marginBottom: 20 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center' }
});

const AssetPDF = ({ request }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>{request.companyName}</Text>
        <Text>{request.companyLogo}</Text>
      </View>
      
      <View style={styles.content}>
        <Text>Asset Name: {request.assetName}</Text>
        <Text>Asset Type: {request.assetType}</Text>
        <Text>Request Date: {format(new Date(request.requestDate), 'PP')}</Text>
        <Text>Approval Date: {format(new Date(request.approvalDate), 'PP')}</Text>
        <Text>Status: {request.status}</Text>
        <Text>Requester: {request.requesterName}</Text>
      </View>
      
      <View style={styles.footer}>
        <Text>Printed on: {format(new Date(), 'PP')}</Text>
      </View>
    </Page>
  </Document>
);

export default AssetPDF;