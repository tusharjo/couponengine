import { IconButton } from "@chakra-ui/button";
import { CopyIcon, EditIcon, SearchIcon, TimeIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Heading, Stack, Badge } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tag } from "@chakra-ui/tag";
import { Tooltip } from "@chakra-ui/tooltip";
import { RouteComponentProps } from "@reach/router";
import { useStorage } from "../../common/localStorage";

export const CouponDashboard = (_: RouteComponentProps) => {
  const { apiStore } = useStorage();

  console.log(apiStore, "api");

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
          <Tr>
            <Td>ABCDEF<span style={{ marginRight: "5px" }} />
              <Tooltip label="Copy Coupon Code" fontSize="md"><CopyIcon cursor="pointer" /></Tooltip>
            </Td>
            <Td>22-04-2021 to 23-04-2021</Td>
            <Td maxW="200">
              <Tag m="1">Domains</Tag>
              <Tag m="1">Cloud Hosting</Tag>
              <Tag m="1">Cloud Hosting</Tag>
            </Td>
            <Td><Badge variant="outline" colorScheme="orange">disabled</Badge></Td>
            <Td>21-04-2021</Td>
            <Td>
              <Tooltip label="Edit Coupon" fontSize="md">
                <IconButton aria-label="edit" size="sm" icon={<EditIcon />} mr="5" />
              </Tooltip>
              <Tooltip label="View Reports" fontSize="md">
                <IconButton aria-label="viewreports" size="sm" icon={<TimeIcon />} />
              </Tooltip>
            </Td>
          </Tr>
          <Tr>
            <Td>ABCDEF<span style={{ marginRight: "5px" }} />
              <Tooltip label="Copy Coupon Code" fontSize="md"><CopyIcon cursor="pointer" /></Tooltip>
            </Td>
            <Td>22-04-2021 to 23-04-2021</Td>
            <Td maxW="200">

              <Tag m="1">Domains</Tag>
              <Tag m="1">Cloud Hosting</Tag>
              <Tag m="1">Cloud Hosting</Tag>
            </Td>
            <Td><Badge variant="outline" colorScheme="red">Removed</Badge></Td>
            <Td>21-04-2021</Td>
            <Td>
              <Tooltip label="Edit Coupon" fontSize="md">
                <IconButton aria-label="edit" size="sm" icon={<EditIcon />} mr="5" />
              </Tooltip>
              <Tooltip label="View Reports" fontSize="md">
                <IconButton aria-label="viewreports" size="sm" icon={<TimeIcon />} />
              </Tooltip>
            </Td>
          </Tr>
          <Tr>
            <Td>ABCDEF<span style={{ marginRight: "5px" }} />
              <Tooltip label="Copy Coupon Code" fontSize="md"><CopyIcon cursor="pointer" /></Tooltip>
            </Td>
            <Td>22-04-2021 to 23-04-2021</Td>
            <Td maxW="200">

              <Tag m="1">Domains</Tag>
              <Tag m="1">Cloud Hosting</Tag>
              <Tag m="1">Cloud Hosting</Tag>
            </Td>
            <Td><Badge variant="outline" colorScheme="green">Active</Badge></Td>
            <Td>21-04-2021</Td>
            <Td>
              <Tooltip label="Edit Coupon" fontSize="md">
                <IconButton aria-label="edit" size="sm" icon={<EditIcon />} mr="5" />
              </Tooltip>
              <Tooltip label="View Reports" fontSize="md">
                <IconButton aria-label="viewreports" size="sm" icon={<TimeIcon />} />
              </Tooltip>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  </Stack >
};