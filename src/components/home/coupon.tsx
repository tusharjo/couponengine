import { IconButton } from "@chakra-ui/button";
import { CopyIcon, DeleteIcon, EditIcon, SearchIcon, TimeIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Heading, Stack, Badge } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tag } from "@chakra-ui/tag";
import { Tooltip } from "@chakra-ui/tooltip";
import { RouteComponentProps } from "@reach/router";
import { useStorage } from "../../common/localStorage";

export const CouponDashboard = (_: RouteComponentProps) => {
  const { apiStore, setAPIStore } = useStorage();
  let { coupons } = apiStore;
  return <Stack>
    <Box p={10}>
      <Heading size="lg" pb="10"> List of Coupons</Heading>
      <Stack mb="5">
        <InputGroup size="lg">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input type="tel" placeholder="Search Coupons" />
        </InputGroup>
      </Stack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Coupon Code</Th>
            <Th>Promo Dates</Th>
            <Th>Applies to</Th>
            <Th>Status</Th>
            <Th>Time Added</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {coupons.map((coupon: any) => <Tr>
            <Td>{coupon.couponcode}<span style={{ marginRight: "5px" }} />
              <Tooltip label="Copy Coupon Code" fontSize="md"><CopyIcon cursor="pointer" /></Tooltip>
            </Td>
            <Td>{coupon.startdate} to {coupon.enddate}</Td>
            <Td maxW="200">
              {
                coupon.allProducts.map((product: any) => <Tag m="1" key={product}>{product}</Tag>)
              }
            </Td>
            <Td><Badge variant="outline" colorScheme="green">active</Badge></Td>
            <Td>{coupon.startdate} </Td>
            <Td>
              <Tooltip label="Edit Coupon" fontSize="md">
                <IconButton aria-label="edit" size="sm" icon={<EditIcon />} mr="5" />
              </Tooltip>
              <Tooltip label="View Reports" fontSize="md">
                <IconButton aria-label="viewreports" size="sm" icon={<TimeIcon />} mr="5" />
              </Tooltip>
              <Tooltip label="Delete Coupon" fontSize="md">
                <IconButton aria-label="delete" size="sm" icon={<DeleteIcon />} onClick={() => setAPIStore({ ...apiStore, coupons: coupons.filter((couponValue: any) => couponValue.couponcode !== coupon.couponcode) })} />
              </Tooltip>
            </Td>
          </Tr>)
          }
        </Tbody>
      </Table>
    </Box>
  </Stack >
};