import React, {useEffect, useState} from "react";


async function getRequestHandler(url = "", token = "") {
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + " " + token,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    });

    return {
        jsonData: await response.json(),
        ok: response.ok,
        serverCodeStatus: response.status
    }
}

const TodoList = ({token}) => {
    const MAIN_URL = 'https://desolate-anchorage-72827-298f3197b035.herokuapp.com'
    const [todoItems, setTodoItems] = useState([]);

    useEffect(() => {
        const getAllTodoItemsForCurrentUserByJWT = async ourJwtToken => {
            try {
                const response = await getRequestHandler(`${MAIN_URL}/todos`, ourJwtToken);
                if (response.serverCodeStatus === 200) {
                    setTodoItems(response.jsonData.todos)
                }
            } catch (error) {
                console.log(error)
                console.log(error.message)
            }
        }

        if (token) {
            (async () => {
                await getAllTodoItemsForCurrentUserByJWT(token);
            })();
        }
    }, [token])

    if (!token) return null;

    return <div>
        <h2>My todos</h2>

        <ul>
            {todoItems.length > 0
                ? todoItems.map(t =>
                    <li key={t.id}>
                        {t.title}
                    </li>)
                : <>You have not any todo items yet.</>
            }
        </ul>

        <hr/>
    </div>
}

export default TodoList;