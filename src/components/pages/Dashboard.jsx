import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../queries';
import Pannel from '../molecules/Pannel';
import SideMenu from '../organisms/SideMenu';

class Dashboard extends React.Component {
  render() {
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
      <div className="container">
        <div className="container--header">KPTLog</div>
        <div className="container--body">
          <SideMenu />
          <Query query={Queries.GET_KPT_LOGS}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              return kptLogItems(data.kpt_logs);
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default Dashboard;
