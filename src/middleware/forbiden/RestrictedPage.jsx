import React from 'react';
import { useRecoilValue } from 'recoil';
import { authenticated } from '../../store/User';
import NotFound from '../../views/NotFound';

function RestrictedPage(props) {

    const auth = useRecoilValue(authenticated);

    if (auth.user.role == props.forRole) {
        return <NotFound />;
    }

    return props.children;
}

export default RestrictedPage;