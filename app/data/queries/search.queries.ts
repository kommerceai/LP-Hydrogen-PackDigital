import {PRODUCT_ITEM_FRAGMENT} from './product.queries';

/*
 * STOREFRONT API QUERIES -----------------------------------------------------
 */

export const PRODUCTS_SEARCH_QUERY = `#graphql
  query ProductsSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $filters: [ProductFilter!]
    $searchTerm: String!
    $startCursor: String,
    $sortKey: SearchSortKeys,
    $reverse: Boolean
  ) @inContext(country: $country, language: $language) {
    search(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
      productFilters: $filters,
      query: $searchTerm,
      types: PRODUCT,
      sortKey: $sortKey,
      reverse: $reverse,
    ) {
      nodes {
        ... on Product {
          ...ProductItemFragment
        }
      }
      filters: productFilters {
        id
        label
        type
        values {
          id
          label
          count
          input
          swatch {
            color
            image {
              mediaContentType
              previewImage {
                height
                id
                url
                width
                altText
              }
              id
              alt
            }
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }

  ${PRODUCT_ITEM_FRAGMENT}
` as const;

export const PRODUCTS_SEARCH_FILTERS_QUERY = `#graphql
  query ProductsSearch(
    $country: CountryCode
    $language: LanguageCode
    $searchTerm: String!
  ) @inContext(country: $country, language: $language) {
    search(
      first: 1,
      query: $searchTerm,
      types: PRODUCT,
    ) {
      filters: productFilters {
        id
        label
        type
        values {
          id
          label
          count
          input
        }
      }
    }
  }

` as const;

const PREDICTIVE_COLLECTION_FRAGMENT = `#graphql
  fragment PredictiveCollectionFragment on Collection {
    __typename
    id
    title
    handle
    image {
      url
      altText
      width
      height
    }
  }
` as const;

const PREDICTIVE_QUERY_FRAGMENT = `#graphql
  fragment PredictiveQueryFragment on SearchQuerySuggestion {
    __typename
    text
    styledText
  }
` as const;

export const PREDICTIVE_SEARCH_QUERY = `#graphql
  query PredictiveSearch(
    $country: CountryCode
    $language: LanguageCode
    $limit: Int!
    $limitScope: PredictiveSearchLimitScope!
    $searchTerm: String!
    $types: [PredictiveSearchType!]
  ) @inContext(country: $country, language: $language) {
    predictiveSearch(
      limit: $limit,
      limitScope: $limitScope,
      query: $searchTerm,
      types: $types,
    ) {
      collections {
        ...PredictiveCollectionFragment
      }
      queries {
        ...PredictiveQueryFragment
      }
    }
  }
  ${PREDICTIVE_COLLECTION_FRAGMENT}
  ${PREDICTIVE_QUERY_FRAGMENT}
` as const;
