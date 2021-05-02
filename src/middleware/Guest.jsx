import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authenticated } from "../store/User";

function Guest(props) {
  // State and Variable Declarations
  const auth = useRecoilValue(authenticated);
  const history = useHistory();

  if (auth.check) {
    history.push('/');
  }

  return props.render;
}

export default Guest;
