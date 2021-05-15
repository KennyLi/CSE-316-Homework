import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem, WRow, WCol, WSidebar }                from 'wt-frontend';
import NavbarList from './NavbarList';

const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            // if (reset) props.setActiveList({});
        }
        props.history.push("/home")
    };

    return (
        <>
            <WCol className="navbar-col" size="1">
                <WNavItem className="navbar-item" hoverAnimation="lighten">
                    <WButton className="navbar-button" onClick={props.setShowUpdate} wType="texted" hoverAnimation="text-primary">
                        {props.user.firstName + " " + props.user.lastName}
                    </WButton>
                </WNavItem>
            </WCol>
            <WCol className="navbar-col" size="1">
                <WNavItem className="navbar-item" hoverAnimation="lighten">
                    <WButton className="navbar-button" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                        Logout
                    </WButton>
                </WNavItem>
            </WCol>
        </>        
    );
};

const LoggedOut = (props) => {
    return (
        <>
            <WCol className="navbar-col" size="1">
                <WNavItem className="navbar-item"hoverAnimation="lighten">
                    <WButton className="navbar-button" onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary"> 
                        Sign Up 
                    </WButton>
                </WNavItem>
            </WCol>
            <WCol className="navbar-col" size="1">
                <WNavItem className="navbar-item"hoverAnimation="lighten">
                    <WButton className="navbar-button" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
                        Login
                    </WButton>
                </WNavItem>
            </WCol>

        </>
    );
};


const Navbar = (props) => {
    const clickDisabled = () => { };

    const handleNavigate = () => {
        props.history.push("/home")
    }

    const handlePrev = () => {
        props.history.push("/viewer/" + props.prev)
    }

    const handleNext = () => {
        props.history.push("/viewer/" + props.next)
    }

    const prevOptions = {
        className: !props.prev ? 'navbar-sibling-disabled' : 'navbar-sibling',
        onClick: !props.prev  ? clickDisabled : handlePrev,
        wType: "texted", 
        clickAnimation: !props.prev ? "" : "ripple-light",  
        shape: "rounded"
    }

    const nextOptions = {
        className: !props.next ? 'navbar-sibling-disabled' : 'navbar-sibling',
        onClick: !props.next   ? clickDisabled : handleNext, 
        wType: "texted", 
        clickAnimation: !props.next ? "" : "ripple-light" ,
        shape: "rounded"
    }

    return (
        <WRow className="navbar">
            <WCol className="navbar-col" size="2">
                <WNavItem className="navbar-item" hoverAnimation="lighten">
                    <WButton className="navbar-button" onClick={handleNavigate} wType="texted" hoverAnimation="text-primary">
                        The World Data Mapper
                    </WButton>
                </WNavItem>
            </WCol>
            { props.prev !== undefined && props.next !== undefined ? 
                <>
                    <WCol className="navbar-col" size="1">
                        <WNavItem className="navbar-ancestor" hoverAnimation={!props.prev ? "" : "lighten"}>
                            <WButton {...prevOptions}>
                                <i className="material-icons">arrow_back</i>
                            </WButton>
                        </WNavItem>
                    </WCol>
                    <WCol className="navbar-col" size="1">
                        <WNavItem className="navbar-ancestor" hoverAnimation={!props.next ? "" : "lighten"}>
                        <WButton {...nextOptions}>
                                <i className="material-icons">arrow_forward</i>
                            </WButton>
                        </WNavItem>
                    </WCol>
                    <WCol size="6">
                        { props.ancestors && props.ancestors.length > 0 ? 
                            <WSidebar className="navbar-list">    
                                <NavbarList history={props.history} ancestors={props.ancestors}/> 
                            </WSidebar> 
                        :
                            <></> }
                    </WCol>
                </> :
                <WCol size="8">
                    { props.ancestors && props.ancestors.length > 0 ? 
                        <WSidebar className="navbar-list">    
                            <NavbarList history={props.history} ancestors={props.ancestors}/> 
                        </WSidebar> 
                    :
                        <></> }
                </WCol>
            }
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate}/>
                : <LoggedIn fetchUser={props.fetchUser} setActiveList={props.setActiveList} logout={props.logout} user={props.user} history={props.history} setShowUpdate={props.setShowUpdate}/>
            }
        </WRow>
    );
};

export default Navbar;