const axios = require('axios')
const { queryBuilder } = require('./helpers')

class One {
    constructor(apiKey) {
        this.apiKey = apiKey
    }

    client(path) {
        const response = axios({
            method: 'get',
            url: `https://the-one-api.dev/v2/${path}`,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`
            }
        })

        return response
    }

    getBooks = async (data) => { 
        const q = queryBuilder(data)
        const url = 'book' + q

        try {
            const response = await this.client(url)

            return response.data;
        } catch (err) {
            console.log('err ', err)
        }
    }

    getMovies = async (data) => { 
        const q = queryBuilder(data)
        const url = 'movie' + q

        try {
            const response = await this.client(url)

            return response.data;
        } catch (err) {
            console.log('err ', err)
        }
    }

    getCharacters = async (data) => { 
        const q = queryBuilder(data)
        const url = 'character' + q

        try {
            const response = await this.client(url)

            return response.data;
        } catch (err) {
            console.log('err ', err)
        }
    }

    getQuotes = async (data) => { 
        const q = queryBuilder(data)
        const url = 'quote' + q

        try {
            const response = await this.client(url)

            return response.data;
        } catch (err) {
            console.log('err ', err)
        }
    }

    getChapters = async (data) => { 
        const q = queryBuilder(data)
        const url = 'chapter' + q

        try {
            const response = await this.client(url)

            return response.data;
        } catch (err) {
            console.log('err ', err)
        }
    }
}

exports.One = One


