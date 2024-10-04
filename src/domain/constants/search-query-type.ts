export const SEARCH_QUERY_TYPES = {
    Resume: 'resume',
    JobDescription: 'job_description'
}

export type SearchQueryType = typeof SEARCH_QUERY_TYPES[keyof typeof SEARCH_QUERY_TYPES];
