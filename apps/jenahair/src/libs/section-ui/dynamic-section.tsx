import { getSectionUIByPositionActionPublic } from '@/actions/section-ui-action';
import { SECTION_REGISTRY } from './section-registry';

interface DynamicSectionProps {
  position: number;
}

export default async function DynamicSection({ position }: DynamicSectionProps) {
  const response = await getSectionUIByPositionActionPublic(position);

  if (!response.success || !response.data) {
    return null;
  }

  const dynamicSectionUI = response.data;

  // Use componentKey (immutable) for component lookup
  const componentKey = dynamicSectionUI.sectionUICredentials?.componentKey;

  if (!componentKey) {
    return null;
  }

  const Component = SECTION_REGISTRY[componentKey];

  if (!Component) {
    console.warn(`No component found for componentKey: ${componentKey}`);
    return null;
  }

  const props = dynamicSectionUI.properties || {};

  return <Component {...props} />;
}
