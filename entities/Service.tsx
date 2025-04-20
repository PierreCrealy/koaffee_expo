export type Service = {
    id: number;

    name: string;
    description: string;
    price: number;

    highlight: boolean;
    proposed: boolean;

    created_at: Date;
    updated_at: Date;
}