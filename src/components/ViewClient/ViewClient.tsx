import { Box, Button, Center, SimpleGrid } from "@chakra-ui/react";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { FormDataInterface } from "../../Interface/Interface";

export const ViewClient: FC = () => {
    const [clientDetails, setClientDetails] = useState<{ [key: string]: FormDataInterface }>({})


    const handleDelete = (id: string) => {
        const existingDataString = localStorage.getItem('formData');
        if (existingDataString) {
            const existingData = JSON.parse(existingDataString) as { [key: string]: FormDataInterface };
            delete existingData[id];
            localStorage.setItem('formData', JSON.stringify(existingData));
            setClientDetails(existingData);
        }
    };

    const handleStatusToggle = (id: string) => {
        const updatedClientDetails = { ...clientDetails };
        updatedClientDetails[id].status = updatedClientDetails[id].status === "active" ? "inactive" : "active";
        setClientDetails(updatedClientDetails);
        localStorage.setItem("formData", JSON.stringify(updatedClientDetails));
    };

    useEffect(() => {
        const existingData = localStorage.getItem('formData');
        if (existingData) {

            setClientDetails(JSON.parse(existingData));
            console.log('existingData:', clientDetails)
        }

    }, []);

    return (
        <>
            <Center p={5}>
                <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing="8">
                    {Object.keys(clientDetails).map((userKey) => (
                        <Box key={userKey} mt="4" p="4" border="1px solid gray">
                            <h2>Saved Data {userKey}:</h2>
                            <p>Contact Information: {clientDetails[userKey].contact}</p>
                            <p>Name: {clientDetails[userKey].name}</p>
                            <img src={clientDetails[userKey].avatar} alt="Profile" />
                            <p>Organization: {clientDetails[userKey].organization}</p>
                            <p>Assigned User: {clientDetails[userKey].assignedUser}</p>
                            <p>Status: {clientDetails[userKey].status}</p>

                            <Button colorScheme="red" onClick={() => handleDelete(clientDetails[userKey].id as string)}>Delete</Button>
                            <Button colorScheme="blue" onClick={() => handleStatusToggle(clientDetails[userKey].id as string)}>
                                Toggle Status
                            </Button>
                        </Box>
                    ))}
                </SimpleGrid>


            </Center>
        </>
    );
}