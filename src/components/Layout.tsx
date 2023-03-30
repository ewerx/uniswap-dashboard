import {
  Navbar,
  Button,
  Switch,
  useTheme,
  Text,
  Spacer,
  styled,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { type ReactNode } from "react";
import { IoSunny, IoMoon, IoRefreshCircle, IoRefresh } from "react-icons/io5";
import { useRouter } from "next/router";

type LayoutProps = {
  children: ReactNode;
};

const Box = styled("div", {
  boxSizing: "border-box",
});

// Root layout and nav bar
export default function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <Box>
      <Navbar maxWidth="fluid" isBordered>
        <Navbar.Brand>
          <Text h3>Uniswap Dashboard</Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Button
            auto
            icon={<IoRefresh />}
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
          <Switch
            id="theme-switch"
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            size="xl"
            checked={isDark}
            iconOn={<IoMoon />}
            iconOff={<IoSunny />}
          />
        </Navbar.Content>
      </Navbar>
      <Spacer y={1} />
      {children}
    </Box>
  );
}
