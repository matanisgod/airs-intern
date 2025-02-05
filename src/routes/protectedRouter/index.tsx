import React, { useMemo } from "react";

import { useKeycloak } from "@react-keycloak/web";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const kc = useKeycloak();
  const location = useLocation();

  const isAuthenticated: boolean = useMemo(() => {
    return kc.keycloak.authenticated || false;
  }, [kc.keycloak.authenticated]);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={{ pathname: "/", search: location.search }}
      state={{ from: location }}
    />
  );
};
