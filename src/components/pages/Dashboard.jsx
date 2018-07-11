import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../queries';
import Pannel from '../molecules/Pannel';
import AddKptLogModal from '../organisms/AddKptLogModal';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  render() {
    const { modalIsOpen } = this.state;

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
          <div className="side-menu">
            <button
              onClick={this.openModal}
              className="side-menu--item"
              type="button"
            >
              <AddKptLogModal
                isOpen={modalIsOpen}
                closeModal={this.closeModal}
                contentLabel="AddKPTLogModal"
              />
              モーダルを開く
            </button>
            <div className="side-menu--item">作成履歴</div>
          </div>
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
