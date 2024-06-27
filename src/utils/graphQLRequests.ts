const GET_USERS_FROM_COUNTRY = (country: string = 'Brazil', fromDate: string, toDate: string) => (
    `query GetUsersByCountry($endCursor: String) {
  search(
    query: "location:${country} sort:followers"
    type: USER
    first: 50
    after: $endCursor
  ) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
    }
    userCount
    nodes {
      ... on User {
        login
        id
        email
        avatarUrl
        location
        followers {
          totalCount
        }
        contributionsCollection(from: "${fromDate}", to: "${toDate}") {
          totalCommitContributions
          totalPullRequestContributions
          restrictedContributionsCount
        }
      }
    }
  }
}`);

const GET_USER_BY_LOGIN = (fromDate: string, toDate: string) => (
`query GetUserByLogin($login: String!, $followersCursor: String) {
  user(login: $login) {
    id
    login
    email
    name
    avatarUrl
    location
    contributionsCollection(from: "${fromDate}", to: "${toDate}") {
      totalCommitContributions
      totalPullRequestContributions
      restrictedContributionsCount
    }
    followers(first: 50, after: $followersCursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
      nodes {
        login
        id
        email
        avatarUrl
        location
        followers {
          totalCount
        }
        contributionsCollection(from: "${fromDate}", to: "${toDate}") {
          totalCommitContributions
          totalPullRequestContributions
          restrictedContributionsCount
        }
      }
    }
  }
}
`
);

export const GraphQlRequests = {
    GET_USERS_FROM_COUNTRY,
    GET_USER_BY_LOGIN
};