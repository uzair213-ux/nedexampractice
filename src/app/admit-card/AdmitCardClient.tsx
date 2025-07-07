'use client';

import { useState } from 'react';
import { AdmitCardForm, type AdmitCardData } from './AdmitCardForm';
import { AdmitCard } from './AdmitCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Loader2 } from 'lucide-react';

export function AdmitCardClient() {
  const [admitCardData, setAdmitCardData] = useState<AdmitCardData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFormSubmit = (data: AdmitCardData) => {
    setIsProcessing(true);
    // Simulate a short processing time
    setTimeout(() => {
      setAdmitCardData(data);
      setIsProcessing(false);
    }, 3000); // 3 seconds 
  };
  
  return (
    <div className="container mx-auto py-10">
      {!admitCardData && !isProcessing && (
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <FileText className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="text-3xl font-headline">Generate Admit Card</CardTitle>
            <CardDescription className="text-lg">
              Please fill out the form below to generate your pre-admission entry test admit card.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdmitCardForm onSubmit={handleFormSubmit} />
          </CardContent>
        </Card>
      )}

      {isProcessing && (
        <div className="flex flex-col items-center justify-center text-center p-8 rounded-md bg-muted min-h-[300px]">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <p className="mt-4 text-xl font-semibold text-muted-foreground">Generating your admit card...</p>
          <p className="text-muted-foreground">This might take a moment. Please wait.</p>
        </div>
      )}

      {admitCardData && !isProcessing && <AdmitCard data={admitCardData} />}
    </div>
  );
}
