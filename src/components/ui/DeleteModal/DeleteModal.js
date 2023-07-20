import React, {useState} from 'react';
import classes from './DeleteModal.module.css'

const DeleteModal = ({ openModal, setOpenModal, removeTask}) => {


    const [input, setInput] = useState('')

    const closeModal = () => {
        setOpenModal({isOpen:false,
            mode: null,
            data: null})
        setInput('')
    }
const onDelete = () => {
    removeTask(openModal.data._id);
    closeModal()
}

    return (
        <div>
            <h3>Delete this task?</h3>

            <div>
                Task name:{openModal.data?.name}
            </div>

            <div>
                To confirm, type {openModal.data?.name}  in the box below
            </div>

            <input type="text"
                   value={input}
                onChange={ (event) => setInput(event.target.value)}/>

            <div>
                <button
                    disabled={input !== openModal.data?.name}
                className="btn btn-outline-danger"
                onClick={onDelete}>Delete</button>

                <button className="btn btn-outline-primary"
                onClick={closeModal}>Cancel</button>

            </div>
        </div>


    )
        ;
};


export default DeleteModal;