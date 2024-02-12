import { db } from "../lib/db";
import { getUser } from "../login/actions";
import AddInvoice from "./components/AddInvoice";

export default async function Invoices() {
    /*
    1. Get Customers
    2. Pass on customers to select option on Modal-Form
    3. Pass info to action
    */

    const customers = await db.customer.findMany()
   
    return(
        <AddInvoice 
            customers={customers} />
    )
}