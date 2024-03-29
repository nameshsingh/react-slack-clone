import React, { Component } from "react";
import { Menu, Icon, Form, FormField, Input, Button, Modal } from "semantic-ui-react";
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel } from "../../actions";


class Channels extends Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref('channels'),
    modal: false,
    firstLoad: true,
    activeChannel: ''
  };

  componentDidMount() {
      this.addListener();
  }

  addListener = () => {
      let loadedChannels = [];

      this.state.channelsRef.on('child_added', snap => {
          loadedChannels.push(snap.val());
          this.setState({
              channels: loadedChannels
          }, () => this.setFirstChannel())
          // console.log(loadedChannels);
      })
  }

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];

    if(this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
    }

    this.setState({
      firstLoad: false
    })
  }

  setActiveChannel = channel => {
    this.setState({
      activeChannel: channel.id
    });
  }

  closeModal = () => {
    this.setState({
      modal: false
    });
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  openModal = () => {
    this.setState({
      modal: true
    });
  };

  handleSubmit = event => {
      event.preventDefault();
      if(this.isFormValid(this.state)) {
          this.addChannel();
      }
  }
  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
        id: key,
        name: channelName,
        details: channelDetails,
        createdBy: {
            name: user.displayName,
            avatar: user.photoURL
        }
    };
    channelsRef.child(key).update(newChannel).then(() => {
        this.setState({ 
            channelName: '',
            channelDetails: ''
        });
        this.closeModal();
        console.log("Channel Added");

    }).catch((err) => {
        console.error(err);
    })
  };
  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners = () => {
    this.state.channelsRef.off();
  };

  displayChannel = channels => channels.length > 0 && channels.map(channel => (
      <Menu.Item name={channel.name} key={channel.id} style={{opacity: 0.7}} active={channel.id === this.state.activeChannel} onClick={() => this.changeChannel(channel)}>
        # {channel.name}
      </Menu.Item>
  ))
  isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;

  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
  }
  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon onClick={this.openModal} name="add" />
          </Menu.Item>
          {/* { Channels } */}

          {this.displayChannel(channels)}
        </Menu.Menu>
        {/* // Add channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <FormField>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </FormField>
              <FormField>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </FormField>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}


export default connect(null, { setCurrentChannel })(Channels);