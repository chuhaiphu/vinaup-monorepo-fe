import { getAllMenusActionPublic } from "@/actions/menu-action";
import { getAllTourCategoriesActionPublic } from "@/actions/tour-category-action";
import DrawerContainer from "./landing-drawer-container";

export default async function Drawer() {
  const [menusResponse, tourCategoriesResponse] = await Promise.all([
    getAllMenusActionPublic(),
    getAllTourCategoriesActionPublic(),
  ]);

  return (
    <DrawerContainer
      menusData={menusResponse.data ?? []}
      tourCategoriesData={tourCategoriesResponse.data ?? []}
    />
  );
}
