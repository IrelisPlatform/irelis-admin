import Cookies from "js-cookie";

export const appCookies = Cookies.withAttributes({
  path: "/",
  // sameSite: "Lax",
  /*   secure: true, */
});
