import { curiositiesAdmin, curiositiesPublic, curiositiesUser } from "./mockCuriosities";

export function getCuriosities(role?: "public" | "user" | "admin") {
  switch (role) {
    case "admin":
      return curiositiesAdmin;
    case "user":
      return curiositiesUser;
    default:
      return curiositiesPublic;
  }
}

