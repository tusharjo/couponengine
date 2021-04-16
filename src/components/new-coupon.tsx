import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, HStack, Stack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import { RouteComponentProps } from "@reach/router";
import { Field, Form, Formik } from "formik";
import { useStorage } from "../common/localStorage";

const NewCoupon = (_: RouteComponentProps) => {
  const { apiStore, setAPIStore } = useStorage();
  const { colorMode } = useColorMode();
  const toast = useToast();

  return <Stack>
    <Box p={10} backgroundColor={colorMode === "light" ? "blue.50" : "blue.900"}>
      <Heading mb={2}>Create A New Coupon</Heading>
    </Box>
    <br />
    <Box width="80%" p={10} mx={100} boxShadow="md" border="1px" borderColor="gray.200" alignSelf="center">
      <Formik
        initialValues={{
          couponcode: "",
          coupondescription: "",
          startdate: "",
          enddate: "",
          selectedProduct: [],
          allProducts: apiStore?.products ?? [],
          appliedCoupon: {}
        }}
        onSubmit={(values) => {
          if (!apiStore.hasOwnProperty("coupons")) {
            setAPIStore({ coupons: [values] });
            toast({
              title: "Coupon code added successfully.",
              position: "bottom-left",
              description: "",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }
          else if (apiStore?.coupons?.findIndex((coupon: any) => coupon.couponcode === values.couponcode) < 0) {
            setAPIStore({ coupons: [...apiStore?.coupons ?? [], values] });
            toast({
              title: "Coupon code added successfully.",
              position: "bottom-left",
              description: "",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }
          else {
            toast({
              title: "Cannot add duplicate coupon.",
              position: "bottom-left",
              description: "",
              status: "warning",
              duration: 1000,
              isClosable: true,
            });
          }
        }}>
        {({ values, setFieldValue, handleChange }) => (
          <Form>
            <Heading size="md" mb={5}>Step 1: Enter Details</Heading>
            <hr />
            <br />
            <Box width="100%" mb={5}>
              <FormLabel>Coupon Code
          <Input as={Field} name="couponcode" placeholder="eg: hosting101" required />
              </FormLabel>
            </Box>
            <Box width="100%" mb={5}>
              <FormLabel>Coupon Description<br />
                <Textarea as={Field} name="coupondescription" component="textarea" placeholder="eg: 10% off on hosting" required />
              </FormLabel>
            </Box>
            <HStack spacing={2} width="100%" mb={5}>
              <Box width="100%">
                <FormLabel>Start Date<br />
                  <Field name="startdate" type="hidden" />
                  <Input type="date" name="couponstartdate" required onChange={e => setFieldValue("startdate", e.target.value)} />
                </FormLabel>
              </Box>
              <Box width="100%">
                <FormLabel>End Date<br />
                  <Field name="enddate" type="hidden" />
                  <Input type="date" name="couponenddate" required onChange={e => setFieldValue("enddate", e.target.value)} />
                </FormLabel>
              </Box>
            </HStack>
            <br />

            <Heading size="md" mb={5}>Step 2: Configure your Coupon</Heading>
            <hr />
            <br />

            {values.allProducts.map((product: any) =>
              <FormLabel><Field type="checkbox" name="selectedProduct" value={product} onChange={(e: any) => {
                handleChange(e);
                if (Object.keys(values.appliedCoupon).includes(e.target.value)) {
                  setFieldValue("appliedCoupon", Object.fromEntries(Object.entries(values.appliedCoupon).filter(_ => _[0] !== e.target.value)))
                } else {
                  setFieldValue("appliedCoupon", {
                    ...values.appliedCoupon,
                    [product]: {
                      currency: "USD",
                      duration: "one",
                      discount: e.target.value
                    }
                  })
                }
                console.log(values.appliedCoupon, "SP")
              }} /><span style={{ marginRight: "5px" }} />{product}</FormLabel>
            )}
            <br />
            {Object.entries(values.appliedCoupon).map(([product, details], index) => {
              return <Box boxShadow="md" border="1px" borderColor="gray.200" p={5}>
                <Box textTransform="uppercase" fontWeight="bold">{product}</Box>
                <hr />
                <br />
                <Flex>
                  <Field as="select" name={`appliedCoupon.${product}.duration`} width="100px">
                    <option value="one">New Orders (First Year Only)</option>
                    <option value="all">New Orders (For all durations))</option>
                  </Field>
                with discount value
                <Input as={Field} type="number" name={`appliedCoupon.${product}.discount`} placeholder="10" width="100" />
                  <Field as="select" name={`appliedCoupon.${product}.currency`}>
                    <option value="percentage">%</option>
                    <option value="USD">USD</option>
                  </Field>

                </Flex>
                <Button onClick={() => {
                  setFieldValue("selectedProduct", values.selectedProduct.filter((_: any) => _ !== product));
                  setFieldValue("appliedCoupon", Object.fromEntries(Object.entries(values.appliedCoupon).filter(_ => _[0] !== product)))
                }
                }>Delete</Button>
              </Box>
            })}
            <Button type="submit" colorScheme="blue">Next</Button>
          </Form>
        )}
      </Formik>
    </Box>
  </Stack >
}

export default NewCoupon;