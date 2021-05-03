import React  from 'react';
import { WNavItem, WButton }       from 'wt-frontend';

const NavbarEntry = (props) => {
    const handleNavigate = () => {
        let index = props.path.indexOf(props._id)
        let path = props.path.substring(0, index + props._id.length).replace("viewer", "spreadsheet")
        props.history.push(path)
    }

    return (
        <>
        {props.first === props._id ?             
            <></>
            : 
            <WNavItem className="navbar-ancestor">
                <WButton className="navbar-button" wType="texted">
                    <i className="material-icons">arrow_right</i>
                </WButton>
            </WNavItem>
        } 
        <WNavItem className="navbar-ancestor" hoverAnimation="lighten">
            <WButton className="navbar-button" onClick={handleNavigate} wType="texted" hoverAnimation="text-primary">
                {props.name}
            </WButton>
        </WNavItem>
        </>
    );
};

export default NavbarEntry;