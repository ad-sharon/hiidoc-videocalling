import React, { useState } from "react";
import {
  Box,
  Input,
  Flex,
  Button,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

const PinInput = ({ onPinSubmit }) => {
  const [pin, setPin] = useState("");

  const handlePinChange = (event) => {
    setPin(event.target.value);
  };

  const handlePinSubmitClick = () => {
    onPinSubmit(pin);
    setPin("");
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      p={8}
      borderRadius={8}
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Enter Pin
      </Text>
      <Flex direction="column" mb={4}>
        <Input
          value={pin}
          onChange={handlePinChange}
          type="password"
          placeholder="Enter pin here"
          mb={2}
          height={12}
        />
        <Button
          onClick={handlePinSubmitClick}
          colorScheme="blue"
          width="full"
          height={12}
          isDisabled={pin.length < 4}
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default PinInput;
