import type { DefaultTheme } from "vitepress";
import frameworkDesign from "./sidebar/frameworkDesign";
import projectConstruction from "./sidebar/projectConstruction";
import reactivity from "./sidebar/reactivity";
import runtime from "./sidebar/runtime";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/framework-design/": frameworkDesign,
  "/project-construction/": projectConstruction,
  "/reactivity/": reactivity,
  "/runtime/": runtime,
};
