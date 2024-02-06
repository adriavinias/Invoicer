import { updateCustomer } from "@/app/actions";
import { useFormState } from "react-dom";

const initialState = {
    message: ''
}

export default function UpdateCustomer({id}: {id: String}) {
    const updateCustomerWithId = updateCustomer.bind(null, id);

    const [state, updateAction] = useFormState(updateCustomerWithId, initialState)
    return(
        <>
            <form action={updateAction}>
                <button type="submit">
                    Update
                </button>
            </form>
        </>
    );
}