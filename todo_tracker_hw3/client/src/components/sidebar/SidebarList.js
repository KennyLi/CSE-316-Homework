import React        from 'react';
import SidebarEntry from './SidebarEntry';

const SidebarList = (props) => {
    let newTodolists = props.todolists;
    if (props.activeid && newTodolists.length) {
            let todo = props.todolists.find(todo => props.activeid === todo.id);
            newTodolists = props.todolists.filter(todo => props.activeid !== todo.id);
            newTodolists.unshift(todo);
    }
    return (
        <>
            {
                newTodolists &&
                newTodolists.map(todo => (
                    <SidebarEntry
                        handleSetActive={props.handleSetActive} activeid={props.activeid}
                        id={todo.id} key={todo.id} name={todo.name} _id={todo._id}
                        updateListField={props.updateListField}
                    />
                ))
            }
        </>
    );
};

export default SidebarList;