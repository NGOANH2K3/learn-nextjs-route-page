export interface Work {
    id: string,
    title: string,
    tagList: string[],
    shortDescription: string,
    fullDescription: string,
    createAt: string,
    updateAt: string,
    thumbnailUrl: string,
}

export interface WorkFiltersPayLoad {
    search: string
}