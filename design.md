# The One Ring Design Philosophy
First off, I enjoyed the project! As a big Lord of the Rings fan, it was fun to build something that gave me access to so much info :)

# My Approach
First and foremost, I read through The One Ring API to understand basic functionality. From there, I started to think about a few things:

1. As a developer, how would I want to interact with this SDK? What SDKs do I really like and what do I like about them?
	
	- Straightforward -> I don't like SDKs that abstract away a lot of things unless its something very complex.
	- Get started fast -> I should be up and running with a basic command in seconds.
	- Readable methods -> I hate SDKs where I can't tell what a method does at first glance.
2. What kinds of things would someone be building with this SDK?

	- This question might be more for a product manager. But off the top of my head I can think of trivia apps, a UI for sorting/filtering LOTR information, or possibly a guide to use alongside watching the movies or reading the books.

3. What types of developers will use this SDK?

	- Probably more junior developers who aren't as familiar with using APIs or RESTful routes and want an easier way to get started. This means it has to be super easy and super straightforward. We'll also need to make sure our README is great!

Now that we have a starting point, let's talk about functional components.

# Functional Components
There are a few core components of this SDK that we'll need to build:

- A **class component** that can handle our authentication so the user can instantiate once.
- A **query builder** that translates our core methods into the appropriate API calls.
- **Methods** that will allow our users to easily interact with the API.
- A **README** that is easy to get started and understand.

## Class Component
The class component will be the meat of the SDK. It will house our auth client as well as all the methods we need to expose. the Class Component will consist of...

- Our authentication client
- Our methods

## Query Builder
The query builder was fun to build. I enjoyed translating my abstractions back to the API. I decided to enforce a fairly 1:1 matching of the original API documentation to the optional Pagination, Sorting, and Filtering parameters because I felt like this was the most straightforward approach. In general, the query object that the user can pass in can be destructured like this...

`const { id, pagination, sort, filter } = query`

The one change I did make was to combine match/negate with include/exclude. I felt like these were functionally the same with the exception of allowing multiple parameters vs. one. So, you can now pass an array of options to include/exclude in addition to just a single option.

## Methods
In keeping with simplicity, I mostly did a 1:1 match with the API. The one exception is that I combined the call for a single document (`GET /books/id`) with a call for multiple documents (`GET /books`). I did this by allowing the user to pass an optional `id` parameter to the query object. If they provide an id, then the rest of the query object gets ignored and we return that specific document. It looks something like...

```
const Aragorn = new One('api_key')
Aragorn.getBooks({id: 'a book id'})
```
I felt this keeps things simple so you don't need a separate method when handling requests for one specific document. For bigger SDKs that are more complex, we may want to rethink that.

## README
A great Readme is vital for great SDKs. I focused on providing a quick, fully working example right off the bat before diving into more complex queries like pagination, sorting, filtering, etc. If I had more time, I'd also add example responses so users can see what those look like.

## Exclusions
There are a few things I opted to not include in this SDK.

- GET /book/{id}/chapter
- GET /movie/{id}/quote
- GET /character/{id}/quote
- less than, greater than, or equal to

I opted not to include these because they were either very specific to a given route that had a small number of documents or could be easily handled by combining two calls. For example, you could first find the movie you want and then do a separate call filtering quotes by that movie. 

From what I could tell, less than/greater than/equal only applied to the movie route. Of which, there are such a small number of documents that the user can easily manipulate these after doing the initial get call. For larger datasets, we would definitely want to turn on this functionality.

## Conclusion
I had a great time building this SDK and learned a lot in the process. Thanks for your consideration and I welcome any feedback you have.
