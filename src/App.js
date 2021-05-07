import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import Router from "./router";
import { authenticated } from "./store/User";
import { Loader } from "rsuite";

function App(props) {
    const setAuth = useSetRecoilState(authenticated);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(false);
        const getUser = async () => {
            try {
                let { data } = await axios.get("me");
                setAuth({ check: true, user: data.data });
                setMounted(true);
            } catch (error) {
                setMounted(true);
                console.clear();
            }
        };
        getUser();
    }, [setAuth]);

    if (mounted) {
        return (
            <div>
                <Router />
            </div>
        );
    }

    return <Loader backdrop size="lg" content="Loading..." vertical />;
}

export default App;
