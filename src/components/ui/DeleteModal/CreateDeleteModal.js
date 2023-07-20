import React, {useState} from 'react';


const CreateDeleteModal = ({tasks, setOpenDeleteModal, setTasks}) => {

    const [input, setInput] = useState('')

    const onCancel = () => {
        setOpenDeleteModal(false)
    }

    // const findTask = (id) => {
    //    const a = tasks.find(task => task.id === id)
    //     return a.name
    // }

    const inputChange = (event) => {
        setInput(event.preventDefault())
    }
    const handleDelete = () => {
        // if (input !== findTask()) return
        // setTasks(tasks.filter(task => task.id === id))
    }

    return (
        <div>
            <h3>Delete this task?</h3>

            <div>
                Task name:
            </div>

            <div>
                To confirm, type in the box below
            </div>

            <input onChange={inputChange}/>

            <div>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={onCancel}>Cancel</button>

            </div>

        </div>
    );
};

export default CreateDeleteModal;