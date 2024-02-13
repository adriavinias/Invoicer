'use client'
import { FormEvent, useContext, useState } from "react"
import { Input, Select, SelectItem, Button } from "@nextui-org/react"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { FormContextCustomers, FormContextUsers } from "../context/FormContext"
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from 'uuid';
import { createInvoice } from "../actions";

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

    const handleProductChange = (event: FormEvent, index: number) => {
        const productLines = products.map((product, i) => {
            if(index === i){
                let productLine = {...product}
                const {target} = event as HTMLInputElement
                if(target.name === 'description'){
                    productLine = {...productLine, description: target.value}
                }
                if(target.name === 'price'){
                    productLine = {...productLine, price: target.value}
                }
                if(target.name === 'qty'){
                    productLine = {...productLine, qty: target.value}
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
            total: ''
        }])
    }



    return (
        <form>
            <div className="flex justify-items-end mt-4">
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
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Input
                                        type="text"
                                        size="sm"
                                        name="description"
                                        defaultValue={product.description} 
                                        onBlur={(event)=>handleProductChange(event, index)}/>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        size="sm"
                                        name="price"
                                        defaultValue={product.price}
                                        onBlur={(event)=>handleProductChange(event, index)}
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">€</span>
                                            </div>
                                        } />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        size="sm"
                                        name="qty"
                                        defaultValue={product.qty}
                                        onBlur={(event)=>handleProductChange(event, index)} />
                                </TableCell>
                                <TableCell>
                                    <Input 
                                        isReadOnly
                                        defaultValue={product.total}
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
            <Button className="mt-5"
                isIconOnly
                color="success"
                onClick={handleAdd}
            >
                <PlusCircleIcon className="h-4 w-4" />
            </Button>
            <Button formAction={createInvoice} color="default">
                Create Invoice
            </Button>
        </form>
    )
}