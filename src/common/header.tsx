import React from "react";
import { Link as ReachLink } from "@reach/router";
import {
  Heading,
  Flex,
  Stack

} from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/color-mode";
import { Button } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode, "colorMode");

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      p={5}
      pl={10}
      pr={10}
      bg="blue.500"
      color="white"
      top={0}
      zIndex={2}
    >
      <Flex align="center">
        <Heading as="h1" size="xl" position="relative">
          <ReachLink to="/">Coupon Engine</ReachLink>
        </Heading>
      </Flex>
      <Stack direction="row" spacing={4} alignItems="center">
        <Avatar size="sm">
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
        <Button aria-label="Light/Dark mode" onClick={toggleColorMode} bg="transparent">
          {colorMode === "light" ? <MoonIcon boxSize={6} /> : <SunIcon boxSize={6} />}
        </Button>
      </Stack>
    </Flex>
  );
};