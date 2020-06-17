import React from "react";
import TodoListTask from "./TodoListTask";
import {TaskType} from "./types/entities";


type OwnPropsType={
    deleteTask: (taskId: string) => void
    changeTitle: (task: TaskType, memoryTitle:string) => void
    changeStatus: (task: TaskType, status: number) => void
    changePriority: (task: TaskType, value:string) => void
    tasks: Array<TaskType>
}


class TodoListTasks extends React.Component <OwnPropsType>{

    render = () => {

        let taskElements = this.props.tasks.map(task => {
            return <TodoListTask
                key={task.id}
                deleteTask={this.props.deleteTask}
                changeTitle={this.props.changeTitle}
                changeStatus={this.props.changeStatus}
                changePriority={this.props.changePriority}

                task={task}/>
        })
        return (
            <div className="todoList-tasks">
                {taskElements}
                {/*<TodoListTask title={this.props.tasks[0].title} isDone={this.props.tasks[0].isDone}/>*/}
            </div>
        );
    }
}

export default TodoListTasks;
