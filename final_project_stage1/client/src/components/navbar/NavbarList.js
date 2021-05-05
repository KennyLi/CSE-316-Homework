import React  from 'react';
import NavbarEntry from './NavbarEntry';

const NavbarList = (props) => {
    let first = props.ancestors[0]._id
    return (
        <> 
        {
            props.ancestors &&
            props.ancestors.map(entry => (
                <NavbarEntry key={entry._id} history={props.history} _id={entry._id} name={entry.name} first={first}/>
            ))
        }
        </>
    );
};

export default NavbarList;