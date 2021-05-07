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
    Input,
    ErrorMessage,
    Notification,
} from "rsuite";

function LoginPage(props) {
    const setAuth = useSetRecoilState(authenticated);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ status: true, data: [] });

    const data = { username, password };

    const auth = async (e) => {
        setErrors({ status: false, data: '' });
        try {
            let response = await axios.post("login", data);
            localStorage.setItem("userToken", response.data.token);
            setAuth({ check: true, user: response.data.data });
        } catch (e) {
            setErrors({ status: true, data: e.response.data.errors });
            if (e.response.data.errors.message) {
                Notification.error({
                    title: 'Login Gagal',
                    description: e.response.data.errors.message
                })
            }
            console.clear();
        }
    };
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", }} >
            <Panel style={{ width: 350 }} header={<h4>Login</h4>} bordered>
                <Form onSubmit={auth}>
                    <FormGroup>
                        <ControlLabel>Username</ControlLabel>
                        <Input onChange={(value) => setUsername(value)} name="name" placeholder="Username" />
                        <ErrorMessage className="is-red" show={errors.data.username ? true : false} placement="bottomStart"> {errors.data.username} </ErrorMessage>
                        {/* {errors.data.username ? <ErrorMessage show={errors.status} placement="bottomStart"> {errors.data.username[0]} </ErrorMessage> : ""} */}
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <Input onChange={(value) => setPassword(value)} name="password" type="password" placeholder="••••••••" />
                        <ErrorMessage className="is-red" show={errors.data.password ? true : false} placement="bottomStart"> {errors.data.password} </ErrorMessage>

                    </FormGroup>
                    <FormGroup>
                        <Button type='submit' appearance="primary" block> Submit </Button>
                    </FormGroup>
                </Form>
            </Panel>
        </div>
    );
}

export default LoginPage;
