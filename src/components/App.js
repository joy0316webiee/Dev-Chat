import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import "./App.css";

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

const App = ({ currentUser }) => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <SidePanel currentUser={currentUser} />
    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages />
    </Grid.Column>
    <Grid.Column style={{ width: 4 }}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);

const mapStateFromProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateFromProps)(App);
