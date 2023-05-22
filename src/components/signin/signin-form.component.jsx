import {useState} from "react";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {
    signUserInWithEmailAndPassword,
    signWithGooglePopup
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const signInWithGoogle = async () => {
        await signWithGooglePopup();
    }
    const handleChange = ({target}) => {
        const {name, value} = target;

        setFormFields({...formFields, [name]: value})
    }
    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signUserInWithEmailAndPassword(email, password);
            resetForm();
        } catch (e) {
            if (e.code === 'auth/wrong-password') {
                alert('incorrect password');
                return;
            }
            if (e.code === 'auth/user-not-found') {
                alert('user not found');
                return;
            }
            console.log(e);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormInput label={'Email'}
                           type="email"
                           required
                           onChange={handleChange}
                           name='email'
                           value={email}/>
                <FormInput
                    label={'Password'}
                    type="password"
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}/>
                <div>
                    <Button type={"submit"}>Sign in</Button>
                    <Button type={"button"} buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Sign in with google</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
