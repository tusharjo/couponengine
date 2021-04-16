import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, HStack, Stack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import { navigate, RouteComponentProps } from "@reach/router";
import { Field, Form, Formik } from "formik";
import { useStorage } from "../common/localStorage";

type Props = {
  couponName: string;
};

const NewCoupon: RouteComponentProps & any = ({ couponName }: Props) => {
  const { apiStore, setAPIStore } = useStorage();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const initialValues = couponName ? apiStore?.coupons?.find((coupon: any) => coupon.couponcode === couponName) : {
    couponcode: "",
    coupondescription: "",
    startdate: "",
    enddate: "",
    selectedProduct: [],
    allProducts: apiStore?.products ?? [],
    appliedCoupon: {}
  }

  return <Stack>
    <Box p={10} backgroundColor={colorMode === "light" ? "blue.50" : "blue.900"}>
      <Heading mb={2}>Create A New Coupon</Heading>
    </Box>
    <br />
    <Box width="80%" p={10} mx={100} boxShadow="md" border="1px" borderColor="gray.200" alignSelf="center">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          if (couponName) {
            let findCouponIndex = apiStore.coupons.findIndex((coupon: any) => coupon.couponcode === couponName);
            apiStore.coupons[findCouponIndex] = values;
            setAPIStore({ coupons: apiStore.coupons });
            toast({
              title: "Coupon code details updated successfully.",
              position: "bottom-left",
              description: "",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            navigate("/");
          }
          else if (!apiStore.hasOwnProperty("coupons")) {
            setAPIStore({ coupons: [values] });
            toast({
              title: "Coupon code added successfully.",
              position: "bottom-left",
              description: "",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            navigate("/");
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
            navigate("/");
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
          <Input as={Field} name="couponcode" placeholder="eg: hosting101" disabled={couponName?.length > 0} required />
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
            {Object.keys(values.appliedCoupon).map((product) => {
              return <Box boxShadow="md" border="1px" borderColor="gray.200" p={5} mb={5}>
                <Box textTransform="uppercase" fontWeight="bold">{product}</Box>
                <hr />
                <br />
                <Flex alignItems="center">
                  <Field as="select" name={`appliedCoupon.${product}.duration`} width="100px">
                    <option value="one">New Orders (First Year Only)</option>
                    <option value="all">New Orders (For all durations))</option>
                  </Field>
                  <span style={{ margin: "0 10px" }}>with discount value</span>
                  <Input as={Field} type="number" name={`appliedCoupon.${product}.discount`} placeholder="10" width="100px" />
                  <Field as="select" name={`appliedCoupon.${product}.currency`}>
                    <option value="percentage">%</option>
                    <option value="USD">USD</option>
                  </Field>
                </Flex>
                <Button mt={5} colorScheme="blackAlpha" onClick={() => {
                  setFieldValue("selectedProduct", values.selectedProduct.filter((_: any) => _ !== product));
                  setFieldValue("appliedCoupon", Object.fromEntries(Object.entries(values.appliedCoupon).filter(_ => _[0] !== product)))
                }
                }>Delete</Button>
              </Box>
            })}
            <br />
            <br />
            <Heading size="md" mb={5}>Step 3: Set Coupon Limits</Heading>
            <hr />
            <br />
            <FormLabel>
              The number of times the coupon can be used in all:	<Input as={Field} type="number" name="couponlimit" placeholder="10" width="80px" />
            </FormLabel>
            <FormLabel>
              The number of times each customer can use the coupon:	<Input as={Field} type="number" name="couponused" placeholder="1" width="80px" />
            </FormLabel>
            <FormLabel>
              The no. of orders to which the coupon can be applied:		<Input as={Field} type="number" name="couponorders" placeholder="1" width="80px" />
            </FormLabel>
            <br />
            <Button type="submit" colorScheme="blue" size="lg">Submit</Button>
          </Form>
        )}
      </Formik>
    </Box>
    <br />
    <br />
  </Stack>
}

export default NewCoupon;