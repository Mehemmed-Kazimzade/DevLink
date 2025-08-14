import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, {
    type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Outlet } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import GroupsIcon from "@mui/icons-material/Groups";
import DataObjectIcon from "@mui/icons-material/DataObject";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    //   padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create("margin", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

interface HeaderProps {
    mode: string;
    toggleMode: () => void;
}

export default function DrawerComponent({ mode, toggleMode }: HeaderProps) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const icons: React.ReactNode[] = [
        <AccountCircleIcon />,
        <QuestionAnswerIcon />,
        <AddToPhotosIcon />,
        <GroupsIcon />,
        <DataObjectIcon />,
    ];

    const links: string[] = [
        "/profile/me/",
        "/QA/questions/",
        "/QA/questionPost/",
        "/QA/questions/detailPage/",
        "/snippets/",
    ];

    const authLinks: string[] = [
        "/login/",
        "register/",
        "/logout/",
    ];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                open={open}
                sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    minHeight: "0 !important",
                }}
            >
                <Toolbar
                    sx={{ minHeight: 0, padding: 0, position: "absolute" }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            position: "absolute",
                            left: 16,
                            top: 2,
                            zIndex: theme.zIndex.drawer + 1,
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon
                            sx={{
                                color: mode === "light" ? "black" : "white",
                                fontSize: 30,
                            }}
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>

                <Divider />
                <List>
                    {["Profile", "Q&A Commmunity", "Create Post", "Groups"].map(
                        (text, index) => (
                            <ListItem key={text} disablePadding>
                                <Link
                                    style={{ width: "100%" }}
                                    to={links[index]}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {icons[index]}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        )
                    )}
                    <ListItem disablePadding>
                        <ListItemButton onClick={toggleMode}>
                            <ListItemIcon>
                                {mode === "light" ? (
                                    <DarkModeIcon />
                                ) : (
                                    <LightModeIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={"Change theme"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {["Login", "Register", "Logout"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <Link style={{ width: "100%" }} to={authLinks[index]}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? (
                                            <InboxIcon />
                                        ) : (
                                            <MailIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open} sx={{ mt: 5 }}>
                <Outlet />
            </Main>
        </Box>
    );
}
