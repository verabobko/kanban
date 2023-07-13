import React from 'react';

const Task = ({task, status}) => {
    return (

            <div className="card">
                <h6 className="card-header">{task.status}</h6>
                <div className="card-body">
                    <h5 className="card-title">{task.name}</h5>
                    <p className="card-text">{task.description}</p>
                    <a href="#" className="btn btn-primary">Update</a>
                </div>
            </div>


    );
};

export default Task;