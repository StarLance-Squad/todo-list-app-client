import React, {useState} from "react";


async function postRequestHandler2(url = "", data = {}, token = "") {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + " " + token,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });

    return {
        jsonData: await response.json(),
        ok: response.ok,
        serverCodeStatus: response.status
    }
}


const CreateNewTodoItem = ({token}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    if (!token) return null;

    const onChangeTitleHandler = event => {
        setTitle(event.target.value)
    }

    const onChangeDescriptionHandler = event => {
        setDescription(event.target.value)
    }

    const formSubmitHandler = (event) => {
        event.preventDefault(); // turn off default functionality for `form` tag

        const apiUrl = 'https://desolate-anchorage-72827-298f3197b035.herokuapp.com/todos'

        // simple validation
        if (title === "" || description === "") {
            // alert('Username and password can\'t be empty!')
            alert('Required fields can\'t be empty!')
            return
        }

        const data = {
            "Title": title,
            "Description": description,
            "Completed": false // remove it when backend be fixed
        }

        // Send request to the API
        postRequestHandler2(apiUrl, data, token)
            .then((res) => {

                // console.log(res)

                // successfully created
                if (res.serverCodeStatus === 201) {
                    alert(`Todo item with the title "${res.jsonData.title}" was created!`)
                    alert(`Todo item uuid is: "${res.jsonData.id}"`)
                    setTitle('')
                    setDescription('')
                    return
                }

                // Invalid credentials
                if (res.serverCodeStatus === 401) {
                    alert(`Server return status 401. ${res.jsonData.message}`)
                }

            })
            .catch(error => {
                console.log(error)
            });

        console.log("Form submitted")
    }


    return <div>
        <h2>Create new todo item</h2>

        <form onSubmit={formSubmitHandler}>
            <label htmlFor="title">
                Title:
                <input onChange={onChangeTitleHandler} value={title} type="text" name={'title'} id={'title'}
                       placeholder={'Your title here'}/>
            </label>

            <br/>

            <label htmlFor="description">
                Description:
                {/* todo: switch to textarea */}
                <input
                    onChange={onChangeDescriptionHandler} value={description} type="text" name={'description'}
                    id={'description'}
                    placeholder={'description'}/>
            </label>

            <br/>

            <input type="submit"/>
        </form>

        <hr/>
    </div>
}

export default CreateNewTodoItem;