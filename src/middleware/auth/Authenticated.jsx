import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { authenticated } from '../../store/User';

function Authenticated(props) {

    // State and Variable Declarations
    const auth = useRecoilValue(authenticated);
    const history = useHistory();
    console.log(auth.data);
    if (!auth.check) {
        history.push('/login');
    };

    return props.children;
}

export default Authenticated;