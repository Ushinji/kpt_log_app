import React from 'react';
import AddKptLogModal from './AddKptLogModal';

class SideMenu extends React.Component {
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

    return (
      <div className="side-menu">
        <div
          className="side-menu--item"
          onClick={this.openModal}
          role="presentation"
        >
          <i className="material-icons">add</i>
          新規作成
        </div>
        <div className="side-menu--item">
          <i className="material-icons">date_range</i>
          作成履歴
        </div>
        <AddKptLogModal
          isOpen={modalIsOpen}
          closeModal={this.closeModal}
          contentLabel="AddKPTLogModal"
        />
      </div>
    );
  }
}

export default SideMenu;
