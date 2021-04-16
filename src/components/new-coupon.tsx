import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, HStack, Stack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { RouteComponentProps } from "@reach/router";
import { Field, Form, Formik } from "formik";
import { useStorage } from "../common/localStorage";

const NewCoupon = (_: RouteComponentProps) => {
  const { apiStore } = useStorage();
  const { colorMode } = useColorMode();

  return <Stack>
    <Box p={10} backgroundColor={colorMode === "light" ? "blue.50" : "blue.900"}>
      <Heading mb={2}>Create A New Coupon</Heading>
    </Box>
    <br />
    <Box width="80%" p={10} mx={100} boxShadow="md" border="1px" borderColor="gray.200" alignSelf="center">
      <Formik
        initialValues={{ couponcode: "", coupondescription: "", startdate: "", enddate: "", selectedProduct: [], allProducts: apiStore?.products ?? [] }}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}>
        {({ values, setFieldValue }) => (
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
              <FormLabel><Field type="checkbox" name="selectedProduct" value={product} /><span style={{ marginRight: "5px" }} />{product}</FormLabel>
            )}
            <br />

            {values.selectedProduct?.map((value: any) => <Box border="1px #aaa solid">
              <div>{value}</div>
              <Flex>
                <Field as="select" name="duration" width="100px">
                  <option value="option1">New Orders (First Year Only)</option>
                  <option value="option2">New Orders (For all durations))</option>
                </Field>
              with discount value
              <Input as={Field} type="number" name="couponamount" placeholder="10" />
                <Field as="select" name="duration">
                  <option value="option1">%</option>
                  <option value="option2">USD</option>
                </Field>
                {/* <Select options={subCategory[value].map((text: any) => ({ value: text, label: text }))} /> */}

              </Flex>
              <Button onClick={() => { }}>Add Another</Button>
            </Box>
            )}
            <Button type="submit" colorScheme="blue">Next</Button>
          </Form>
        )}
      </Formik>
    </Box>
  </Stack >
}

export default NewCoupon;