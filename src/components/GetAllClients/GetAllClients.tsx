import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box, Button, Card, CardBody, CardHeader, Center, Drawer, DrawerBody,
    DrawerCloseButton, DrawerContent, DrawerFooter,
    DrawerHeader, DrawerOverlay, Flex, Image, Input, Radio, RadioGroup,
    SimpleGrid, Spacer, Stack, Text, useDisclosure,
} from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import { FormDataInterface } from '../../Interface/Interface';

import { LuSettings2 } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom';



export const GetAllClients: FC = () => {
    const [clientDetails, setClientDetails] = useState<{ [key: string]: FormDataInterface }>({})
    const [allClientDetails, setAllClientDetails] = useState<{ [key: string]: FormDataInterface }>({})
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const deleteCancelRef = useRef<HTMLButtonElement | null>(null);
    const filterOpenRRef = useRef<HTMLButtonElement>(null);
    const [value, setValue] = useState<string>('');
    const [filterDate, setFilterDate] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const clientsPerPage: number = 10;
    const navigate = useNavigate();
    const [deleteClientId, setDeleteClientId] = useState<string>('');




    /**
     * Function to handle deleting a client start
     * @param id 
     */
    const handleDelete = (id: string) => {
        setDeleteClientId(id);
        setIsOpened(true)
    };
    const handleConfirmDelete = () => {
        const existingDataString = localStorage.getItem('formData');
        if (existingDataString) {
            const existingData = JSON.parse(existingDataString) as { [key: string]: FormDataInterface };
            delete existingData[deleteClientId];
            localStorage.setItem('formData', JSON.stringify(existingData));
            setClientDetails(existingData);
        }
        setIsOpened(false);
    };

    // Function to handle deleting a client end

    /**
     * Function to handle toggling the status of a client start
     * @param id 
     */
    const handleStatusToggle = (id: string) => {
        const updatedClientDetails = { ...clientDetails };
        updatedClientDetails[id].status = updatedClientDetails[id].status === 'active' ? 'inactive' : 'active';
        setClientDetails(updatedClientDetails);
        localStorage.setItem('formData', JSON.stringify(updatedClientDetails));
    };

    // Function to handle toggling the status of a client end



    // Function to handle filtering the client details based on status and date start

    const handleDrawerFilter = () => {
        let filteredData = Object.values(allClientDetails);

        if (value && filterDate) {
            filteredData = filteredData.filter(
                (client) =>
                    client.status === value &&
                    (client.date?.split('T')[0] ?? '') === filterDate
            );
        } else if (value) {
            filteredData = filteredData.filter(
                (client) => client.status === value
            );
        } else if (filterDate) {
            filteredData = filteredData.filter(
                (client) => (client.date?.split('T')[0] ?? '') === filterDate
            );
        }

        const filteredDataObject: { [key: string]: FormDataInterface } = {};
        filteredData.forEach((client) => {
            filteredDataObject[client.id as string] = client;
        });
        setClientDetails(filteredDataObject);

        onClose();
    };

    // Function to handle filtering the client details based on status and date end


    // Function to reset the filters and display all client details
    const handleReset = () => {
        setValue('');
        setFilterDate('');
        setClientDetails(allClientDetails);
        onClose();
    };

    /**
     *  Function to navigate to the details page of a specific client
     * @param id 
     */
    const viewEachClient = (id: string) => {
        navigate(`/client/${id}`);
    };

    // Fetch and set client details from localStorage on component mount
    useEffect(() => {
        const existingData = localStorage.getItem('formData');
        if (existingData) {
            const parsedData = JSON.parse(existingData) as { [key: string]: FormDataInterface };
            setClientDetails(parsedData);
            setAllClientDetails(parsedData);
        }
    }, []);

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = Object.keys(clientDetails).slice(indexOfFirstClient, indexOfLastClient);
    console.log('currentClients:', currentClients.length)
    const totalPages = Math.ceil(Object.keys(clientDetails).length / clientsPerPage);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Box >
                {/* displaying the message if it got no clients start */}


                <Flex>
                    <Spacer />
                    <Button
                        mx={6}
                        my={2}
                        ref={filterOpenRRef} leftIcon={<LuSettings2 />} colorScheme='teal' mt={3} onClick={onOpen}>
                        Filters
                    </Button>
                </Flex>
                {!currentClients.length && (
                    <Center
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        minHeight='80vh'
                    >
                        <Card
                            bg='cyan.800'
                            alignItems='center'
                        >
                            <CardHeader>
                                There are currently no clients.
                            </CardHeader>
                            <CardBody>
                                <Text>
                                    Add a new client by navigating to the "Add Client" section.
                                </Text>
                                <Text>If you have added a filter, please update the filter accordingly.</Text>
                            </CardBody>

                        </Card>
                        {/* displaying the message if it got no clients end */}
                    </Center>

                )

                }

                {/* Filter start */}
                <Center>
                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        onClose={onClose}
                        finalFocusRef={filterOpenRRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Filter</DrawerHeader>
                            <DrawerBody>
                                <Text>Status</Text>
                                <RadioGroup my='2' onChange={setValue} value={value}>
                                    <Stack direction='row'>
                                        <Radio value='active'>Active</Radio>
                                        <Radio value='inactive'>Inactive</Radio>
                                    </Stack>
                                </RadioGroup>
                                <Text my='2'>Date</Text>
                                <Input type='date' onChange={(e) => setFilterDate(e.target.value)} value={filterDate} />


                            </DrawerBody>

                            <DrawerFooter display='flex' justifyContent='space-between'>
                                <Button colorScheme='red' onClick={handleReset}>Reset</Button>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='blue' onClick={handleDrawerFilter}>
                                    Apply
                                </Button>

                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>

                </Center>
                {/* Filter end */}

            </Box >
            {/* Displaying all the clients list start */}
            <Center px={2} bg='whiteAlpha.200'>


                <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing='8'>
                    {currentClients.map((userKey) => (
                        <Box
                            p='10'
                            w={'280'}
                            rounded='lg'
                            boxShadow='dark-lg'
                            key={userKey}
                            mt='4'
                            border='1px solid Teal-100'
                        >
                            <Text>Contact Info: {clientDetails[userKey].contact}</Text>
                            <Text>Name: {clientDetails[userKey].name}</Text>
                            <Center>

                                <Image
                                    borderRadius={5}
                                    boxSize='150px'
                                    objectFit='cover'
                                    src={clientDetails[userKey].avatar}
                                    alt={clientDetails[userKey].name + ' image'} />
                            </Center>
                            <Text>Organization: {clientDetails[userKey].organization}</Text>
                            <Text>Assigned User: {clientDetails[userKey].assignedUser}</Text>
                            <Text>Status: {clientDetails[userKey].status}</Text>
                            <Stack w='90' py={2} >
                                <Button size='sm' colorScheme='red' mx={2} onClick={() => handleDelete(clientDetails[userKey].id as string)}>Delete</Button>
                                {/* <Button size='sm' colorScheme='red' mx={2} onClick={onsOpen}>Delete</Button> */}
                                <Button size='sm' colorScheme='blue' onClick={() => handleStatusToggle(clientDetails[userKey].id as string)}>
                                    Toggle Status
                                </Button>
                                <Button size='sm' colorScheme='green' onClick={() => viewEachClient(clientDetails[userKey].id as string)}>Client Details</Button>
                            </Stack>
                        </Box>
                    ))}
                </SimpleGrid>
            </Center >
            {/* Displaying all the clients list end */}


            {/* Pagination start */}
            <Center mb={9}>
                <Box mt={4}>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <Button
                            key={index}
                            size='sm'
                            variant='outline'
                            colorScheme={currentPage === index + 1 ? 'teal' : undefined}
                            onClick={() => paginate(index + 1)}
                            mx={1}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Box>
            </Center>
            {/* Pagination end */}


            {/* Delete alert start */}
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={deleteCancelRef}
                onClose={() => setIsOpened(false)}
                isOpen={isOpened}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Client
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure ? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter >
                            <Button mx={5} ref={deleteCancelRef} onClick={() => setIsOpened(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleConfirmDelete}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            {/* Delete alert end */}


        </>
    );
}