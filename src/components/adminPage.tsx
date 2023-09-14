import { useEffect, useState } from "react";
import { API } from "../Network";
import { LoginPage } from "./login";
import Dashboard from "./dashboard";

export const AdminPage = () => {
  const [adminPassword, setAdminPassword] = useState("");
  const [appConfig, setAppConfig] = useState();

  useEffect(() => {
    if (appConfig) {
      const interval = setInterval(async () => {
        const result = await API.Admin.getAppConfig(adminPassword);
        if (result) {
          setAppConfig(appConfig);
        } else {
          setAppConfig(undefined);
        }
      }, 1200);

      return () => clearInterval(interval);
    }
  }, [appConfig]);

  return (
    <div>
      {!appConfig && (
        <LoginPage
          appConfig={appConfig}
          setAppConfig={setAppConfig}
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
        />
      )}
      {appConfig && (
        <div className="adminPage">
          <Dashboard setData={setAppConfig} data={appConfig} />
        </div>
      )}
    </div>
  );
};
