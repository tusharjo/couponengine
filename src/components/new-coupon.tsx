import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading, HStack, Stack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { RouteComponentProps } from "@reach/router";
import { Field, Form, Formik } from "formik";
import Select from "react-select";

const allProducts = [
  {
    label: "domain", text: "Domain"
  },
  { label: "hosting", text: "Hosting" },
  { label: "server", text: "Server" }
];

const subCategory = { domain: ["biz", "com", "org"], hosting: ["SDH", "MDH"] } as any;


const NewCoupon = (_: RouteComponentProps) => {
  const { colorMode } = useColorMode();

  return <Stack>
    <Box p={10} backgroundColor={colorMode === "light" ? "blue.50" : "blue.900"}>
      <Heading mb={2}>Create A New Coupon</Heading>
    </Box>
    <br />
    <Box width="60%" p={10} mx={100} boxShadow="md" border="1px" borderColor="gray.200" alignSelf="center">
      <Formik
        initialValues={{ couponcode: "", coupondescription: "", startdate: "", enddate: "", selectedProduct: [] }}
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

            {allProducts.map(product =>
              <FormLabel><Field type="checkbox" name="selectedProduct" value={product.label} />{product.text}</FormLabel>
            )}
            <br />

            {values.selectedProduct?.map((value: any) => <div>
              <div>{value}</div>
              <Select options={subCategory[value].map((text: any) => ({ value: text, label: text }))} />
              <Button onClick={() => { }}>Add Another</Button>
            </div>
            )}
            <Button type="submit" colorScheme="blue">Next</Button>
          </Form>
        )}
      </Formik>
    </Box>
  </Stack >
}

export default NewCoupon;