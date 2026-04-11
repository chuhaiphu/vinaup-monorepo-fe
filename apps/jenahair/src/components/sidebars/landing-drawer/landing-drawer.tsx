import { getAllMenusActionPublic } from "@/actions/menu-action";
import { getAllTourCategoriesActionPublic } from "@/actions/tour-category-action";
import LandingDrawerContainer from "./landing-drawer-container";

export default async function LandingDrawer() {
  const [menusResponse, tourCategoriesResponse] = await Promise.all([
    getAllMenusActionPublic(),
    getAllTourCategoriesActionPublic(),
  ]);

  return (
    <LandingDrawerContainer
      menusData={menusResponse.data ?? []}
      tourCategoriesData={tourCategoriesResponse.data ?? []}
    />
  );
}
