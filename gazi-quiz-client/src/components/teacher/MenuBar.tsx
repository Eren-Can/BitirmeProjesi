import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import paths from '../../utils/constants/paths';
import useChangeColor from '../../utils/hooks/useChangeColor';
import { colors } from '../../contexts/CustomThemeContext';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TopicIcon from '@mui/icons-material/Topic';
import QuizIcon from '@mui/icons-material/Quiz';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
    {
        title: 'Menü',
        pages: [
            {
                title: 'Anasayfa',
                to: paths.teacher.base + paths.teacher.dashboard,
                icon: <HomeOutlinedIcon />,
            },
            {
                title: 'Dersler',
                to: paths.teacher.base + paths.teacher.lesson,
                icon: <PlayLessonIcon />,
            },
            {
                title: 'Konular',
                to: paths.teacher.base + paths.teacher.topic,
                icon: <TopicIcon />,
            },
            {
                title: 'Quizler',
                to: paths.teacher.base + paths.teacher.quizList,
                icon: <QuizIcon />,
            },
        ],
    },
];

const MenuBar = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');

    useEffect(() => {
        if (!isNonMobile) {
            collapseSidebar(true);
        }

        // eslint-disable-next-line
    }, [isNonMobile]);

    const theme = useTheme();

    const changeColor = useChangeColor();

    const { collapseSidebar, collapsed } = useProSidebar();

    const [selected, setSelected] = useState('Dashboard');

    const {auth} = useAuth();

    return (
        <Sidebar
            backgroundColor={
                theme.palette.mode === 'dark' ? colors.primary[400] : colors.custom.adminLightBg
            }
        >
            <Menu
                rootStyles={{
                    marginBottom: '2rem',
                }}
                menuItemStyles={{
                    button: ({ level, active }) => {
                        if (level === 0)
                            return {
                                backgroundColor: 'transparent',
                                color: active
                                    ? `${colors.blueAccent[500]} !important`
                                    : changeColor(colors.grey, 100),
                                ':hover': {
                                    color: colors.blueAccent[400],
                                    backgroundColor: 'transparent',
                                },
                            };
                    },
                }}
            >
                {/* LOGO AND MENU ICON */}
                <MenuItem
                    onClick={() => collapseSidebar(!collapsed)}
                    icon={collapsed ? <MenuOutlinedIcon /> : undefined}
                    style={{
                        margin: '10px 0 20px 0',
                        color: changeColor(colors.grey, 100),
                    }}
                >
                    {!collapsed && (
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                            ml='15px'
                        >
                            <Typography variant='h4' color={changeColor(colors.grey, 100)}>
                                GAZİ QUIZ
                            </Typography>
                            <IconButton onClick={() => collapseSidebar(!collapsed)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        </Box>
                    )}
                </MenuItem>

                {!collapsed && (
                    <Box mb='25px'>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <AccountCircleOutlinedIcon sx={{ fontSize: 50 }} color='primary' />
                        </Box>
                        <Box textAlign='center'>
                            <Typography
                                variant='h3'
                                color={changeColor(colors.grey, 100)}
                                fontWeight='bold'
                                sx={{ m: '10px 0 0 0' }}
                            >
                                {auth.fullName}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {menuItems.map((items, index) => (
                    <div key={index}>
                        <Typography
                            variant='h6'
                            color={changeColor(colors.grey, 100)}
                            sx={{ m: '15px 0 5px 20px' }}
                        >
                            {items.title}
                        </Typography>
                        {items.pages.map((page, index) => (
                            <Link to={page.to} key={index}>
                                <MenuItem
                                    active={selected === page.title}
                                    onClick={() => setSelected(page.title)}
                                    icon={page.icon}
                                >
                                    <Typography>{page.title}</Typography>
                                </MenuItem>{' '}
                            </Link>
                        ))}
                    </div>
                ))}
            </Menu>
        </Sidebar>
    );
};

export default MenuBar;
