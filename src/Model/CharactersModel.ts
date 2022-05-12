export type Character = {
    info: CharacterInfo,
    results: CharacterResult,
};

export type CharacterInfo = {
    count: number,
    pages: number,
    next: string,
    prev: null,
};

export type CharacterResult = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: CharacterResultOrigin,
    locations: CharacterResultLocation,
    image: string,
    episode: string[],
    url: string,
    created: string,
};

export type CharacterResultOrigin = {
    name: string,
    url: string,
}

export type CharacterResultLocation = {
    name: string,
    url: string,
}
