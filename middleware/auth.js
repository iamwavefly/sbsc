import Cookies from "js-cookie";
import Router from "next/router";
import localforage from "localforage";
import axios from "axios";

import { redirectBackToFundUser } from "./genUserRequest";
import { catchErrors, notifyErrorHandler } from "./catchErrors";
import { newToast } from "./genToast";
import baseUrl from "./baseUrl";

export const loginHandler = async (data) => {
  clearCacheHandler();
  const { next } = Router.query;
  localforage.setItem("user", { ...data });
  localforage.setItem("key", data.token);

  const tempToken = Cookies.get("token");
  if (tempToken) Cookies.remove("token");
  Cookies.set("token", data.token);

  axios.defaults.headers.common["Authorization"] = `bearer ${data.token}`;

  // console.log('new one', )
  // --- If the logged in email has a pending fund user request recently ---

  Router.push("/profile");
};

export const setSignUpToken = async (data) => {
  localforage.setItem("user", { ...data });
  localforage.setItem("key", data?.token);

  const tempToken = Cookies.get("token");
  if (tempToken) Cookies.remove("token");
  Cookies.set("token", data?.token);

  axios.defaults.headers.common["Authorization"] = `bearer ${data?.token}`;
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location).then((r) => {
      console.log("User redirected:", r);
    });
  }
};

export const clearCacheHandler = () => {
  Cookies.remove("token");
  localforage.removeItem("store");
  localforage.removeItem("user");
  localforage.removeItem("key");
};

export const logoutHandler = () => {
  clearCacheHandler();
  window.location = "/login";
};

export const censor = (censor) => {
  let i = 0;

  return function (key, value) {
    if (
      i !== 0 &&
      typeof censor === "object" &&
      typeof value == "object" &&
      censor == value
    )
      return "[Circular]";

    if (i >= 29)
      // serialize and clone maximum of 30 serialized objects or return unknown
      return "[Unknown]";

    ++i; // so we know we aren't using the original object anymore

    return value;
  };
};
