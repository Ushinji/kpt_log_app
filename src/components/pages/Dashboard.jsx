import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Queries from '../../queries';
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
  const kptLogItems = keptLogs => (
    <div className="test">
      <div>KPT履歴</div>
      {keptLogs.map(kptLog => (
        <ul key={`key-keptlog-${kptLog.id}`}>
          <li key={`key-keptlog-keep-${kptLog.id}`}>{kptLog.keep}</li>
          <li key={`key-keptlog-problem-${kptLog.id}`}>{kptLog.problem}</li>
          <li key={`key-keptlog-try-${kptLog.id}`}>{kptLog.try}</li>
        </ul>
      ))}
    </div>
  );

  return (
    <ApolloProvider client={client}>
      <div>
        <Query query={Queries.GET_KPT_LOGS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return <div>{kptLogItems(data.kpt_logs)}</div>;
          }}
        </Query>
        <AddKptLog />
      </div>
    </ApolloProvider>
  );
};

export default Dashboard;
