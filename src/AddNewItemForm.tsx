import React, {ChangeEvent} from "react";


type StateType = {
    error: boolean
    title: string
}

type OwnPropsType={
    addItem: (title: string)=>void
}

class AddNewItemForm extends React.Component<OwnPropsType, StateType> {

    state: StateType = {
        error: true,
        title: ""
    }
    onAddItemClick = () => {

        let newText = this.state.title;
        this.setState({title: ""})

        if (newText === "") {
            this.setState({error: true})
        } else {
            this.setState({error: false})
            this.props.addItem(newText); //вызвали ту ф-ю в родит. компоненте и подали в нее записаное в переменную newText значение инпута!
        }


    }

    onTitleChanged = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddItemClick()
        }
    };


    render = () => {
        let classNameInput = this.state.error ? "error" : "";
        return (
            <div className="todoList-newTaskForm">
                <input
                    type="text"
                    className={classNameInput}
                    onChange={this.onTitleChanged}
                    value={this.state.title}
                    onKeyPress={this.onKeyPress}
                    placeholder="New item name"/>

                {/*по клику на кнопку произойдет вызов ф-ии onAddItemClick*/}
                <button onClick={this.onAddItemClick}>Add</button>
            </div>
        );
    }
}

export default AddNewItemForm;

