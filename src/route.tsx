import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Router } from "@reach/router";
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./components/home"));
const NewCoupon = React.lazy(() => import("./components/new-coupon"));
const NotFound = React.lazy(() => import("./components/not-found"));
const Checkout = React.lazy(() => import("./components/checkout"));

export default function Route() {
  return (
    <Box minH={`calc(100vh - 144px)`}>
      <Suspense
        fallback={
          <Flex
            width="100%"
            minHeight="calc(100vh - 170px)"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="teal.500"
              size="xl"
            />
          </Flex>
        }
      >
        <Router>
          <Home path="/" />
          <NewCoupon path="/new" />
          <NewCoupon path="/edit/:couponName" />
          <Checkout path="/checkout" />
          <NotFound path="*" />
        </Router>
      </Suspense>
    </Box>
  );
}
