import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormDataInterface } from "../../Interface/Interface";
import { Box, Center, Text, Spinner, Card, CardHeader, CardBody, Flex, Avatar, Heading, Image } from "@chakra-ui/react";

export const ClientDetails: FC = () => {
    const { clientId } = useParams<{ clientId: string }>();
    const [clientDetails, setClientDetails] = useState<FormDataInterface | null>(null);

    // Fetching the client details
    useEffect(() => {
        const existingData = localStorage.getItem('formData');
        if (existingData) {
            const parsedData = JSON.parse(existingData) as { [key: string]: FormDataInterface };
            const clientDetails = parsedData[clientId as string];
            setClientDetails(clientDetails)
        }

    }, [clientId]);

    return (
        <>
            <div>
                <Center p={4}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    minHeight='80vh'

                >
                    <Card maxW="sm" p={6} bg='cyan.900'>
                        {/* Displaying the client details in the card format start */}
                        {clientDetails ? (
                            <>
                                <CardHeader>

                                    <Text fontWeight="bold" fontSize="lg" mb={2}>
                                        Client Details:
                                    </Text>
                                    <Flex>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                            <Avatar name={clientDetails.name} src={clientDetails.avatar} />

                                            <Box>
                                                <Heading size='sm'>{clientDetails.name}</Heading>
                                                <Text>{clientDetails.contact}</Text>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </CardHeader>
                                <CardBody>
                                    <Center mb={3}>

                                        <Image
                                            objectFit='cover'
                                            align='center'
                                            boxSize='200px'
                                            src={clientDetails.avatar}
                                            borderRadius='2xl'
                                        />
                                    </Center>
                                    <Text>Name: {clientDetails.name}</Text>
                                    <Text>Contact Information: {clientDetails.contact}</Text>
                                    <Text>Organization: {clientDetails.organization}</Text>
                                    <Text>Assigned User: {clientDetails.assignedUser}</Text>
                                    <Text>Status: {clientDetails.status}</Text>
                                    {clientDetails.date && (
                                        <Text>Date: {clientDetails.date.split('T')[0]} Time: {clientDetails.date.split('T')[1]}</Text>
                                    )}
                                </CardBody>
                                {/* Displaying the client details in the card format start */}

                            </>
                        ) : (
                            <Box textAlign="center">
                                <Spinner />
                                <Text mt={2}>Loading client details...</Text>
                            </Box>
                        )}
                    </Card>
                </Center>


            </div>
        </>
    );
}