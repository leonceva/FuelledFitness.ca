import React, { useState } from "react";
import { Nav, NavBrand, NavMenu, NavButton } from "./NavbarElements";

const Navbar = () => {
    const [dropdownHover, setDropdownHover] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <Nav>
                <NavBrand />
                <NavButton
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                />
                <NavMenu
                    dropdownHover={dropdownHover}
                    setDropdownHover={setDropdownHover}
                />
            </Nav>
        </>
    );
};

export default Navbar;
