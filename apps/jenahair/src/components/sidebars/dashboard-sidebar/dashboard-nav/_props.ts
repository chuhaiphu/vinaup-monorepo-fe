import { Route } from "next";

export interface NavItemProps {
  key: string;
  label: React.ReactNode;
  rightSection?: React.ReactNode;
  rightSectionActive?: React.ReactNode;
  path?: Route;
  childrens?: NavItemProps[];
  defaultOpened?: boolean;
  isRoot?: boolean;
}
