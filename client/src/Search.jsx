// import React from 'react';
// import { InstantSearch, SearchBox, Hits, Stats } from 'react-instantsearch-dom';
// import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

// // Initialize the TypesenseInstantSearchAdapter with your Typesense server details for charities
// const typesenseInstantsearchAdapterCharities = new TypesenseInstantSearchAdapter({
//   server: {
//     apiKey: 'xyz', // Use a Search API Key
//     nodes: [
//       {
//         host: 'localhost',
//         port: '8108',
//         protocol: 'http'
//       },
//     ],
//   },
//   // Additional search parameters for charities
//   additionalSearchParameters: {
//     queryBy: 'name,email,phone number,type', // Fields to search within for charities
//   },
// });

// // Initialize the TypesenseInstantSearchAdapter with your Typesense server details for posts
// const typesenseInstantsearchAdapterPosts = new TypesenseInstantSearchAdapter({
//   server: {
//     apiKey: 'WFwOG63UuT4s6AyZZKUfb2w9Z41AQrOh', // Use a Search API Key
//     nodes: [
//       {
//         host: 'ul1p783ztkoredcyp-1.a1.typesense.net',
//         port: '443',
//         protocol: 'https'
//       },
//     ],
//   },
//   // Additional search parameters for posts
//   additionalSearchParameters: {
//     queryBy: 'body,preview_caption,title', // Fields to search within for posts
//   },
// });

// const searchClientCharities = typesenseInstantsearchAdapterCharities.searchClient;
// const searchClientPosts = typesenseInstantsearchAdapterPosts.searchClient;

// const SearchInterface = () => {
//   const CharitiesHit = ({ hit }) => (
//     <div>
//       <h3>{hit.name}</h3>
//       <p>{hit.email}</p>
//       <p>{hit['phone number']}</p>
//       <p>{hit.type}</p>
//     </div>
//   );

//   const PostsHit = ({ hit }) => (
//     <div>
//       <h3>{hit.title}</h3>
//       <p>{hit.preview_caption}</p>
//       <p>{hit.body}</p>
//     </div>
//   );

//   return (
//     <div>
//       <InstantSearch searchClient={searchClientCharities} indexName="charities">
//         <h2>Charities</h2>
//         <SearchBox />
//         <Stats />
//         <Hits hitComponent={CharitiesHit} />
//       </InstantSearch>
//       <InstantSearch searchClient={searchClientPosts} indexName="posts">
//         <h2>Posts</h2>
//         <SearchBox />
//         <Stats />
//         <Hits hitComponent={PostsHit} />
//       </InstantSearch>
//     </div>
//   );
// };

// export default SearchInterface;
