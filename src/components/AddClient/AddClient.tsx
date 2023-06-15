
import React, { useState, useEffect, useRef } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import { FormDataInterface, RequiredField } from '../../Interface/Interface';
import { nanoid } from 'nanoid';




export const AddClient: React.FC = () => {
    const [formData, setFormData] = useState<FormDataInterface>({
        contact: '',
        name: '',
        avatar: '',
        organization: '',
        assignedUser: '',
        id: '',
        status: 'active'
    });

    const [requiredFields] = useState<RequiredField[]>([
        { field: 'contact', message: 'Contact information is required' },
        { field: 'name', message: 'Name is required' },
        { field: 'avatar', message: 'Avatar is required' },
        { field: 'organization', message: 'Organization information is required' },
        { field: 'assignedUser', message: 'Assigned user is required' }]
    )
    const [formErrors, setFormErrors] = useState<Partial<FormDataInterface>>({});
    const [savedData, setSavedData] = useState<{ [key: string]: FormDataInterface }>({});
    const cancelRef: any = useRef();
    const [success, setSuccess] = useState<boolean>(false);


    //     //AlertDialog
    const { isOpen, onOpen, onClose } = useDisclosure();



    useEffect(() => {
        const existingData = localStorage.getItem('formData');
        if (existingData) {
            setSavedData(JSON.parse(existingData));
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (value.trim() === '' && requiredFields.find((field) => field.field === name)) {
            setFormErrors((prevErrors) => ({ ...prevErrors, [name]: `${name} is required` }));
        } else {
            setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }

    };



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: Partial<FormDataInterface> = {};

        requiredFields.forEach((requiredField) => {
            const { field, message } = requiredField;
            if (!formData[field]) {
                errors[field] = message;
            }
        });
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            const userKey = nanoid();
            const newUser = { ...formData, status: 'active', id: userKey };
            const savedDataFromLocalStorage = localStorage.getItem('formData');
            const parsedSavedData = savedDataFromLocalStorage
                ? JSON.parse(savedDataFromLocalStorage)
                : {};
            const newSavedData = { ...parsedSavedData, [userKey]: newUser };
            localStorage.setItem('formData', JSON.stringify(newSavedData));
            onOpen();
            setSuccess(true);
            // Reset the form data
            setFormData({
                contact: '',
                name: '',
                avatar: '',
                organization: '',
                assignedUser: '',
                status: 'active'
            });
            setSavedData(newSavedData); // Update the saved data state with newSavedData
        }
    };


    return (
        <>

            <Box maxWidth="400px" mx="auto" p="4">
                <form onSubmit={handleSubmit}>
                    <FormControl isInvalid={!!formErrors.contact}>
                        <FormLabel htmlFor="contact">Contact Information</FormLabel>
                        <Input
                            id="contact"
                            name="contact"
                            type="text"
                            value={formData.contact}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>{formErrors.contact && formErrors.contact}</FormErrorMessage>
                    </FormControl>


                    <FormControl mt="4" isInvalid={!!formErrors.name}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>{formErrors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl mt="4" isInvalid={!!formErrors.avatar}>
                        <FormLabel htmlFor="avatar">Avatar URL</FormLabel>
                        <Input
                            id="avatar"
                            name="avatar"
                            type="text"
                            value={formData.avatar}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>{formErrors.avatar}</FormErrorMessage>

                    </FormControl>

                    <FormControl mt="4" isInvalid={!!formErrors.organization}>
                        <FormLabel htmlFor="organization">Organization</FormLabel>
                        <Input
                            id="organization"
                            name="organization"
                            type="text"
                            value={formData.organization}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>{formErrors.organization}</FormErrorMessage>

                    </FormControl>

                    <FormControl mt="4" isInvalid={!!formErrors.assignedUser}>
                        <FormLabel htmlFor="assignedUser">Assigned User</FormLabel>

                        <Select
                            id="assignedUser"
                            name="assignedUser"
                            value={formData.assignedUser}
                            onChange={handleInputChange}
                        >
                            <option value="">Select User</option>
                            <option value="user1">User 1</option>
                            <option value="user2">User 2</option>
                            <option value="user3">User 3</option>
                        </Select>
                        <FormErrorMessage>{formErrors.assignedUser}</FormErrorMessage>

                    </FormControl>

                    <Button mt="4" colorScheme="teal" type="submit">
                        Submit
                    </Button>
                </form>


                {/* Alert Dialog Start*/}
                <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            {success ? <Text>Success</Text> : <Text>Error</Text>}
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            {success ? (
                                <Text>Client details has been Successfully added</Text>
                            ) : (
                                <Text>
                                    Failed to add an client details or your input fields are
                                    empty
                                </Text>
                            )}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                                Ok
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                {/* Alert Dialog End*/}
            </Box>
        </>

    );
};