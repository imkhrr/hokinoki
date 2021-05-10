import React, { useState } from "react";
import axios from "axios";
import { Nav, Icon, Dropdown } from "rsuite";
import { NavLink, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authenticated } from "../store/User";

import SideBar from "./SideBar";
// import SideBar2 from "./SideBar2";

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
            <div className="flex jc-sb ai-c px-2 pt-2">
                <div className="t2 is-black" style={{ paddingLeft: 5 }}>
                    <Nav>
                        {props.title}
                    </Nav>
                </div>
                <Nav className="is-mobile" pullRight>
                    <Nav.Item icon={<Icon icon={nav ? "bars" : "close"} size="lg" />} onSelect={toggleNavbar} />
                </Nav>
                <Nav className="is-desktop">
                    <Nav.Item className="pr-1">
                        <div className="flex ai-c">
                            <Icon icon="user-circle-o" size="lg" />
                            <span className="pl-1">{auth.user.name}</span>
                        </div>
                    </Nav.Item>
                    <Nav.Item className="pr-1">
                        <Icon icon="bell-o" size="lg" />
                    </Nav.Item>
                    <Dropdown icon={<Icon icon="gear" size="lg" />} placement="bottomEnd" noCaret >
                        <NavLink to="/settings">
                            <Dropdown.Item componentClass="div" icon={<Icon icon="setting" />} style={{ width: 147 }} > <span className="pl-1">Pengaturan</span> </Dropdown.Item>
                        </NavLink>
                        <NavLink to="" onClick={Logout}>
                            <Dropdown.Item componentClass="div" icon={<Icon icon="sign-out" />} > <span className="pl-1">Keluar</span> </Dropdown.Item>
                        </NavLink>
                    </Dropdown>
                </Nav>
            </div>
            <div className="is-mobile">
                <div className={nav ? " is-hidden" : ""}>
                    <div className="px-2 pt-2">
                        <SideBar />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default NavigasiBar;
