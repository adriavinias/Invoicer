'use client'
import { useContext, useState } from "react"
import { Input, Select, SelectItem, Button } from "@nextui-org/react"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { FormContextCustomers, FormContextUsers } from "../context/FormContext"
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from 'uuid';

export default function Form() {
    //get customers from context
    const customers = useContext(FormContextCustomers)
    const [products, setProducts] = useState([{
        id: uuidv4(),
        description: '',
        price: '',
        qty: '',
        total: ''
    }])
    const [productLine, setProductLine] = useState()

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
            total: ''
        }])
    }

    return (
        <form action="">
            <div className="flex justify-items mt-4">
                <Select
                    items={customers ? customers : []}
                    label="Customers"
                    placeholder="Select a customer"
                    className="max-w-xs w-full w-3/4"
                    size="sm"
                    
                >
                    {({ id, name, surname }) => <SelectItem key={id}>{`${name} ${surname}`}</SelectItem>}
                </Select>

                <Input
                    type="date"
                    size="sm"
                    className="w-full px-3 w-1/4" />

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
                    {products?.map((product) => {
                        return (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Input
                                        type="text"
                                        size="sm">{product.description}</Input>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        size="sm"
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">€</span>
                                            </div>
                                        }>{product.price}</Input>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        size="sm">{product.qty}</Input>
                                </TableCell>
                                <TableCell>
                                    <Input isReadOnly
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">€</span>
                                            </div>
                                        }
                                    >{product.total}</Input>
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
            <Button className="mt-5"
                isIconOnly
                color="success"
                onClick={handleAdd}
            >
                <PlusCircleIcon className="h-4 w-4" />
            </Button>
        </form>
    )
}