import { Loading } from "@nextui-org/react";
import React from "react";
import { useEffect, useState, ReactNode } from "react";

// Component to render children only on the client side
// This is needed for Apollo client-side requests
const ClientOnly = (props: { children: ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return <Loading />;

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default ClientOnly;
