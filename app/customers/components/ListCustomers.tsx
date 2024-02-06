"use client"
import { Customer } from "@/app/types"
import DeleteCustomer from "./DeleteCustomer"
import UpdateCustomer from "./UpdateCustomer"
export default function ListCustomers({ customers }: { customers: Customer[] }) {
    return (
        <>
            <div className="max-w-md mx-auto">
                <table>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Customers List</h2>
                        <table className="min-w-full border rounded-md overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 border">Name</th>
                                    <th className="py-2 px-4 border">Email</th>
                                    <th className="py-2 px-4 border">Telephone</th>
                                    <th className="py-2 px-4 border">VAT NIF</th>
                                    <th className="py-2 px-4 border">Address</th>
                                    {/* Add more table headers as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {customers && customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td className="py-2 px-4 border">{customer.name || 'No Name'} {customer.surname || ''}</td>
                                        <td className="py-2 px-4 border">{customer.email}</td>
                                        <td className="py-2 px-4 border">{customer.telephone}</td>
                                        <td className="py-2 px-4 border">{customer.vatnif}</td>
                                        <td className="py-2 px-4 border">
                                            {customer.street || 'N/A'}, {customer.postal_code}, {customer.country}
                                        </td>
                                        {/* Add more table cells with customer information as needed */}
                                        <td className="mr-8">
                                            <UpdateCustomer id={customer.id} />
                                            </td>
                                        <td>
                                            <DeleteCustomer id={customer.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </table>    
            </div>

        </>
    )
}