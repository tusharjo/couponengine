import { Alert, AlertIcon } from "@chakra-ui/alert";
import { useColorMode } from "@chakra-ui/color-mode";
import { FormLabel } from "@chakra-ui/form-control";
import { AddIcon, } from "@chakra-ui/icons";
import { Input, InputGroup } from "@chakra-ui/input";
import { Box, Heading, Text, Link, Stack, } from "@chakra-ui/layout";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag";
import { Link as ReachLink, RouteComponentProps } from "@reach/router";
import { Field, Form, Formik } from "formik";
import { useStorage } from "../../common/localStorage";
import { Button, useToast } from "@chakra-ui/react";


export const ProductDashboard = (_: RouteComponentProps) => {
  const { colorMode } = useColorMode();
  const { apiStore, setAPIStore } = useStorage();
  const toast = useToast();


  // let MakeTree = ({ items }: any): any => Object.entries(items).map(([parent, child]) => {
  //   if (Array.isArray(child)) {
  //     return <li>{parent}
  //       <ul>{child.map(ch => <span>{ch},</span>)}</ul>
  //     </li>;
  //   } else {
  //     return <div>{parent}<ul><MakeTree items={child} /></ul></div>;
  //   }
  // });


  // let getAllParents = (obj: any): any => Object.entries(obj).map((prod: any) => {
  //   if (Array.isArray(prod[1])) {
  //     return prod[0];
  //   } else {
  //     return [prod[0], ...getAllParents(prod[1])];
  //   }
  // });

  return <Stack>
    <Box p={10} backgroundColor={colorMode === "light" ? "blue.50" : "blue.900"}>
      <Heading mb={4}>Welcome to Coupon Engine Dashboard</Heading>
      {/* <MakeTree items={prods} /> */}
      <Text fontSize="xl">
        Create and share your coupon code. Get Started Now!
      </Text>
      {apiStore?.products?.length > 0 &&
        <Button size="lg" colorScheme="green" mt="24px" p={0}>
          <Link as={ReachLink} to="/new" display="inline-block" p="5" sx={{
            ":hover": {
              textDecoration: "none",
            }
          }}>Create new coupon</Link>
        </Button>
      }
    </Box>
    {apiStore?.products?.length === 0 &&
      <Box px={10} pt={2}>
        <Alert status="warning">
          <AlertIcon />
          Create products first to apply coupon code.
      </Alert>
      </Box>}
    <Box px={10} pt={3} >
      <Box width="50%" p={10} boxShadow="md" border="1px" borderColor="gray.200" alignSelf="left">
        <Formik
          enableReinitialize
          initialValues={{ products: "", productsArray: apiStore?.products ?? [], selectbox: "root" }}
          onSubmit={(values) => {
            const { products, productsArray } = values;

            if (!values.productsArray.includes(values.products as never) && values.products !== "") {
              setAPIStore({ products: [...productsArray, products] });
            }
            else {
              toast({
                title: "Cannot add duplicate or empty product.",
                position: "bottom-left",
                description: "",
                status: "warning",
                duration: 1000,
                isClosable: true,
              });
            }
          }}>
          {({ values, setFieldValue }) => (
            <Form>
              <FormLabel>
                <Heading size="md">Create Products:<hr style={{ margin: "10px 0" }} /></Heading>
                <InputGroup my={5}>
                  <Input as={Field} name="products" placeholder="Product name" size="lg" mr={5} />
                  <Input as={Field} name="productsValue" placeholder="Product value" size="lg" />
                </InputGroup>
                <Button type="submit" colorScheme="blue" onClick={() => setFieldValue("productsValue", "")}><AddIcon color="white" boxSize="3" mr={2} />Add</Button>
              </FormLabel>
              <Box>
                {values.productsArray.map((product: any) =>
                  <Tag
                    size="lg"
                    key={product}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                    mr={1}
                    mb={1}
                  >
                    <TagLabel>{product}</TagLabel>
                    <TagCloseButton onClick={
                      () => {
                        setFieldValue("productsArray", values.productsArray.filter((_: any) => _ !== product))
                        setAPIStore({ products: values.productsArray.filter((_: any) => _ !== product) });
                      }
                    } />
                  </Tag>
                )}
              </Box>
            </Form>)}
        </Formik>
      </Box>
    </Box>
  </Stack >
}

