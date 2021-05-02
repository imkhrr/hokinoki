import axios from "axios";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authenticated } from "../store/User";
import FormError from "../components/FormError";
import {
  Panel,
  FormGroup,
  Form,
  ControlLabel,
  Button,
  FormControl,
  Input,
} from "rsuite";

function LoginPage(props) {
  const setAuth = useSetRecoilState(authenticated);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const data = { username, password };

  const auth = async (e) => {
    e.preventDefault();
    setErrors("");
    try {
      let response = await axios.post("login", data);
      localStorage.setItem("userToken", response.data.token);
      setAuth({ check: true, user: response.data.data });
    } catch (e) {
      setErrors(e.response.data.errors);
      console.clear();
    }
  };
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
        {errors.message ? <div>{errors.message[0]}</div> : ""}
        <Form onSubmit={auth}>
          <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              name="name"
              placeholder="Username"
            />
            {errors.username ? <FormError message={errors.username[0]} /> : ""}
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value="amirul"
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

export default LoginPage;
