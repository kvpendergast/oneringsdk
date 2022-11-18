const axios = require('axios')
const { queryBuilder } = require('./helpers')

class One {
    constructor(apiKey) {
        this.apiKey = apiKey
    }

    async client(path) {
        const response = await axios({
            method: 'get',
            url: `https://the-one-api.dev/v2/${path}`,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`
            }
        })

        return {
            results: response.data.docs,
            total: response.data.total,
            limit: response.data.limit,
            offset: response.data.offset,
            page: response.data.page,
            pages: response.data.pages
        }
    }

    getBooks = async (data) => { 
        try {
            const q = queryBuilder(data)
            const url = 'book' + q

            return await this.client(url)
        } catch (err) {
            return err.response ? err.response.data : err
        }
    }

    getMovies = async (data) => { 
        try {
            const q = queryBuilder(data)
            const url = 'movie' + q

            return await this.client(url)
        } catch (err) {
            return err.response ? err.response.data : err
        }
    }

    getCharacters = async (data) => { 
        try {
            const q = queryBuilder(data)
            const url = 'character' + q

            return await this.client(url)

        } catch (err) {
            return err.response ? err.response.data : err
        }
    }

    getQuotes = async (data) => { 
        try {
            const q = queryBuilder(data)
            const url = 'quote' + q

            return await this.client(url)
        } catch (err) {
            return err.response ? err.response.data : err
        }
    }

    getChapters = async (data) => { 
        try {
            const q = queryBuilder(data)
            const url = 'chapter' + q

            return await this.client(url)
        } catch (err) {
            return err.response ? err.response.data : err
        }
    }
}


exports.One = One


