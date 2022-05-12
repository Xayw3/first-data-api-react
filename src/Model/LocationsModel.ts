export type Locations = {
    info: LocationsInfo,
    results: LocationsResult,
};

export type LocationsInfo = {
    count: number,
    pages: number,
    next: string,
    prev: null,
};

export type LocationsResult = {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: string[],
    url: string,
    created: string,
};
