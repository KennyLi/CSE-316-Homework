import React from 'react';
import { WButton }                from 'wt-frontend';

const Logo = (props) => {

    const handleNavigate = () => {
        props.history.push("/home")
    }

    return (
            <WButton className="navbar-options" onClick={handleNavigate} wType="texted" hoverAnimation="text-primary">
                The World Data Mapper
            </WButton>
    );
};

export default Logo;