import React from 'react';
import Loader from "../utils/Loader";
import StatusColumns from "./StatusColumns";

const Kanban = ({statuses, tasks, isStatusesLoader,isTasksLoader, statusesError, tasksError}) => {
    if (isStatusesLoader || isTasksLoader)return <Loader/>
    if(statusesError) return <h2>{statusesError}</h2>
    if(tasksError) return <h2>{tasksError}</h2>

    return (
        <div>
            

            <div className="container">
                <div className="row align-items-start">
                    {statuses.map((status) =>
                        <StatusColumns
                            key={status._id}
                            status={status}
                            tasks={tasks}
                        />
                    )}
                </div>
            </div>

        </div>
    );
};

export default Kanban;