import {
  getAllSectionUIsActionPublic,
  getUsedSectionUIPositionsActionPublic,
} from '@/actions/section-ui-action';
import AdminSectionUIDetailPageContentContainer from './admin-section-ui-detail-page-content-container/admin-section-ui-detail-page-content-container';

export default async function AdminSectionUIDetailPageContent() {
  // Get all existing DynamicSectionUIs
  const dynamicSectionUIsResponse = await getAllSectionUIsActionPublic();
  // Get all used positions
  const usedPositionsResponse = await getUsedSectionUIPositionsActionPublic();

  return (
    <AdminSectionUIDetailPageContentContainer
      existingDynamicSectionUIs={dynamicSectionUIsResponse.data ?? []}
      usedPositions={usedPositionsResponse.data ?? []}
    />
  );
}
