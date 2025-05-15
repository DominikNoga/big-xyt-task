export type PriceLevel = {
    price: number;
    size: number;
};

export type OrderBookSnapshot = {
    time: string;
    bids: PriceLevel[];
    asks: PriceLevel[];
};

export type OrderBookSnapshotItemJson = {
    Time: string;
} & Record<Exclude<string, 'Time'>, number>;
