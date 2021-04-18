import React from "react";
import { Link as ReachLink } from "@reach/router";
import { Heading, Flex, Stack, Text } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/color-mode";
import { Button } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/popover";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      p={5}
      pl={10}
      pr={10}
      bg={window.location.href.includes("checkout") ? "teal.400" : "blue.500"}
      color="white"
      top={0}
      zIndex={2}
    >
      <Flex align="center">
        <Heading as="h1" size="xl" position="relative">
          <ReachLink to="/">
            {window.location.href.includes("checkout")
              ? "Bigrock"
              : "Coupon Engine"}
          </ReachLink>
        </Heading>
      </Flex>
      <Stack direction="row" spacing={4} alignItems="center">
        <Popover placement="top">
          <PopoverTrigger>
            <Avatar size="sm">
              <AvatarBadge boxSize="1em" bg="green.500" />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent w={250}>
            <PopoverArrow />
            <PopoverBody>
              <Text color={`mode.${colorMode}.text`} mb={5}>
                Welcome, <strong>Debby Powers</strong>!
              </Text>
              <Button colorScheme="blue" size="sm">
                Log out
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Button
          aria-label="Light/Dark mode"
          onClick={toggleColorMode}
          bg="transparent"
        >
          {colorMode === "light" ? (
            <MoonIcon boxSize={6} />
          ) : (
            <SunIcon boxSize={6} />
          )}
        </Button>
      </Stack>
    </Flex>
  );
};
