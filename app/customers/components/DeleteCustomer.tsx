import { useFormStatus, useFormState } from "react-dom"
import { deleteCustomer } from "@/app/actions"

export default function DeleteCustomer({id} : {id:String}) {
    const deleteCustomerWithId = deleteCustomer.bind(null, id)

    const [state, deleteFormAction] = useFormState(deleteCustomerWithId, {message: ''})

    return (
        <>
            <form className=""  action={deleteFormAction}>
                <button className="" type="submit">Delete</button>
            </form>
        </>
    )
}