import React from 'react';
import gql from 'graphql-tag';
import { Query, ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
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
              rates(currency: "USD") {
                currency
                rate
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.rates.map(({ currency, rate }) => (
              <div key={currency}>
                <p>{`${currency}： ${rate}`}</p>
              </div>
            ));
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default Count;
