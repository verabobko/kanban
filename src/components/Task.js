import React from 'react';
import UpdateModal from "./UpdateModal";

const Task = ({
                  task,
                  status,
                  setOpenModal,
                  changePriority,
                  changeStatus,
                  statuses
              }) => {

    return (
        <div className="card">
            <div>
                <h6 className="card-header">{task.priority}</h6>
                <button type="button" className="btn btn-outline-primary btn-sm"
                        onClick={() => changePriority(task._id, {priority: +task.priority + 1})}
                >
                    ↑
                </button>

                <button type="button" className="btn btn-outline-primary btn-sm"
                        onClick={() => changePriority(task._id, {priority: +task.priority - 1})}
                >
                    ↓
                </button>
            </div>
            <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                <p className="card-text">{task.description}</p>
                <div style={{margin: "4px"}}>
                <button type="button" className="btn btn-outline-primary btn-sm"
                        onClick={() => changeStatus(task._id, task.status, -1)}
                        disabled={statuses[0].title === task.status}
                >←</button>

                <button type="button" className="btn btn-outline-primary btn-sm"
                        onClick={() => changeStatus(task._id, task.status, 1)}
                        disabled={statuses[statuses.length-1].title === task.status}
                >→</button>

                </div>
                <UpdateModal />
                <button className="btn btn-uotline-danger"
                        onClick={() => setOpenModal({isOpen:true,
                    mode: "delete",
                    data: task})}
                >Delete</button>

            </div>
        </div>


    );
};

export default Task;