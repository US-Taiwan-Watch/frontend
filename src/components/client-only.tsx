import * as React from "react";

export const ClientOnly: React.FC = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? <>{children}</> : null;
};
