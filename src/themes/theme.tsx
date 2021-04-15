import theme from "@chakra-ui/theme";
import customColors from "./colors";

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    ...customColors,
  },
  fonts: {
    ...theme.fonts,
    body: '"Inter", sans-serif',
    heading: '"Inter", sans-serif',
  },
};

export default customTheme;