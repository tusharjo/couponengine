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
      {apiStore?.products && Object.keys(apiStore?.products)?.length > 0 &&
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
          initialValues={{ parent: "domains", products: "", productsValue: "", productsArray: apiStore?.products ?? {}, selectbox: "root" }}
          onSubmit={(values) => {
            const { parent, products, productsValue } = values;

            if (values.products !== "") {
              setAPIStore({
                products: {
                  ...apiStore.products,
                  [parent]: {
                    ...apiStore.products?.[parent] ? apiStore.products[parent] : {},
                    [products]: productsValue
                  }
                }
              });
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
                <Heading size="md">Create Products:<hr style={{ margin: "10px 0 25px" }} /></Heading>
                <Field as="select" name="parent" style={{ width: "100%" }}>
                  <option value="domains">Domains</option>
                  <option value="hosting">Hosting</option>
                  <option value="servers">Servers</option>
                </Field>
                <InputGroup my={5}>
                  <Input as={Field} name="products" placeholder="Product name" size="md" mr={3} required />
                  <Input as={Field} name="productsValue" placeholder="Product duration (in months)" size="md" mr={3} required />
                </InputGroup>
                <Button type="submit" colorScheme="blue"><AddIcon color="white" boxSize="3" mr={2} />Add</Button>
              </FormLabel>
              <Box>
                {Object.entries(values.productsArray).map(([parent, products]: [any, any]) =>
                  Object.keys(products).map(product =>
                    <Tag
                      size="lg"
                      key={product}
                      borderRadius="full"
                      variant="solid"
                      colorScheme="green"
                      mr={1}
                      mb={1}
                    >
                      <TagLabel>{parent} - {product}</TagLabel>
                      <TagCloseButton onClick={
                        () => {
                          let updatedObj = apiStore.products[parent];
                          delete updatedObj[product];
                          console.log(updatedObj, "UO");
                          setFieldValue("productsArray", {
                            ...apiStore.products,
                            [parent]: updatedObj
                          })
                          setAPIStore({
                            products: {
                              ...apiStore.products,
                              [parent]: updatedObj
                            }
                          });
                        }
                      } />
                    </Tag>
                  ))}
              </Box>
            </Form>)}
        </Formik>
      </Box>
    </Box>
  </Stack >
}

