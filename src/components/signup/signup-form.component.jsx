import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignupForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const handleChange = ({target}) => {
        const {name, value} = target;

        setFormFields({...formFields, [name]: value});
    }
    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password && password !== confirmPassword) {
            alert('passwords does not match');
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserFromAuth(user, {displayName});
            resetForm();
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                alert('email already in use');
                return;
            }
            console.error('user create', e);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormInput label={'Display name'}
                           type="text"
                           required
                           onChange={handleChange}
                           name='displayName'
                           value={displayName}/>

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

                <FormInput
                    label={'Confirm password'}
                    type="password"
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}/>
                <Button type={"submit"}>Sign up</Button>
            </form>
        </div>
    )
}

export default SignupForm;
