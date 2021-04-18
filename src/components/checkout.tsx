import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Heading, Spacer, Text } from "@chakra-ui/layout";
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
import { Input, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { useState } from "react";
import { Field, Form, Formik } from "formik";

const CouponCard = () => {
  return (
    <Box
      marginTop={5}
      border="1px"
      borderColor="gray.200"
      p={5}
      boxShadow="md"
      background="white"
    >
      <Flex>
        <Heading size="sm">DOMAINS10</Heading>
        <Spacer />
        <Button size="xs" variant="outline" colorScheme="green">
          Apply
        </Button>
      </Flex>
      <Box mt={2}>
        Apply coupons for domains to get 10% off!
      </Box>
      <Button
        size="xs"
        variant="link"
        colorScheme="blue"
        rightIcon={<ArrowForwardIcon />}
        p={0}
        mt={2}
      >
        Know More
      </Button>
    </Box>
  );
};

const Checkout = (_: RouteComponentProps) => {
  let items = [
    { product: "Domain ", tenure: 6, price: 1000 },
    { product: "Hosting ", tenure: 12, price: 2000 },
  ];

  let [coupon, applyCoupon] = useState("");

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
            {coupon && <Tr>
              <Td paddingBottom="0"></Td>
              <Td
                paddingBottom="0"
                textAlign="right"
                color="green.400"
                fontWeight="bold"
              >
                Coupon Applied - 10% off
              </Td>
              <Td paddingBottom="0" color="green.400" fontWeight="bold">
                {300}
              </Td>
            </Tr>}
            <Tr>
              <Td></Td>
              <Td textAlign="right" fontWeight="500">
                Amount to be paid
              </Td>
              <Td fontWeight="500">{coupon ? 2700 : 3000}</Td>
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
        background="gray.50"
      >
        <Heading size="md">Apply Coupon</Heading>
        {coupon ? (
          <Box
            paddingRight={10}
            marginTop={5}
            marginBottom={5}
          >
            <Tag size="lg" colorScheme="blue" variant="solid">
              <TagLabel>{coupon}</TagLabel>
              <TagCloseButton onClick={() => applyCoupon("")} />
            </Tag>
            <Text mt={2} color="green.700" fontStyle="italic" fontSize="sm">Coupon Applied</Text>
          </Box>
        ) : (
          <Formik
            initialValues={{ couponcode: coupon }}
            onSubmit={(values, actions) => {
              applyCoupon(values.couponcode);
              actions.setSubmitting(false);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  paddingRight={10}
                  marginTop={5}
                  marginBottom={5}
                >
                  <Input
                    placeholder="Enter coupon code"
                    background="white"
                    name="couponcode"
                    w="70%"
                    as={Field}
                    required
                  />
                  <Button
                    size="sm"
                    variant="solid"
                    colorScheme="green"
                    type="submit"
                  >
                    Apply
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        )}

        <br />
        <Heading size="md">Coupons Available</Heading>
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
