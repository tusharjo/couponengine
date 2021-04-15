import { Box } from "@chakra-ui/layout";
import { Header } from "./common/header";
import { Footer } from "./common/footer";
import Route from "./route";

export default function Main() {
  return (
    <Box>
      <Header />
      <Route />
      <Footer />
    </Box>
  );
}