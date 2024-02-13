import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { useLocation, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavList() {
    const location = useLocation();
    const navItems = [
        { path: '/', text: 'Formulario' },
        { path: '/api/documentos', text: 'Documentos' },
        { path: '/configuraciones', text: 'Configuraciones' },
    ];

    return (
        <nav className="my-3 flex flex-row gap-2 smartphone:flex-col">
            {navItems.map((item) => (
                <>
                    <ul>
                        <Typography
                            as="li"
                            variant="paragraph"
                            color="white"
                            className="p-1 font-medium"
                        >
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`p-2 mx-2 ${location.pathname === item.path ? 'text-black uppercase' : ''}`}
                                activeClassName="text-white"
                            >
                            {item.text}
                            </NavLink>
                        </Typography>
                    </ul>
                </>

            ))}
        </nav>
    );
}

function NavbarSimple() {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar className="bg-blue-700 max-w-full p-4">
            <div className="flex items-center justify-between ">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5"
                >
                    Nombre empresa
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
            </Collapse>
        </Navbar>
    );
}

export default NavbarSimple;
