import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Heading, Text, Link, Stack } from "@chakra-ui/layout";
import { Link as ReachLink, RouteComponentProps } from "@reach/router";

const Home = (_: RouteComponentProps) => {
  const { colorMode } = useColorMode();

  return <Stack>
    <Box p={10} backgroundColor={colorMode === "light" ? "blue.50" : "blue.900"}>
      <Heading mb={4}>Welcome to Coupon Engine Dashboard</Heading>
      <Text fontSize="xl">
        Create and share your coupon code. Get Started Now!
    </Text>
      <Button size="lg" colorScheme="green" mt="24px">
        <Link as={ReachLink} to="/new" sx={{
          ":hover": {
            textDecoration: "none",
          }
        }}>Create new coupon</Link>
      </Button>
    </Box>
    <Box p={10}>
      <Heading mb={4}> List of Coupon</Heading>
      <hr />
    </Box>
  </Stack>
}

export default Home;