'use client'
import {PDFDownloadLink} from '@react-pdf/renderer'
import {MyDocument} from '../components/CreatePDF'
export default function DownloadPage() {
    return(
        <PDFDownloadLink document={<MyDocument />} fileName='test.pdf'>
           <button>Click me</button>
        </PDFDownloadLink>
    )
}