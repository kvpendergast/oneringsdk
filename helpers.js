const queryBuilder = (query) => {
    const { id, pagination, sort, filter } = query;
    let q = ''

    if (id) return q = '/' + id

    // handle pagination
    if (pagination) {
        Object.keys(pagination).map((k, i) => {
            q = q + k + '=' + pagination[k]
            if (i !== Object.keys(pagination).length - 1) q = q + '&'
        })
    }

    // handle sorting
    if (sort) {
        if (q) q = q + '&'
        q = q + 'sort' + '=' + sort.parameter + ':' + sort.direction
    }

    // handle filtering
    if (filter) {
        if (q) q = q + '&'
        if (filter.include) {
            if (!Array.isArray(filter.include.value)) q = q + filter.include.parameter + '=' + filter.include.value
            if (Array.isArray(filter.include.value)) q = q + filter.include.parameter + '=' + filter.include.value.join()
        }
        if (filter.exclude) {
            if (!Array.isArray(filter.exclude.value)) q = q + filter.exclude.parameter + '!=' + filter.exclude.value
            if (Array.isArray(filter.exclude.value)) q = q + filter.exclude.parameter + '!=' + filter.exclude.value.join()
        }
        if (filter.search) q = q + filter.search.parameter + '=' + `/${filter.search.value}/i`
    }

    if (q) q = '?' + q
 
    return q
}

exports.queryBuilder = queryBuilder;