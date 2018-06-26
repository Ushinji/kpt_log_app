import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../queries';
import AddKptLog from '../organisms/AddKptLog';
import Pannel from '../molecules/Pannel';

const Dashboard = () => {
  const kptLogItems = keptLogs => (
    <div className="kptlog">
      <div className="kptlog__header">KPT振り返り </div>
      <div className="kptlog__body">
        {keptLogs.map(kptLog => (
          <div key={`key-keptlog-${kptLog.id}`} className="kptlog__item">
            <Pannel kptLog={kptLog} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
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
  );
};

export default Dashboard;
