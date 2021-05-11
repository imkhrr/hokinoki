import { useRecoilValue } from 'recoil';
import { authenticated } from '../../store/User';

function Restricted(props) {

    const auth = useRecoilValue(authenticated);

    if (auth.user.role == props.forRole || auth.user.role == "") {
        return ''
    }

    return props.children
}

export default Restricted;