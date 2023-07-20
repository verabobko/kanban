import React, {useState} from 'react';
import MyButton from "./ui/Button/MyButton";

const CreateModal = ({priorities, statuses, createTask, setOpenModal}) => {
    const initialTask = {
        name: "",
        description: "",
        priority: priorities[0],
        status: statuses[0]?.title
    }
    const [newTask, setNewTask] = useState(initialTask);

    const onCreate = () => {
        createTask(newTask)
        setOpenModal({
            isOpen: false,
            mode: null,
            data: null
        }
        )
        setNewTask(initialTask)
    }

    const onCancel = () => {
        setOpenModal({
            isOpen: false,
            mode: null,
            data: null
        })
        setNewTask(initialTask)
    }


    return (
        <div>
            <h3>Create new task</h3>
            <div className="input-group mb-3">
                <div className="form-floating">
                    <input value={newTask.name} onChange={event => setNewTask({...newTask, name: event.target.value})}
                           type="text" className="form-control" id="floatingInputGroup1" placeholder="Task name"/>
                    <label htmlFor="floatingInputGroup1">Task name</label>
                </div>
            </div>

            <div className="input-group mb-3">
                <div className="form-floating">
                    <input value={newTask.description}
                           onChange={event => setNewTask({...newTask, description: event.target.value})}
                           type="text" className="form-control" id="floatingInputGroup1" placeholder="Description"/>
                    <label htmlFor="floatingInputGroup1">Description</label>
                </div>
            </div>

            <div style={{textAlign: "left", marginLeft: "13px", marginBottom: "10px"}}>Priority:</div>
            <select value={newTask.priority} onChange={event => setNewTask({...newTask, priority: event.target.value})}
                    className="form-select" aria-label="Default select example">
                {priorities.map((element, index) => <option key={index} value={element}>{element}</option>)}
            </select>

            <div className="form-floating mb-3">
                <select value={newTask.status} onChange={event => setNewTask({...newTask, status: event.target.value})}
                        className="form-select" aria-label="Default select example">
                    {statuses.map((element) => <option key={element._id}
                                                       value={element.title}>{element.title}</option>)}
                </select>
                <label htmlFor="floatingInputGroup1">Status</label>
            </div>

<MyButton onClick={onCreate} >Create</MyButton>
<MyButton onClick={onCancel}>Cancel</MyButton>


        </div>
    );
};

export default CreateModal;