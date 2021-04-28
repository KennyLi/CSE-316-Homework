import React            from 'react';
import SidebarHeader    from './SidebarHeader';
import SidebarList      from './SidebarList';

const SidebarContents = (props) => {
    return (
        <>
            <SidebarList
                handleSetActive={props.handleSetActive}
                listIDs={props.listIDs} createNewList={props.createNewList}
                updateListField={props.updateListField} setShowDelete={props.setShowDelete}
                deleteList={props.deleteList} 
            />
        </>
    );
};

export default SidebarContents;