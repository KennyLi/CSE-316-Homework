import React, { useState } from 'react';
import TableEntry   from './TableEntry';

const TableContents = (props) => {
    const [coordinates, setCoordinates] = useState({});
    const importFlags = (context) => {
		let flags = {};
		context.keys().map((flag) => { flags[flag.replace('./', '')] = context(flag); });
		return flags;
	}
	const flags = importFlags(require.context('../../imgs/flags', false, /\.png$/));
    let entries = props.subregionList
    entries = entries.map(entry => ({...entry, flag: flags[entry.name.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) + " Flag.png"]}))

    return (
        entries !== undefined && entries.length > 0 ? <div className=' table-entries'>
            {
                entries.map((entry, index) => (
                    <TableEntry
                        data={entry} key={entry._id} index={index} entryCount={entries.length}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem} history={props.history} setCoordinates={setCoordinates}
                        coordinates={coordinates}
                    />
                ))
            }

            </div>
            : <div className=' table-entries'>
                {
                    <h2 className="nothing-msg">No Subregions</h2> 
                }               
                
            </div>
    );
};

export default TableContents;