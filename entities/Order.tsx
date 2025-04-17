export type Order = {
    id: number;

    total: number;
    table: number;
    fidelity_pts_earned: number;
    status: string;

    created_at: Date;
    updated_at: Date;
}