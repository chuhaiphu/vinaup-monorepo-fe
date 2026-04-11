import { getAllToursActionPrivate } from "@/actions/tour-action";
import { getMeActionPrivate } from "@/actions/auth-action";
import { redirect } from "next/navigation";
import AdminTourPageContentContainer from "./admin-tour-page-content-container/admin-tour-page-content-container";

export default async function AdminTourPageContent() {
  const toursData = await getAllToursActionPrivate();
  const meResult = await getMeActionPrivate();

  if (!meResult.success || !meResult.data) {
    redirect('/login');
  }

  return (
    <AdminTourPageContentContainer
      toursData={toursData?.data ?? []}
      userData={meResult.data}
    />
  );
}
