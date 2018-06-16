import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

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

class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Query
          query={gql`
            {
              user {
                id
                name
                email
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
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            console.log(data.user.kpt_logs);

            return (
              <div>
                <div>
                  <div>ユーザー名</div>
                  <div>{data.user.name}</div>
                </div>
                <div>
                  <div>メールアドレス</div>
                  <div>{data.user.email}</div>
                </div>
                <div>
                  <div>Kpt履歴</div>
                  {data.user.kpt_logs.edges.map(edge => (
                    <ul key={`key-keptlog-${edge.node.id}`}>
                      <li key={`key-keptlog-keep-${edge.node.id}`}>
                        {edge.node.keep}
                      </li>
                      <li key={`key-keptlog-problem-${edge.node.id}`}>
                        {edge.node.problem}
                      </li>
                      <li key={`key-keptlog-try-${edge.node.id}`}>
                        {edge.node.try}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default Count;
