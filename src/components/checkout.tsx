import { Button } from "@chakra-ui/button";
import { Box, Flex, Grid, Heading, Spacer } from "@chakra-ui/layout";
import {
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
} from "@chakra-ui/table";
import { RouteComponentProps } from "@reach/router";

const CouponCard = () => {
  return (
    <Box marginTop={5}>
      <Flex>
        <Heading size="sm">ABCDEF</Heading>
        <Spacer />
        <Button size="xs" variant="outline" colorScheme="green">
          Apply
        </Button>
      </Flex>
      <Box>
        coupon description goes here.... coupon description goes here....
      </Box>
    </Box>
  );
};

const Checkout = (_: RouteComponentProps) => {
  let items = [
    { product: "Domain ", tenure: 6, price: 1000 },
    { product: "Hosting ", tenure: 12, price: 2000 },
  ];

  return (
    <Grid templateColumns="2fr 1fr" autoRows="max-content" marginTop="5%">
      <Box
        p={10}
        marginLeft={100}
        // boxShadow="md"
        h="100%"
        border="1px"
        borderColor="gray.200"
        alignSelf="center"
      >
        <Heading>Checkout</Heading>
        <Table variant="unstyled">
          <TableCaption
            placement="top"
            textAlign="left"
            paddingLeft={0}
            fontWeight="bold"
          >
            Order Summary
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Tenure (in months)</Th>
              <Th>Price (in INR)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr>
                <Td>{item.product}</Td>
                <Td>{item.tenure}</Td>
                <Td>{item.price}</Td>
              </Tr>
            ))}

            <Tr borderTop="1px solid" borderColor="gray.500">
              <Td paddingBottom="0"></Td>
              <Td paddingBottom="0" textAlign="right">
                Total
              </Td>
              <Td paddingBottom="0">
                {items.reduce((a, b) => a + b.price, 0)}
              </Td>
            </Tr>
            <Tr>
              <Td paddingBottom="0"></Td>
              <Td paddingBottom="0" textAlign="right">
                Tax
              </Td>
              <Td paddingBottom="0">{100}</Td>
            </Tr>
            <Tr>
              <Td paddingBottom="0"></Td>
              <Td
                paddingBottom="0"
                textAlign="right"
                color="green.400"
                fontWeight="bold"
              >
                Coupon Applied
              </Td>
              <Td paddingBottom="0" color="green.400" fontWeight="bold">
                {100}
              </Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td textAlign="right" fontWeight="500">
                Amount to be paid
              </Td>
              <Td fontWeight="500">{3000}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Box
        p={10}
        paddingRight={0}
        marginRight={100}
        h="100%"
        // boxShadow="md"
        border="1px"
        borderColor="gray.200"
        alignSelf="center"
      >
        <Heading size="md">Placeholder Text</Heading>
        <Box overflow="scroll" h="500px" paddingRight={10}>
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
        </Box>
      </Box>
    </Grid>
  );
};

export default Checkout;
