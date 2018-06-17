import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import AddKptLog from '../organisms/AddKptLog';

const httpLink = createHttpLink({
  uri: '/api/graphql',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'Content-Type': 'application/json',
    'X-CSRF-Token': window.csrfToken,
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Dashboard = () => {
  const GET_KPT_LOG_LIST = `
  {
    user {
      kpt_logs {
        edges {
          node {
            id
            keep
            problem
            try
          }
        }
      }
    }
  }`;

  const kptLogItems = keptLogs => (
    <div>
      <div>KPT履歴</div>
      {keptLogs.edges.map(edge => (
        <ul key={`key-keptlog-${edge.node.id}`}>
          <li key={`key-keptlog-keep-${edge.node.id}`}>{edge.node.keep}</li>
          <li key={`key-keptlog-problem-${edge.node.id}`}>
            {edge.node.problem}
          </li>
          <li key={`key-keptlog-try-${edge.node.id}`}>{edge.node.try}</li>
        </ul>
      ))}
    </div>
  );

  return (
    <ApolloProvider client={client}>
      <div>
        <Query
          query={gql`
            ${GET_KPT_LOG_LIST}
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return <div>{kptLogItems(data.user.kpt_logs)}</div>;
          }}
        </Query>
        <AddKptLog />
      </div>
    </ApolloProvider>
  );
};

export default Dashboard;
