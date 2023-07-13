import './App.css';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Kanban from "./components/Kanban";
import {fetchStatuses} from "./api/StatusesServeses";
import {fetchTasks, postTask} from "./api/TasksServeses";
import useFetching from "./hooks/useFetching";
import MyModal from "./components/ui/Modal/MyModal";
import CreateModal from "./components/CreateModal";
import axios from "axios";

function App() {

    const [tasks, setTasks] = useState([])
    const [statuses, setStatuses] = useState([])

    const [getStatuses, isStatusesLoader, statusesError] = useFetching(async () => {
        const res = await fetchStatuses()
        setStatuses(res.data)
    })

    const [getTasks, isTasksLoader, tasksError] = useFetching(async () => {
        const res = await fetchTasks()
        setTasks(res.data)
    })

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        getStatuses()
        getTasks()
    }, [])

    const priorities = [1, 2, 3, 4, 5, 6]

    const createTask = async (newTask) => {
        try {
            await postTask(newTask)
            await getTasks()
        } catch (err) {
            alert("task was not created")
        }
    }

    return (
        <div className="App">
            <h1>Kanban</h1>

            <button type="button" className="btn btn-secondary" onClick={() => setOpenModal(true)}
            >
                Create new task
            </button>

            <Kanban
                isStatusesLoader={isStatusesLoader}
                isTasksLoader={isTasksLoader}
                statusesError={statusesError}
                tasksError={tasksError}
                statuses={statuses}
                tasks={tasks}
            />

            <MyModal
                openModal={openModal}
                setOpenModal={setOpenModal}
            ><CreateModal
                priorities={priorities}
                statuses={statuses}
                createTask={createTask}
                setOpenModal={setOpenModal}
            /></MyModal>
        </div>


    );
}

// https://expressjs-server.vercel.app/tasks
//     https://expressjs-server.vercel.app/statuses
export default App;
