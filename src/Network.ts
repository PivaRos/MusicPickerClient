import axios from "axios";
import { HOST } from "./envVars";

export const API = {
  Admin: {
    getAppConfig: async (adminPassword: string) => {
      const result = await axios(HOST + "/admin/appConfig", {
        headers: {
          "Content-Type": "application/json",
          Authorization: adminPassword,
        },
        method: "get",
        validateStatus: () => true,
      });
      if (result.status === 200) return result.data;
      else {
      }
    },
    changeMinutes: async (adminPassword: string, newMinutes: number) => {
      const result = await axios(HOST + "/admin/minutes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: adminPassword,
        },
        method: "put",
        validateStatus: () => true,
        data: JSON.stringify({ minutes: newMinutes }),
      });
      if (result.status === 200) return true;
      return false;
    },
    changeAdminPassword: async (
      adminPassword: string,
      newAdminPassword: string
    ) => {
      const result = await axios(HOST + "/admin/password", {
        headers: {
          "Content-Type": "application/json",
          Authorization: adminPassword,
        },
        method: "put",
        validateStatus: () => true,
        data: JSON.stringify({ password: newAdminPassword }),
      });

      if (result.status === 200) return true;
      return false;
    },
    changeGenres: async (adminPassword: string, genres: string[]) => {
      const result = await axios(HOST + "/admin/genres", {
        headers: {
          "Content-Type": "application/json",
          Authorization: adminPassword,
        },
        method: "put",
        validateStatus: () => true,
        data: JSON.stringify({ genres: genres }),
      });

      if (result.status === 200) return true;
      return false;
    },
    setAppConfig: async (adminPassword: string, appConfig: any) => {
      const result = await axios(HOST + "/admin/appConfig", {
        headers: {
          "Content-Type": "application/json",
          Authorization: adminPassword,
        },
        method: "put",
        validateStatus: () => true,
        data: JSON.stringify({ appConfig: appConfig }),
      });

      if (result.status === 200) return true;
      return false;
    },
  },
};
