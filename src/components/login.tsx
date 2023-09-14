import { useState } from "react";
import { API } from "../Network";

interface loginPageProps {
  setAdminPassword: React.Dispatch<React.SetStateAction<string>>;
  adminPassword: string;
  setAppConfig: React.Dispatch<React.SetStateAction<any | undefined>>;
  appConfig: any | undefined;
}

export const LoginPage = ({
  adminPassword,
  setAdminPassword,
  setAppConfig,
  appConfig,
}: loginPageProps) => {
  const [input, setInput] = useState("");

  const Login = async () => {
    const res = await API.Admin.getAppConfig(input);
    if (res) {
      setAdminPassword(input);
      setAppConfig(res);
    } else {
      //error message
    }
  };

  return (
    <div className="loginPage">
      <div className="loginForm">
        <div className="button-div-login">
          <input
            placeholder="סיסמה"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="password"
            className="password-input"
          />
        </div>
        <div className="button-div-login">
          <button className="button-login" onClick={Login}>
            שלח
          </button>
        </div>
      </div>
    </div>
  );
};
