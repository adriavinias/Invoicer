import Link from "next/link";

export default function Error() {
    return (
        <>
            <h3>Something went wrong</h3>
            <Link
                href="/login">
                Back to Login
            </Link>

        </>

    )
}