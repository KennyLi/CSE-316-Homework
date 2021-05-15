import React            from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';

const MainContents = (props) => {
    return (
        <div className='table ' >
            <TableHeader
                addItem={props.addItem}                 name={props.activeProperties.name}
                undo={props.undo}                       redo={props.redo}     
                canUndo={props.canUndo}                 canRedo={props.canRedo}
                sort={props.sort}
                subregionList={props.activeProperties.subregions}
            />
            <TableContents
                key={props.activeProperties._id}    subregionList={props.activeProperties.subregions}
                deleteItem={props.deleteItem}       editItem={props.editItem}
                history={props.history}
            />
        </div>
    );
};

export default MainContents;