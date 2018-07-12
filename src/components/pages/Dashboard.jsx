import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../queries';
import SideMenu from '../organisms/SideMenu';
import KptLog from '../organisms/KptLog';

const Dashboard = () => (
  <div className="container">
    <div className="container--header">KPTLog</div>
    <div className="container--body">
      <SideMenu />
      <Query query={Queries.GET_KPT_LOGS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return <KptLog kptLogs={data.kpt_logs} />;
        }}
      </Query>
    </div>
  </div>
);

export default Dashboard;
