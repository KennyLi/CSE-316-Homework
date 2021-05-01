import React            from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';

const MainContents = (props) => {
    return (
        <div className='table ' >
            <TableHeader
                addItem={props.addItem} name={props.activeProperties.name}
            />
            <TableContents
                key={props.activeProperties._id}      subregionList={props.subregionList}
                history={props.history}         path={props.path}
            />
            {/* <TableHeader
                disabled={!props.activeList._id}        addItem={props.addItem}
                undo={props.undo} redo={props.redo}     canUndo={props.canUndo} 
                canRedo={props.canRedo}                 setShowDelete={props.setShowDelete}
                setActiveList={props.setActiveList}     sort={props.sort}
            />
            <TableContents
                key={props.activeList._id}      activeList={props.activeList}
                deleteItem={props.deleteItem}   reorderItem={props.reorderItem}
                editItem={props.editItem}
            /> */}
        </div>
    );
};

export default MainContents;