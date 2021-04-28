import React        from 'react';
import SidebarEntry from './SidebarEntry';

const SidebarList = (props) => {
    let tempID = 0
    return (
        props.listIDs &&
        props.listIDs.map(entry => (
            <SidebarEntry
                id={tempID++} name={entry.name} _id={entry._id}
                updateListField={props.updateListField}
                setShowDelete={props.setShowDelete}
            />)
        )
    );
};

export default SidebarList;