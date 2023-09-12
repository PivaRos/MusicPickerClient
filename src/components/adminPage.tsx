import { useState } from "react";
import { API } from "../Network";
import { LoginPage } from "./login";

export const AdminPage = () => {
  const [adminPassword, setAdminPassword] = useState("");
  const [appConfig, setAppConfig] = useState();

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
      {appConfig && <div className="adminPage"></div>}
    </div>
  );
};
