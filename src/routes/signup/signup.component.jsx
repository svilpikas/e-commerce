import {Link} from "react-router-dom";
import SignupForm from "../../components/signup/signup-form.component";
import {SignUpContainer} from "./signup.styles";

const SingUp = () => {
    return (
        <SignUpContainer>
            <h1>Sign up</h1>
            <SignupForm />
            <Link to={'/sign-in'}>Already have an account?</Link>
        </SignUpContainer>
    )
}
export default SingUp;
