import React        from 'react';
import SidebarEntry from './SidebarEntry';

const SidebarList = (props) => {
    let tempID = 0
    return (
        props.listIDs &&
        props.listIDs.map(entry => (
            <SidebarEntry
                key={entry._id+props.activeid}
                id={tempID++} name={entry.name} _id={entry._id}
                updateListField={props.updateListField}
                setShowDelete={props.setShowDelete}
                history={props.history}
            />)
        )
    );
};

export default SidebarList;