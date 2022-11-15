import { Box, Center, Menu, MenuButton, MenuItem, MenuList, Alert } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { CorporateLinks, StudentLinks } from '../data/Links';
import { CgMenuRight } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/User/UserDetail';
import { Tstore } from '../store';
import Typox from './Typox';

function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { type } = useSelector((state: Tstore) => state.users.data);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const logoutHandller = () => {
    localStorage.removeItem('_type');
    localStorage.removeItem('_token');
    dispatch(setUserData({ data: {} }));
    navigate('/login');
  };

  useEffect(() => {
    window.addEventListener('offline', (e) => {
      setIsOffline(true);
    });

    window.addEventListener('online', (e) => {
      setIsOffline(false);
    });

    return () => {
      window.removeEventListener('offline', (e) => {});
      window.removeEventListener('online', (e) => {});
    };
  }, []);
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        marginTop: 0,
        borderBottom: '1px',
        borderBottomColor: '#bcaccf',
        '@media screen and (min-width: 620px)': {
          '.icon': {
            display: 'none',
          },
        },
        '@media screen and (max-width: 620px)': {
          '.word': {
            display: 'none',
          },
          '.icon': {
            display: 'block',
          },
          position: 'fixed',
          bottom: 0,
          zIndex: 999,
          backgroundColor: '#fff',
        },
      }}
    >
      {isOffline && (
        <Alert status="error">
          <Typox content="h4">You're Offline</Typox>
        </Alert>
      )}

      <Center>
        {type === 'corporate'
          ? CorporateLinks.map((links, index) => {
              return (
                <Box
                  id={links.id}
                  key={nanoid()}
                  as="button"
                  sx={{
                    padding: '12px',
                    borderBottom: pathname === links.href ? '4px' : '0px',
                    borderBottomRadius: '4px',
                    borderBottomColor: '#79589f',
                    margin: '10px',
                  }}
                  _hover={{
                    backgroundColor: 'gray.100',
                  }}
                  onClick={() => navigate(links.href)}
                >
                  <h2 className="word">{links.title}</h2>
                  <div className="icon">
                    <Center
                      sx={{
                        flexDirection: 'column',
                      }}
                    >
                      <links.icon />
                      <p style={{ fontSize: '8px' }}>{links.title}</p>
                    </Center>
                  </div>
                </Box>
              );
            })
          : StudentLinks.map((links, index) => {
              return (
                <Box
                  id={links.id}
                  key={nanoid()}
                  as="button"
                  sx={{
                    padding: '12px',
                    borderBottom: pathname === links.href ? '4px' : '0px',
                    borderBottomRadius: '4px',
                    borderBottomColor: '#79589f',
                    margin: '10px',
                  }}
                  _hover={{
                    backgroundColor: 'gray.100',
                  }}
                  onClick={() => navigate(links.href)}
                >
                  <h2 className="word">{links.title}</h2>
                  <div className="icon">
                    <Center
                      sx={{
                        flexDirection: 'column',
                      }}
                    >
                      <links.icon />
                      <p style={{ fontSize: '8px' }}>{links.title}</p>
                    </Center>
                  </div>
                </Box>
              );
            })}
        <Box
          sx={{
            position: 'absolute',
            right: '20px',
            '@media screen and (max-width: 620px)': {
              position: 'inherit',
            },
          }}
        >
          <Menu direction="rtl">
            <MenuButton>
              <CgMenuRight size={'24px'} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logoutHandller}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Center>
    </Box>
  );
}

export default NavBar;
