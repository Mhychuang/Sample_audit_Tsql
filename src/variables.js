//for testing in local set to same
//for production https://data.ncsbe.gov/


export const env = process.env.NODE_ENV === 'production'? {
    apiUrl: 'https://data.ncsbe.gov/'
    //apiUrl: 'http://localhost:4001/'
}:{
    apiUrl: 'http://localhost:4001/'
}

