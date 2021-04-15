import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Heading } from "@chakra-ui/layout";
import { RouteComponentProps } from "@reach/router";

const NewCoupon = (_: RouteComponentProps) => {
  const { colorMode } = useColorMode();

  return <Box p={10} backgroundColor={colorMode === "light" ? "blue.50" : "blue.900"}>
    <Heading mb={4}>Create A New Coupon</Heading>
  </Box>
}

export default NewCoupon;