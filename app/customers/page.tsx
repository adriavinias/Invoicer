import AddCustomer from "./components/AddCustomer";
import ListCustomers from "./components/ListCustomers";
import { getCustomers } from "../actions";

export default async function Customers () {

   const customers = await getCustomers()
    
    return (
        <>
        <h3>Customers</h3>
        <AddCustomer />
        <ListCustomers customers={customers} />
        </>
    )
}