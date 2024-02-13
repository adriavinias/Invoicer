'use client'
import { FormEvent, useContext, useState } from "react"
import { Input, Select, SelectItem, Button } from "@nextui-org/react"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { FormContextCustomers, FormContextUsers } from "../context/FormContext"
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from 'uuid';
import { createInvoice } from "../actions";
import { useFormState } from "react-dom";

export default function Form() {
    const [state, createInv] = useFormState(createInvoice, null)


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

                if(productLine.price && productLine.qty){
                    productLine = {...productLine, total: parseFloat(productLine.price) * parseFloat(productLine.qty)}
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
        <form action={createInv}>
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
        </form>
    )
}