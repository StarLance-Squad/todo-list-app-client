import React, {useState} from "react";
import postRequestHandler from "../../utils/postRequestHandler"

const Login = ({setToken}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const formSubmitHandler = (event) => {
        event.preventDefault(); // turn off default functionality for `form` tag

        const apiUrl = 'https://desolate-anchorage-72827-298f3197b035.herokuapp.com/authentication/login'

        // simple validation
        if (password === "" || username === "") {
            // alert('Username and password can\'t be empty!')
            alert('Required fields can\'t be empty!')
            return
        }

        // Send request to the API
        postRequestHandler(apiUrl, {username, password})
            .then((res) => {

                // successfully login
                if (res.serverCodeStatus === 200) {
                    alert(`Successfully login to system!`)
                    alert(`Your JWT token: ${res.jsonData.token}`)
                    setToken(res.jsonData.token)
                    // todo: save the token in the LS
                    return
                }

                // Invalid credentials
                if (res.serverCodeStatus === 401) {
                    // alert(`Server return status 401. ${res.jsonData.message}`)
                    alert('Invalid username or password. Please try again')
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

    const onChangePasswordHandler = event => {
        setPassword(event.target.value)
    }

    return <div>
        <h1>
            Login to "todo-list-service"
        </h1>

        <form onSubmit={formSubmitHandler}>
            <label htmlFor="username">
                Username:
                <input onChange={onChangeUsernameHandler} type="text" name={'username'} id={'username'}
                       placeholder={'Your username here'}/>
            </label>

            <br/>

            <label htmlFor="password">
                Password:
                <input onChange={onChangePasswordHandler} type="password" name={'password'} id={'password'}
                       placeholder={'Password'}/>
            </label>

            <br/>

            <input type="submit"/>
        </form>

        <hr/>

        <p>Username: {username}</p>
        <p>Password: {password}</p>
    </div>
}

export default Login;