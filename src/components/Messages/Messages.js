import React from "react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import firebase from "../../firebase";
import { Segment, Comment } from "semantic-ui-react";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messageLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    progressBar: false,
    numUniqueUsers: ""
  };

  componentDidMount() {
    const { channel, user } = this.state;

    if (channel && user) {
      this.addListeners(channel.id);
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messageLoading: false
      });
      this.countUniqueUsers(loadedMessages);
    });
  };

  countUniqueUsers = messages => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
    this.setState({ numUniqueUsers });
  };

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => {
      return (
        <Message
          key={message.timestamp}
          message={message}
          user={this.state.user}
        />
      );
    });

  isProgressbarVisible = percent => {
    if (percent > 0) {
      this.setState({ progressBar: true });
    }
  };

  displayChannelName = channel => (channel ? `#${channel.name}` : "");

  render() {
    // prettier-ignore
    const { messagesRef, channel, user, messages, progressBar, numUniqueUsers } = this.state;

    return (
      <React.Fragment>
        <MessagesHeader
          channelName={this.displayChannelName(channel)}
          numUniqueUsers={numUniqueUsers}
        />

        <Segment>
          <Comment.Group
            className={progressBar ? "messages__progress" : "messages"}
          >
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
          isProgressbarVisible={this.isProgressbarVisible}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
