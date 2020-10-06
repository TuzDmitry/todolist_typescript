import React from 'react';
import {Button, IconButton} from '@material-ui/core';
import {VisibilityOutlined,  VisibilityOffOutlined} from '@material-ui/icons';

type OwnPropsType = {
    changeFilter: (filter: string) => void
    filterValue: string
}

class TodoListFooter extends React.Component <OwnPropsType> {
    state = {
        isHidden: false
    }

    onAllFilterClick = () => {
        this.props.changeFilter('All')
    }
    onCompletedFilterClick = () => {
        this.props.changeFilter('Completed')
    }
    onActiveFilterClick = () => {
        this.props.changeFilter('Active')
    }
    onShowFiltersClick = () => {
        this.setState({isHidden: false})
    }
    onHideFiltersClick = () => {
        this.setState({isHidden: true})
    }

    render = () => {

        let classForAll = this.props.filterValue === 'All' ? 'filter-active' : '';
        let classForCompleted = this.props.filterValue === 'Completed' ? 'filter-active' : '';
        let classForActive = this.props.filterValue === 'Active' ? 'filter-active' : '';

        return (
            <div className="">
                <div className="todoList-footer">
                    {/*{!this.state.isHidden && <span onClick={this.onHideFiltersClick}>hide</span>}*/}
                    {/*{this.state.isHidden && <span onClick={this.onShowFiltersClick}>show</span>}*/}

                    {!this.state.isHidden && <IconButton color="secondary" onClick={this.onHideFiltersClick}>
                        <VisibilityOutlined />
                    </IconButton>}
                    {this.state.isHidden && <IconButton color="secondary" onClick={this.onShowFiltersClick}>
                        <VisibilityOffOutlined />
                    </IconButton>}

                    {!this.state.isHidden && <div>
                        {/*<button onClick={this.onAllFilterClick} className={classForAll}>All</button>*/}
                        {/*<button onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</button>*/}
                        {/*<button onClick={this.onActiveFilterClick} className={classForActive}>Active</button>*/}

                        <Button onClick={this.onAllFilterClick}
                                variant={this.props.filterValue === 'All' ? 'contained':'outlined'}
                                color={this.props.filterValue === 'All' ? 'secondary': 'default'} size={'small'}>All</Button>
                        <Button onClick={this.onCompletedFilterClick}
                                variant={this.props.filterValue === 'Completed' ? 'contained':'outlined'}
                                color={this.props.filterValue === 'Completed' ? 'secondary': 'default'} size={'small'}>Completed</Button>
                        <Button onClick={this.onActiveFilterClick}
                                variant={this.props.filterValue === 'Active' ? 'contained':'outlined'}
                                color={this.props.filterValue === 'Active' ? 'secondary': 'default'} size={'small'}>Active</Button>
                    </div>}
                </div>
            </div>
        );
    }
}

export default TodoListFooter;
