import { ClaimCustomPrizeForm } from '../../rewards/components/claim-custom-prize-form/claim-custom-prize-form';
import { ClaimCustomPrizeTable } from '../../rewards/components/claim-custom-prize-table/claim-custom-prize-table';
import { CustomPrizeForm } from '../../rewards/components/custom-prize-form/custom-prize-form';
import { CustomPrizeTable } from '../../rewards/components/custom-prize-table/custom-prize-table';
import { CustomPrizesWinnersTable } from '../../rewards/components/custom-prizes-winners-table/custom-prize-winners-table';
import { DefaultRewardValues } from '../../rewards/components/default-reward/default-reward-values';
import { FormMode } from '../types/form-mode.enum';
import { Login } from '../../access-control/components/login/login';
import { Navigate } from 'react-router-dom';
import { PartnerForm } from '../../partners/components/partner-form';
import { PartnersTable } from '../../partners/components/partners-table';
import { RewardConfigTable } from '../../rewards/components/reward-config-table/reward-config-table';
import { RewardConfigForm } from '../../rewards/components/reward-config-form/reward-config-form';
import { Route } from '../types/route';
import { SendRewardForm } from '../../rewards/components/send-reward/send-reward-form';
import { VerifySignatureForm } from '../../rewards/components/verify-signature-form/verify-signature-form';
import { ResetPasswordForm } from '../../users/components/reset-password-form';

export const routes: Route[] = [
  { path: '/claim-processes', element: <ClaimCustomPrizeTable /> },
  {
    path: '/claim-processes/create',
    element: <ClaimCustomPrizeForm mode={FormMode.Create} />,
  },
  {
    path: '/claim-processes/edit/:id',
    element: <ClaimCustomPrizeForm mode={FormMode.Edit} />,
  },
  {
    path: '/claim-processes/view/:id',
    element: <ClaimCustomPrizeForm mode={FormMode.View} />,
  },
  {
    path: '/claim-processes/verify-signature',
    element: <VerifySignatureForm />,
  },
  { path: '/custom-prizes-winners', element: <CustomPrizesWinnersTable /> },
  { path: '/custom-prizes', element: <CustomPrizeTable /> },
  {
    path: '/custom-prizes/create',
    element: <CustomPrizeForm mode={FormMode.Create} />,
  },
  {
    path: '/custom-prizes/edit/:id',
    element: <CustomPrizeForm mode={FormMode.Edit} />,
  },
  {
    path: '/custom-prizes/view/:id',
    element: <CustomPrizeForm mode={FormMode.View} />,
  },
  { path: '/default-values', element: <DefaultRewardValues /> },
  { path: '/login', element: <Login />, page: true },
  { path: '/panel', element: <div>Welcome!</div> },
  { path: '/partners', element: <PartnersTable /> },
  { path: '/partners/create', element: <PartnerForm mode={FormMode.Create} /> },
  { path: '/partners/edit/:id', element: <PartnerForm mode={FormMode.Edit} /> },
  { path: '/partners/view/:id', element: <PartnerForm mode={FormMode.View} /> },
  {
    path: '/reward-configs',
    element: <RewardConfigTable />,
  },
  {
    path: '/reward-configs/create',
    element: <RewardConfigForm mode={FormMode.Create} />,
  },
  {
    path: '/reward-configs/edit/:id',
    element: <RewardConfigForm mode={FormMode.Edit} />,
  },
  {
    path: '/reward-configs/view/:id',
    element: <RewardConfigForm mode={FormMode.View} />,
  },
  { path: '/send-rewards', element: <SendRewardForm /> },
  { path: '/reset-password-by-address', element: <ResetPasswordForm /> },
  { path: '*', element: <Navigate to="/login" /> },
];
