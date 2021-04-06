import React                    from 'react';
import { WButton, WRow, WCol }  from 'wt-frontend';

const SidebarHeader = (props) => {

    const buttonStyle = props.disabled ? 'sidebar-buttons-disabled' : 'sidebar-buttons';
    const clickDisabled = () => { };

    return (
        <WRow className='sidebar-header'>
            <WCol size="7">
                <WButton wType="texted" hoverAnimation="text-primary" className='sidebar-header-name'>
                    Todolists
                </WButton>
            </WCol>

            <WCol size="5">
                {
                    props.auth && <div className="sidebar-options">
                        <WButton className={`${buttonStyle}`} onClick={props.disabled ? clickDisabled : props.createNewList} clickAnimation={props.disabled ? "" :"ripple-light"} color={props.disabled ? "colored" :"primary"} shape="rounded">
                            <i className="material-icons">add</i>
                        </WButton>
                    </div>
                }
            </WCol>

        </WRow>

    );
};

export default SidebarHeader;