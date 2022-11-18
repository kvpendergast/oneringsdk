# The One Ring!

The One Ring is a javascript SDK for The One API (https://the-one-api.dev/) which interacts with a database of Lord of the Rings information. You can use it to easily grab information on the acclaimed Lord of the Rings series!

## Table of Contents
1. Installation
2. Getting Started
3. All Functions
4. Pagination, Filtering, and Sorting
5. Questions? Contribute?

## Installation
Install using NPM.
`npm i @kvpendergast/theonering`

## Getting Started

### Authentication
The One Ring requires authentication for all routes except for GET /books. You can head over to https://the-one-api.dev/ to create an account and grab an API key. Once you have your key, you can authenticate using the SDK just like this:

```
const { One } = require('@kvpendergast/theonering')

const Aragorn = new One('Your API Key')
```

### Basic Example
Let's use the SDK to get a list of all the Lord of the Rings Movies.
```
const { One } = require('@kvpendergast/theonering')

const Aragorn = new One('Your API Key')

async function run() {
	const movies = await Aragorn.getMovies()
}

run()
```

## All Functions
We can do more than grab some movies! Here's a list of all the basic resource routes. All resources return a list of objects with pagination metadata.

`getBooks` 
`getMovies`
`getQuotes`
`getChapters`
`getCharacters`

## Pagination, Filtering, and Sorting
This SDK does have support for basic pagination, sorting, and filtering. You can use these in your requests by creating a query object and passing it as a parameter for the resource you're calling.

A query object will have nested pagination, sort, and filter objects. Each has its own set of options.

### Basic Example
The example below will limit the response to 5 documents and only return page 3 of all possible pages.
```
async function run() {
	const query = { 
		pagination: {
			limit: 5,
			page: 3
		}
	}
	const movies = await Aragorn.getCharacters(query)
}

run()
```

### Pagination
Possible pagination options are...

- **limit** -> limits the number of documents returned in the response.
- **offset** -> skips the specified number of documents before returning.
- **page** -> Given a limit (if no limit is specified it defaults to 10) return a specific page.

### Sorting
Sorting can be added to a query object by specifying the document parameter to sort by and the direction of the sort `asc` or `desc`

```
const query = { 
	sort: {
		parameter: 'name',
		direction: 'asc',
	}
}
```

### Filtering
Filtering follows a similar convention to sorting. Filtering options are...

- **include** -> Filter the documents to those that match a given parameter and a value/array of values (i.e. race=dwarves OR race=['dwarves', 'elves']
- **exclude** -> Filter the documents to those that do NOT match a given parameter and a value/array of values (i.e. race!=dwarves OR race!=['dwarves', 'elves']
- **search** -> Perform a basic regex search on a provided value for a specified parameter (i.e. name=Gan would return any documents with a name that included Gan. 

**Example**
```
{
	filter: {
		include: {
			parameter: 'race',
			value: 'dwarves'
		},
		exclude: {
			parameter: 'race',
			value: ['human', 'elves']
		},
		search: {
			parameter: 'name',
			value: 'Gim'
		}
	}
}
```

# Questions? Contribute?
Have questions about this SDK? Want to contribute? Shoot me an email at kvpendergast@gmail.com.

Credit goes to https://the-one-api.dev/ for making an incredible database of information about LOTR!