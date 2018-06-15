export interface Filter {
    fields: string[];
    limit: number;
    offset: number;
    orderByColumn: string,
    orderByDirection: string
}
