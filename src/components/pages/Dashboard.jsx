import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../queries';
import AddKptLog from '../organisms/AddKptLog';

const Dashboard = () => (
  <div>
    <Query query={Queries.GET_KPT_LOGS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading... </p>;
        if (error) return <p>Error :( </p>;
        console.log(data);

        return (
          <div>
            <div>KPT履歴                         </div>
            {data.kpt_logs.map(kptLog => (
              <ul key={`key-${kptLog.id}`}>
                <li key={`key-keep-${kptLog.id}`}>{kptLog.keep}                </li>
                <li key={`key-problem-${kptLog.id}`}>{kptLog.problem}                </li>
                <li key={`key-try-${kptLog.id}`}>{kptLog.try}                </li>
              </ul>
            ))}
          </div>
        );
      }}
    </Query>
    <AddKptLog />
  </div>
);

export default Dashboard;
