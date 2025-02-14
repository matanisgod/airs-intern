import { useRecoilValue } from 'recoil';

import { caseSetAtom } from '@/recoil/status';

export function CaseSetTable() {
  const caseSet = useRecoilValue(caseSetAtom);
  const caseSetTitleType = caseSet.map((item) => ({
    title: item.title,
    type: item.type,
  }));
  return caseSetTitleType;
}
