import { IDiaryResponse } from '@/interfaces/diary-interface';
import { OverlayCard } from '@vinaup/ui/landing';

interface DiaryItemProps {
  item: {
    id: string;
    title: string;
    mainImageUrl: string | null;
    description: string | null;
    endpoint: string;
    diaryCategoryDiaries: IDiaryResponse['diaryCategoryDiaries'];
    createdAt: Date;
    createdBy: IDiaryResponse['createdBy'];
  };
}

export default function DiaryItem({ item }: DiaryItemProps) {
  return (
    <OverlayCard
      title={item.title}
      src={item.mainImageUrl || '/images/image-placeholder.png'}
    />
  );
}
