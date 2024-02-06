"use client"
import { Customer } from "@/app/types";
import { useFormStatus, useFormState } from "react-dom";
import { createCustomer } from '@/app/actions'

const initialState = {
    message: ''
}

export default function AddCustomer() {
    const [state, addCustomer] = useFormState(createCustomer, initialState)
    const { pending } = useFormStatus()
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Customer Information</h2>
            <form action={addCustomer}>
                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* NIFVAT */}
                <div className="mb-4">
                    <label htmlFor="nifvat" className="block text-gray-600 text-sm font-medium mb-2">
                        NIF/VAT
                    </label>
                    <input
                        type="text"
                        id="nifvat"
                        name="nifvat"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label htmlFor="street" className="block text-gray-600 text-sm font-medium mb-2">
                        Street
                    </label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Postal code */}
                <div className="mb-4">
                    <label htmlFor="postal_code" className="block text-gray-600 text-sm font-medium mb-2">
                        Postal code
                    </label>
                    <input
                        type="text"
                        id="postal_code"
                        name="postal_code"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* City */}
                <div className="mb-4">
                    <label htmlFor="city" className="block text-gray-600 text-sm font-medium mb-2">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Country */}
                <div className="mb-4">
                    <label htmlFor="country" className="block text-gray-600 text-sm font-medium mb-2">
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                {/* Telephone */}
                <div className="mb-4">
                    <label htmlFor="telephone" className="block text-gray-600 text-sm font-medium mb-2">
                        Telephone
                    </label>
                    <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                {/* Submit button */}
                <div className="mt-6">
                    <button
                        aria-disabled={pending}
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
                    >
                        Save Customer
                    </button>

                    <p aria-live="polite" className="sr-only" role="status">
                        {state?.message}
                    </p>
                </div>
            </form>
        </div>
    );
}



