import { getAdmitCardVisibility } from '@/ai/flows/admit-card-visibility';
import { redirect } from 'next/navigation';
import { AdmitCardClient } from './AdmitCardClient';

export default async function AdmitCardPage() {
    const isVisible = await getAdmitCardVisibility();

    if (!isVisible) {
        redirect('/');
    }

    return <AdmitCardClient />;
}
