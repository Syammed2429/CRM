import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import {
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Input,
    Stack,
    Radio,
    RadioGroup,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Text,
} from "@chakra-ui/react";
import { FormDataInterface } from "../../Interface/Interface";

const AddClient: FC = () => {
    //Hooks
    const [formData, setFormData] = useState<FormDataInterface>({
        name: '',
        contact: '',
        organization: '',
        avatar: null,
        assigned: false,

    });
    const [success, setSuccess] = useState<boolean>(false);
    const cancelRef: any = useRef();

    //AlertDialog
    const { isOpen, onOpen, onClose } = useDisclosure();

    //HandleInputChange function
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const addData = (data: FormDataInterface) => {
        const arr = [data];
        console.log('arr:', arr)
        onOpen();
        setSuccess(true);

    }

    useEffect(() => {
        if (success) {
            handleResetForm();
        }
    }, [success]);

    const handleResetForm = () => {
        setFormData({
            name: '',
            contact: '',
            organization: '',
            avatar: null,
            assigned: false,
        });
        setSuccess(false);
    };

    //HandleSubmit function
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if (
            formData.name.length === 0 ||
            formData.contact.length === 0 ||
            formData.organization.length === 0 ||
            formData.avatar === null ||
            formData.assigned === false

        ) {
            onOpen();
            return setSuccess(false);
        } else
            addData(formData)
    };

    return (
        <>
            <Container my={20}>
                {/* Form Starts */}

                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Enter the client name"
                            _placeholder={{ color: "gray.100" }}
                            onChange={handleInputChange}
                        />
                        {formData.name.length !== 0 ? (
                            <FormHelperText>Enter the name of the client.</FormHelperText>
                        ) : (
                            <FormErrorMessage>Name is required.</FormErrorMessage>
                        )}

                        <FormLabel htmlFor="contact">Contact Information</FormLabel>
                        <Input
                            id="contact"
                            type="number"
                            name="contact"
                            value={formData.contact}
                            placeholder="Enter the contact information"
                            _placeholder={{ color: "gray.100" }}
                            onChange={handleInputChange}
                        />
                        {formData.contact.length !== 0 ? (
                            <FormHelperText>
                                Enter the contact Information of the client.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Contact Information is required.</FormErrorMessage>
                        )}

                        <FormLabel htmlFor="organization">Organization</FormLabel>
                        <Input
                            id="organization"
                            type="text"
                            name="organization"
                            value={formData.organization}
                            placeholder="Enter the client organization"
                            _placeholder={{ color: "gray.100" }}
                            onChange={handleInputChange}
                        />
                        {formData.organization.length !== 0 ? (
                            <FormHelperText>
                                Enter the contact Information of the client.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Contact Information is required.</FormErrorMessage>
                        )}

                        <FormLabel htmlFor="avatar">Avatar</FormLabel>
                        <Input
                            id="avatar"
                            type="file"
                            name="avatar"
                            // value={formData.avatar as File}
                            placeholder="Enter the client avatar"
                            _placeholder={{ color: "gray.100" }}
                            onChange={handleInputChange}
                        />
                        {formData.avatar !== null ? (
                            <FormHelperText>
                                Enter the contact Information of the client.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Contact Information is required.</FormErrorMessage>
                        )}
                        <FormLabel htmlFor="assigned">Is he assigned to your organization?</FormLabel>

                        <RadioGroup name="assigned" value={String(formData.assigned)}>
                            <Stack spacing={5} direction="row" onChange={handleInputChange}>
                                <Radio colorScheme="green" value="true">
                                    Yes
                                </Radio>
                                <Radio colorScheme="red" value="false">
                                    No
                                </Radio>
                            </Stack>
                        </RadioGroup>
                        {/* 

                        <FormLabel htmlFor="date">Date</FormLabel>
                        <Input
                            id="date"
                            type="date"
                            name="date"
                            onChange={handleInputChange}
                        />

                        {formData.date.length !== 0 ? (
                            <FormHelperText>Enter the date of agenda item.</FormHelperText>
                        ) : (
                            <FormErrorMessage>Title is required.</FormErrorMessage>
                        )} */}
                        <Button my={3} type="submit">
                            Submit Details
                        </Button>
                    </FormControl>
                </form>
                {/* Form End */}

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
            </Container>
        </>
    );
};

export { AddClient };