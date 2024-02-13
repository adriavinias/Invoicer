'use client'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "@nextui-org/react";
import { useState, useContext, createContext } from "react";
import Form from './Form'
import { createInvoice } from '../actions'
import { FormContextCustomers } from "../context/FormContext";
export default function AddInvoice({ customers }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}>
                Create Invoice
            </Button>


            <Modal
                size="4xl"
                isOpen={isOpen}
                onOpenChange={() => { setIsOpen(!isOpen) }}>

                <ModalContent>
                    <ModalHeader>
                        Invoice
                    </ModalHeader>
                    <ModalBody>
                        <FormContextCustomers.Provider value={customers}>
                            <Form />
                        </FormContextCustomers.Provider>
                    </ModalBody>
                </ModalContent>
                <ModalFooter>
                    
                </ModalFooter>

            </Modal>
        </>
    )
}