import { useRecoilValue } from 'recoil';
import { authenticated } from '../store/User';
import LoginPage from '../views/LoginPage';
import NotFound from '../views/NotFound';

function Authenticated(props) {

    // State and Variable Declarations
    const auth = useRecoilValue(authenticated);

    if (!auth.check) {
        return <LoginPage />
    };

    if (props.role || props.permission) {
        return <NotFound />
    }

    return props.render;
}

export default Authenticated;