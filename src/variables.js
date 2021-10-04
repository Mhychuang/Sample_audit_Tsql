export const env = process.env.NODE_ENV === 'production'? {
    // apiUrl: 'https://sampleaudit.ncsbe.gov/'
    apiUrl: 'https://data.ncsbe.gov/'
}:{
    apiUrl: 'http://localhost:4001/'
}

