import React from 'react';
import { WButton }                from 'wt-frontend';
import { Link } from 'react-router-dom';

const Logo = (props) => {
    return (
        <Link to="/spreadsheet">
            <WButton className="navbar-options" onClick={() => {console.log("yes")}} wType="texted" hoverAnimation="text-primary">
                The World Data Mapper
            </WButton>
        </Link>
    );
};

export default Logo;