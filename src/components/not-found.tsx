import React from "react";
import { Link as ReachLink, RouteComponentProps } from "@reach/router";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/color-mode";
import { Button } from "@chakra-ui/button";

const NotFound = (_: RouteComponentProps) => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Box
        p={10}
        as={Flex}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Box
          p={10}
          bg={`mode.${colorMode}.box`}
          w="100%"
          borderWidth={colorMode === "light" ? "1px" : 0}
          rounded="lg"
          alignContent="center"
          overflow="hidden"
        >
          <Heading color={`mode.${colorMode}.text`} mb={10}>
            Sorry, the page which you've been looking for does not exist!
          </Heading>
          <Button aria-label="Create first mock" variantColor="blue">
            <ReachLink to="/">Go To Homepage</ReachLink>
          </Button>

        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;