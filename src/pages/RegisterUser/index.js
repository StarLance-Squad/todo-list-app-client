import React, {useState} from "react";
import postRequestHandler from "../../utils/postRequestHandler"

const RegisterUser = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    
    const formSubmitHandler = (event) => {
        event.preventDefault(); // turn off default functionality for `form` tag

        const apiUrl = 'https://desolate-anchorage-72827-298f3197b035.herokuapp.com/authentication/register'

        // console.log(event.target['username'].value);
        // console.log(event.target['email'].value);
        // console.log(event.target['password'].value);
        // console.log(event.target['password2'].value);

        // validation
        // todo: - check all fields length > 2 ...
        // todo: - check correct email
        // ...
        if (password === "") return
        if (password !== password2) return

        // Send request to the API
        postRequestHandler(apiUrl, {username, email, password})
            .then((res) => {

                // successfully created
                if (res.serverCodeStatus === 201) {
                    alert(`Successfully created! Now "${res.jsonData.username}" able to login!`)
                    return
                }

                // username already exist
                if (res.serverCodeStatus === 409) {
                    alert(res.jsonData.message)
                }

            })
            .catch(error => {
                console.log(error)
            });

        console.log("Form submitted")
    }

    const onChangeUsernameHandler = event => {
        setUsername(event.target.value)
    }

    const onChangeEmailHandler = event => {
        setEmail(event.target.value)
    }

    const onChangePasswordHandler = event => {
        setPassword(event.target.value)
    }

    const onChangePassword2Handler = event => {
        setPassword2(event.target.value)
    }

    return <div>
        <h1>
            Register User
        </h1>

        <form onSubmit={formSubmitHandler}>
            <label htmlFor="username">
                Username:
                <input onChange={onChangeUsernameHandler} type="text" name={'username'} id={'username'}
                       placeholder={'Your username here'}/>
            </label>

            <br/>

            <label htmlFor="email">
                Email:
                <input onChange={onChangeEmailHandler} type="email" name={'email'} id={'email'}
                       placeholder={'Your email here'}/>
            </label>

            <br/>

            <label htmlFor="password">
                Password:
                <input onChange={onChangePasswordHandler} type="password" name={'password'} id={'password'}
                       placeholder={'Password'}/>
            </label>

            <br/>

            <label htmlFor="password2">
                Repeat password:
                <input onChange={onChangePassword2Handler} type="password" name={'password2'} id={'password2'}
                       placeholder={'Repeat password'}/>
            </label>

            <br/>

            <input type="submit"/>
        </form>

        <hr/>

        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Password: {password}</p>
        <p>Password2: {password2}</p>
    </div>
}

export default RegisterUser;