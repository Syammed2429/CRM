
import { nanoid } from 'nanoid';
import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
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
    const cancelRef: any = useRef();
    const [success, setSuccess] = useState<boolean>(false);
    //     //AlertDialog
    const { isOpen, onOpen, onClose } = useDisclosure();
    const MAX_CHARACTER_LIMIT: number = 30;




    /**
     * A function to get the input details and check for the validation start
     * @param e 
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        if (name === 'avatar') {
            if (
                value.trim() !== '' &&
                !value.startsWith('https://') &&
                !value.startsWith('http://')
            ) {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: 'Avatar URL must start with "https://" or "http://"',
                }));
            } else {
                setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
            }
        } else {
            if (value.trim() === '' && requiredFields.find((field) => field.field === name)) {
                setFormErrors((prevErrors) => ({ ...prevErrors, [name]: `${name} is required` }));
            } else if (value.length > MAX_CHARACTER_LIMIT) {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: `Maximum ${MAX_CHARACTER_LIMIT} characters allowed`,
                }));
            } else {
                setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
            }
        }
    };
    //  * A function to get the input details and check for the validation end



    /**
     * A function to store the client details once clicked on the save button start
     * @param e 
     */
    const handleSubmit = (e: FormEvent) => {
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
            const newUser = { ...formData, status: 'active', date: new Date(), id: userKey };
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
        }
    };
    //  * A function to store the client details once clicked on the save button end



    return (
        <>

            <Box maxWidth="400px" mx="auto" p="4">
                {/* Input form fields start */}
                <form onSubmit={handleSubmit}>
                    <FormControl isInvalid={!!formErrors.contact}>
                        <FormLabel htmlFor="contact">Contact Information</FormLabel>
                        <Input
                            autoFocus={true}
                            autoComplete='off'
                            id="contact"
                            name="contact"
                            type="text"
                            placeholder='Enter the email or phone number'
                            value={formData.contact}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>{formErrors.contact}</FormErrorMessage>
                    </FormControl>


                    <FormControl mt="4" isInvalid={!!formErrors.name}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                            autoComplete='off'
                            id="name"
                            name="name"
                            type="text"
                            placeholder='Enter client name'
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>{formErrors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl mt="4" isInvalid={!!formErrors.avatar}>
                        <FormLabel htmlFor="avatar">Avatar URL</FormLabel>
                        <Input
                            autoComplete='off'
                            placeholder='Enter avatar url'
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
                            autoComplete='off'
                            placeholder='Enter the organization name'
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
                    <Button
                        mt="4"
                        colorScheme="teal"
                        type="submit"
                        isDisabled={
                            !!formErrors.contact ||
                            !!formErrors.name ||
                            !!formErrors.organization ||
                            formData.name.length > MAX_CHARACTER_LIMIT ||
                            formData.organization.length > MAX_CHARACTER_LIMIT
                        }
                    >
                        Submit
                    </Button>
                </form>
                {/* Input form fields end */}



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