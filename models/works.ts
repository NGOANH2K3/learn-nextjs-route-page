export interface Work {
    id: string,
    title: string,
    tagList: string[],
    shortDescription: string,
    fullDescription: string,
    createdAt: string,
    updatedAt: string,
    thumbnailUrl: string,
}

export interface WorkPayLoad extends Work {
   // ...
    thumbnail: null | {
    file: File | null; 
    previewUrl: string
   }
}

export interface WorkFiltersPayLoad {
    search: string
    tagList_like?: string

    selectedTagList?: string[]
}

