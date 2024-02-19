import React, {useState} from 'react';
// import RegisterUser from "./pages/RegisterUser";
import Login from "./pages/Login";
import TodoList from "./pages/TodoList"
import CreateNewTodoItem from "./pages/CreateNewTodoItem"


function App() {
    const [token, setToken] = useState(null)

    return <div>
        {/*<RegisterUser/>*/}

        <Login setToken={setToken}/>

        <hr/>

        {token
            ? <p style={{fontSize: 9}}>JWT token: {token}
                <hr/>
            </p>
            : null
        }

        <TodoList token={token}/>
        <CreateNewTodoItem token={token}/>
    </div>
}

export default App;
