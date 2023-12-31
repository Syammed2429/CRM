import { FC } from 'react';
import {
    AiOutlineEye, AiOutlineUserAdd
} from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
    Image
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';


const Navbar: FC = () => {

    return (
        <>
            <Box>
                <Flex boxShadow='dark-lg' p='7' alignItems='center' w='100%'>
                    {/* Logo */}
                    <Link to='/'>
                        <Image w={120} src={logo} alt='Client logo' />
                    </Link>

                    {/* Navbar Items start */}
                    <HStack
                        display={{ base: 'none', md: 'flex' }}
                        position='absolute'
                        right='4'
                        spacing='24px'
                        fontSize='18'
                    >
                        <Link to='/'>
                            <Text>Add Client</Text>
                        </Link>

                        <Link to='/get-all-clients'>
                            <Text>View all Client's</Text>
                        </Link>

                    </HStack>
                    {/* Navbar Items End */}

                    {/* Responsive Navbar items Start*/}

                    <Spacer />
                    <Box display={{ base: 'flex', md: 'none' }} fontSize='18' gap={4}>

                        <Menu>
                            <MenuButton
                                as={IconButton}
                                // aria-label='Options'
                                icon={<GiHamburgerMenu />}
                                variant='outline'
                            />
                            <MenuList z-index='1'>
                                <Link to='/'>
                                    <MenuItem icon={<AiOutlineUserAdd />}>Add Client</MenuItem>
                                </Link>

                                <Link to='/get-all-clients'>
                                    <MenuItem icon={<AiOutlineEye />}>
                                        View all Client's
                                    </MenuItem>
                                </Link>

                            </MenuList>
                        </Menu>
                    </Box>
                    {/* Responsive Navbar items End*/}
                </Flex>
            </Box>
        </>
    );
};

export { Navbar };