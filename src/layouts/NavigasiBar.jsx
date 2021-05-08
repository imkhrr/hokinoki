import React, { useState } from "react";
import axios from "axios";
import { Navbar, Nav, Icon, Dropdown } from "rsuite";
import { NavLink, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authenticated } from "../store/User";

import SideBar from "./SideBar";

function NavigasiBar(props) {
    const [auth, setAuth] = useRecoilState(authenticated);
    const history = useHistory();

    const [nav, setNav] = useState(true);
    const toggleNavbar = () => {
        setNav(!nav);
    };

    const Logout = async (e) => {
        e.preventDefault();

        try {
            await axios.post("logout");
            setAuth({ check: false, user: [] });
            localStorage.removeItem("userToken");
            history.push("/login");
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div>
            <Navbar appearance="inverse">
                <Nav>
                    <Nav.Item>
                        <span className="t3">Hoki Noki</span>
                    </Nav.Item>
                </Nav>
                <Nav pullRight>
                    <div className="is-mobile">
                        <Nav.Item icon={<Icon icon="bars" size="lg" />} onSelect={toggleNavbar} />
                    </div>
                    <div className="is-desktop">
                        <Dropdown trigger={"hover"} icon={<Icon icon="user-circle-o" />} title={auth.user.name} placement="bottomEnd" >
                            <NavLink to="/settings">
                                <Dropdown.Item componentClass="div" icon={<Icon icon="setting" />} style={{ width: 147 }} > Settings </Dropdown.Item>
                            </NavLink>
                            <NavLink to="" onClick={Logout}>
                                <Dropdown.Item componentClass="div" icon={<Icon icon="sign-out" />}> Logout </Dropdown.Item>
                            </NavLink>
                        </Dropdown>
                    </div>
                </Nav>
            </Navbar>
            <div className="is-mobile">
                <div className={nav ? "px-2 py-2 is-hidden" : "px-2 py-2"}>
                    <SideBar />
                </div>
            </div>
        </div>
    );
}

export default NavigasiBar;
