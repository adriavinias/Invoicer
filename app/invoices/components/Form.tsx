'use client'
import { FormEvent, useContext, useState } from "react"
import { Input, Select, SelectItem, Button } from "@nextui-org/react"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { FormContextCustomers, FormContextUsers } from "../context/FormContext"
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from 'uuid';
import { createInvoice } from "../actions";
import { useFormState } from "react-dom";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import { getCustomerBYId } from "@/app/actions";
import { custom, object } from "zod";

const handleDownload = async (prevState: any, formData: FormData) => {
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });
    const customerId = formData.get('customer') as string
    const customer = await getCustomerBYId(customerId)

    const { id, updatedAt, ...rest } = customer
    //crear function PRINT

    print(doc, rest, 10)

    const description = formData.getAll('description')
    const price = formData.getAll('price')
    const qty = formData.getAll('qty')
    const total = formData.getAll('total')

    const body = description.reduce((acc, current, i) => {
        acc.push([description[i], price[i], qty[i], total[i]])
        return acc
    }, [])


    autoTable(doc, {
        styles: {fontSize: 15 },
        margin: { top: 110, left: 10},
        head: [['Description', 'Price', 'Qty', 'Total']],
        body: body,

    })
    doc.save('hola.pdf')
}

function print(doc: any, obj: Object, p: number) {
    let padding = p
    for (const [key, value] of Object.entries(obj)) {
        doc.text(value, 10, padding)
        padding += 10
    }
}

export default function Form() {
    const [state, createInv] = useFormState(createInvoice, null)
    const [downloadStatus, downloadAction] = useFormState(handleDownload, null)
    //get customers from context
    const customers = useContext(FormContextCustomers)
    const [products, setProducts] = useState([{
        id: uuidv4(),
        description: '',
        price: '',
        qty: '',
        total: 0
    }])


    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState(0)

    const [productLine, setProductLine] = useState()




    const handleProductChange = (event: FormEvent, index: number) => {
        const productLines = products.map((product, i) => {
            if (index === i) {
                let productLine = { ...product }
                const { target } = event as HTMLInputElement
                if (target.name === 'description') {
                    productLine = { ...productLine, description: target.value }
                }
                if (target.name === 'price') {
                    productLine = { ...productLine, price: target.value }
                }
                if (target.name === 'qty') {
                    productLine = { ...productLine, qty: target.value }
                }

                if (productLine.price && productLine.qty) {
                    productLine = { ...productLine, total: parseFloat(productLine.price) * parseFloat(productLine.qty) }
                }

                return productLine
            }
            return product
        })
        setProducts(productLines)
    }

    const handleDelete = (id: string) => {
        const filteredProducts = products.filter((product) => product.id !== id)
        setProducts(filteredProducts)
    }

    const handleAdd = () => {
        setProducts([...products, {
            id: uuidv4(),
            description: '',
            price: '',
            qty: '',
            total: 0
        }])

    }




    return (
        <form>
            <div className="flex justify-items-end mt-4">
                <Select
                    key="customer"
                    items={customers ? customers : []}
                    label="Customers"
                    placeholder="Select a customer"
                    className="max-w-xs w-full w-3/4"
                    size="sm"
                    name="customer"

                >
                    {({ id, name, surname }) => <SelectItem key={id}>{`${name} ${surname}`}</SelectItem>}
                </Select>

                <Input
                    key="date"
                    type="date"
                    size="sm"
                    className="w-full px-3 w-1/4"
                    name="date"
                    data-focus="hola" />
            </div>

            <div>
                <h3>

                </h3>
            </div>

            <Table className="mt-5"
                shadow="md">
                <TableHeader>
                    <TableColumn width={'50%'}>
                        Description
                    </TableColumn>
                    <TableColumn width={'20%'}>
                        Price
                    </TableColumn>
                    <TableColumn width={'15%'}>
                        Qty
                    </TableColumn>
                    <TableColumn width={'15%'}>
                        Total
                    </TableColumn>
                    <TableColumn>
                        {''}
                    </TableColumn>
                </TableHeader>

                <TableBody>
                    {products?.map((product, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>
                                    <Input
                                        aria-label="description"
                                        type="text"
                                        size="sm"
                                        name="description"
                                        defaultValue={product.description}
                                        onBlur={(event) => handleProductChange(event, index)} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        aria-label="price"
                                        type="number"
                                        size="sm"
                                        name="price"
                                        defaultValue={product.price}
                                        onBlur={(event) => handleProductChange(event, index)}
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">€</span>
                                            </div>
                                        } />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        aria-label="qty"
                                        type="number"
                                        size="sm"
                                        name="qty"
                                        defaultValue={product.qty}
                                        onChange={(event) => handleProductChange(event, index)} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        aria-label="total"
                                        isReadOnly
                                        size="sm"
                                        defaultValue={`${product.total}`}
                                        value={`${product.total}`}
                                        name="total"
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">€</span>
                                            </div>
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        isIconOnly
                                        color="danger"
                                        onClick={() => handleDelete(product.id)}>
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )

                    })}

                </TableBody>
            </Table>
            <Button className="mt-4"
                isIconOnly
                color="success"
                onClick={handleAdd}
            >
                <PlusCircleIcon className="h-4 w-4" />
            </Button>
            <Button type="submit" color="default">
                Create Invoice
            </Button>
            <button formAction={downloadAction} color="default">
                Download Invoice
            </button>
        </form>
    )
}