import {
  Navbar,
  Button,
  Loading,
  Switch,
  useTheme,
  Text,
  Spacer,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { type ReactNode } from "react";
import { IoSunny, IoMoon, IoRefreshCircle, IoRefresh } from "react-icons/io5";
import { Box } from "./styles/Box";
import { useRouter } from "next/router";

type LayoutProps = {
  children: ReactNode;
};

// const menuItems = [
//   { label: "Pools", href: "/orders", key: "orders" },
//   { label: "Tokens", href: "/tokens", key: "tokens" },
//   { label: "Transactions", href: "/transactions", key: "wallets" },
// ];

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <Box>
      <Navbar maxWidth="fluid" isBordered>
        {/* <Navbar.Content enableCursorHighlight variant="highlight">
          {menuItems.map((item) => (
            <Navbar.Link
              id={item.key}
              href={item.href}
              key={item.key}
              isActive={pathname === item.href}
            >
              {item.label}
            </Navbar.Link>
          ))}
        </Navbar.Content> */}
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
