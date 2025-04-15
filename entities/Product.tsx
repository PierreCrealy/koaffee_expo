export type Product = {
    id: number;

    name: string;
    description: string;
    category: number;
    price: number;

    highlight: boolean;
    fidelity_program: boolean;
    proposed: boolean;

    created_at: Date;
    updated_at: Date;
}