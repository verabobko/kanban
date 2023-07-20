import './App.css';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Kanban from "./components/Kanban";
import {fetchStatuses} from "./api/StatusesServeses";
import {deleteTask, fetchTasks, postTask, updateTask} from "./api/TasksServeses";
import useFetching from "./hooks/useFetching";
import MyModal from "./components/ui/Modal/MyModal";
import CreateModal from "./components/CreateModal";
import axios from "axios";
import DeleteModal from "./components/ui/DeleteModal/DeleteModal";
import {CreateDeleteModal} from "./components/ui/DeleteModal/CreateDeleteModal";
import createModal from "./components/CreateModal";

function App() {
    const openModalInitialState = {
        isOpen: false,
        mode: null,
        data: null
    }

    const [tasks, setTasks] = useState([])
    const [statuses, setStatuses] = useState([])
    console.log(statuses)
    const [openModal, setOpenModal] = useState(openModalInitialState)


    const [getStatuses, isStatusesLoader, statusesError] = useFetching(async () => {
        const res = await fetchStatuses()
        setStatuses(res.data)
    })

    const [getTasks, isTasksLoader, tasksError] = useFetching(async () => {
        const res = await fetchTasks()
        setTasks(res.data)
    })


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

    const changePriority = async (id, updatedTask) => {

        try {
            await updateTask(id, updatedTask)
            await getTasks()
        } catch (err) {
            alert("task was not updated")
        }
    }

    const removeTask = async (id) => {
        try {
            await deleteTask(id)
            await getTasks()
        } catch (err) {
            alert("task was not deleted")
        }
    }

    const changeStatus = async (id, status, direction) => {
        const statusesArray = statuses.map(status => status.title)
        const oldStatusIndex = statusesArray.indexOf(status)
        const newStatusIndex = oldStatusIndex + direction
        const updatedTask = {status: statusesArray[newStatusIndex]}
        try {
            await updateTask(id, updatedTask)
            await getTasks()
        } catch (err) {
            alert("status was not updated")
        }
    }


    return (
        <div className="App">
            <h1>Kanban</h1>

            <button type="button" className="btn btn-secondary" onClick={() => setOpenModal(
                {
                    isOpen: true,
                    mode: "create",
                    data: null
                }
            )}
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
                setOpenModal={setOpenModal}
                changePriority={changePriority}
                changeStatus={changeStatus}
            />

            <MyModal
                openModal={openModal}
                setOpenModal={setOpenModal}
            >
                <CreateModal
                    priorities={priorities}
                    statuses={statuses}
                    createTask={createTask}
                    setOpenModal={setOpenModal}
                />
                <DeleteModal
                    openModal={openModal}
                    removeTask={removeTask}
                    setOpenModal={setOpenModal}
                />
            </MyModal>

        </div>


    );
}

// https://expressjs-server.vercel.app/tasks
//     https://expressjs-server.vercel.app/statuses
export default App;
