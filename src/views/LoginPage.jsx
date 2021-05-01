import React, { Component } from "react";
import {
  Panel,
  FormGroup,
  Form,
  ControlLabel,
  Button,
  FormControl,
} from "rsuite";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Panel style={{ width: 350 }} header={<h4>Login</h4>} bordered>
          <Form>
            <FormGroup>
              <ControlLabel>Username</ControlLabel>
              <FormControl name="name" placeholder="Username" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                name="password"
                type="password"
                placeholder="••••••••"
              />
            </FormGroup>
            <FormGroup>
              <Button appearance="primary" block>
                Submit
              </Button>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    );
  }
}

export default LoginPage;
