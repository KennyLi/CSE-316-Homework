import React from 'react';
import { WButton }                from 'wt-frontend';

const Logo = (props) => {
    return (
        <WButton className="navbar-options" onClick={() => {console.log("yes")}} wType="texted" hoverAnimation="text-primary">
            The World Data Mapper
        </WButton>
    );
};

export default Logo;