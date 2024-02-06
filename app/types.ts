export type User = {
    id: string;
    email: string;
    telephone: string;
    name?: string | null;
    surname?: string | null;
    vatnif: string;
    street: string;
    postal_code: string;
    city: String;
    country: string;
    invoices: Invoice[];
};

export type Customer = {
    id: string;
    email: string;
    telephone: string;
    name?: string | null;
    surname?: string | null;
    vatnif: string;
    street?: string | null;
    postal_code: string;
    city: String;
    country: string;
    invoices?: Invoice[] | null;
    updatedAt: Date ;
};

export type Invoice = {
    id: string;
    invoiceNumber: string;
    issueDate: Date;
    dueDate?: Date | null;
    totalAmount: number;
    status?: string | null;
    // Relation customer
    customer: Customer;
    customerId: string;
    // Relation user (gerard, arnau)
    user: User;
    userId: string;
    updatedAt: Date;
};
