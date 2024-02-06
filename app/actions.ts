"use server"
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache';
import { Customer } from './types';
import z from 'zod'
import { redirect } from 'next/dist/server/api-utils';

//create customer

export async function createCustomer(prevState: { message: String }, formData: FormData) {

    const CustomerSchema = z.object({
        id: z.string().nullable(),
        email: z.string().email(),
        telephone: z.string(),
        name: z.string().nullable(),
        surname: z.string().nullable(),
        vatnif: z.string(),
        street: z.string().nullable(),
        postal_code: z.string(),
        country: z.string(),
        invoices: z.array(z.object({/* Define the Invoice schema here if needed */ })).nullable(),
        updatedAt: z.date().nullable(),
    });

    //parse data using CustomerSchema as reference

    const data = CustomerSchema.parse({
        id: formData.get('id'),
        email: formData.get('email'),
        telephone: formData.get('telephone'),
        name: formData.get('name'),
        vatnif: formData.get('nifvat'),
        street: formData.get('street'),
        postal_code: formData.get('postal_code'),
        country: formData.get('country')
    })



    //SOLUCIONAR PROBLEMA AMB SAFEPARSE, COMPROVAR TYPES
    const prisma = new PrismaClient()

    try {

        await prisma.customer.create({
            data: data
        })
    } catch (error) {
        return error
    }

    revalidatePath("/customers")
    //redirect()??
}

//get customer

export async function getCustomers() {
    const prisma = new PrismaClient()

    try {
        const customers = await prisma.customer.findMany()
        return customers
    } catch (e) {
        return {message: 'Database error, unable to get customers'}
    }

}

//update

export async function updateCustomer(userId: String, formData: FormData) {
    const prisma = new PrismaClient()

    try {
        await prisma.customer.update({
            //data
            where: {
                id: userId
            }
        })
    } catch (e) {
        return {message: 'Database error, unable to update customer'}
    }



    revalidatePath("/customers")
}

//delete customer

export async function deleteCustomer(id: string) {
    const prisma = new PrismaClient()

    try {
        await prisma.customer.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        return {message: 'Database error, unable to delete customer'}
    }
    

    revalidatePath("/customers")
}


