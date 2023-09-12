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
  const Login = async (password: string) => {
    const res = await API.Admin.getAppConfig(password);
    if (res) {
      setAdminPassword(password);
      setAppConfig(res);
    } else {
      //error message
    }
  };

  return (
    <div className="loginPage">
      <div></div>
    </div>
  );
};
