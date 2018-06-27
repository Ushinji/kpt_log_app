import React from 'react';
import { Query } from 'react-apollo';
import Modal from 'react-modal';
import Queries from '../../queries';
import Pannel from '../molecules/Pannel';

Modal.setAppElement('#root');

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
      <div>
        <Query query={Queries.GET_KPT_LOGS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return <div>{kptLogItems(data.kpt_logs)}</div>;
          }}
        </Query>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <button type="button" onClick={this.closeModal}>
            モーダルを閉じる
          </button>
          <div>ほげえええええええ</div>
        </Modal>
        <button type="button" onClick={this.openModal}>
          モーダルを開く
        </button>
      </div>
    );
  }
}

export default Dashboard;
