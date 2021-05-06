import React, { useState } from 'react';
import TableEntry   from './TableEntry';

const TableContents = (props) => {
    const [row, setRow] = useState(null);
    const [col, setCol] = useState(null);

    let entries = props.subregionList
    let entryCount = 0;
    if(entries) {
        entries = entries.filter(entry => entry !== null);
        entryCount = entries.length
    } 
    
    const setCoordinates = (row, col) => {
        setRow(row);
        setCol(col);
    }

    return (
        entries !== undefined && entries.length > 0 ? <div className=' table-entries'>
            {
                entries.map((entry, index) => (
                    <TableEntry
                        data={entry} key={entry._id} index={index} entryCount={entryCount}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem} history={props.history} setCoordinates={setCoordinates}
                        row={row} col={col}
                    />
                ))
            }

            </div>
            : <div className=' table-entries'>
                {
                    <h2 className="nothing-msg">No Subregions!</h2> 
                }               
                
            </div>
    );
};

export default TableContents;