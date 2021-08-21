import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { FaCaretDown } from 'react-icons/fa';

const MenuDropdown = (props) => {
    const { menuId, list, onMenuClick } = props;

    const handleMenuClick = (event) => {
        const optionId = event.value;
        onMenuClick(menuId, optionId);
    };
    
    return (
        <div className="menu-container">
            <Menu
                menuButton={
                    <MenuButton className="menu-icon">
                        <FaCaretDown />
                    </MenuButton>
                }
                transition
            >
                {list.map((listItem) => {
                    return (
                        <MenuItem
                            value={listItem.id}
                            key={listItem.id}
                            onClick={handleMenuClick}
                        >
                            {listItem.label}
                        </MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
};

MenuDropdown.propTypes = {
    menuId: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        })
    ),
    onMenuClick: PropTypes.func.isRequired,
};

export default MenuDropdown;
