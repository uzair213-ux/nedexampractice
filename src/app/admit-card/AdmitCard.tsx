'use client';

import { useRef, useState, useEffect } from 'react';
import type { AdmitCardData } from './AdmitCardForm';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import Image from 'next/image';

type AdmitCardProps = {
  data: AdmitCardData;
};

export function AdmitCard({ data }: AdmitCardProps) {
  const admitCardRef = useRef<HTMLDivElement>(null);
  const [cardDetails, setCardDetails] = useState<{ serialNo: string; rollNo: number; barcodeId: string; department: string; } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Generate random values only on the client side to avoid hydration mismatch
    const departments = ['CIS', 'CED', 'TED', 'MED', 'EED'];
    setCardDetails({
      serialNo: `2600${Math.floor(1000 + Math.random() * 9000)}`,
      rollNo: Math.floor(30000 + Math.random() * 10000),
      barcodeId: `*${Math.random().toString(36).substring(2, 11).toUpperCase()}*`,
      department: departments[Math.floor(Math.random() * departments.length)],
    });
  }, []);

  const handleDownload = async () => {
    const element = admitCardRef.current;
    if (!element) return;

    setIsDownloading(true);

    // Dynamically import libraries to ensure they are only loaded on the client
    const { default: jsPDF } = await import('jspdf');
    const { default: html2canvas } = await import('html2canvas');

    const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProperties = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('admit-card.pdf');
    setIsDownloading(false);
  };

  if (!cardDetails) {
    return (
        <div className="flex items-center justify-center min-h-[500px] bg-muted rounded-lg">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Download as PDF
        </Button>
      </div>

      <div ref={admitCardRef} className="bg-white p-6 border shadow-lg text-black max-w-[816px] mx-auto font-serif text-xs">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <Image src="https://www.neduet.edu.pk/sites/default/files/NEDUET-Logo.png" alt="NEDUET Logo" width={80} height={80} />
          <div className="text-center">
            <h1 className="font-bold text-base tracking-wide">NED UNIVERSITY OF ENGINEERING AND TECHNOLOGY</h1>
            <p className="text-sm">University Road Karachi-75270</p>
            <h2 className="font-bold text-sm mt-2">PRE-ADMISSION ENTRY TEST 2025</h2>
            <p>Undergraduate Programmes</p>
          </div>
          <div className="w-[80px]"></div>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="col-span-2">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <p><span className="font-bold">Serial No. :</span> {cardDetails.serialNo}</p>
                    <p className="mt-2"><span className="font-bold">Test Attempt No. :</span> 02</p>
                </div>
                <div className='text-center -ml-16'>
                    <h3 className="font-bold text-base">ADMIT CARD</h3>
                    <p className='font-bold'>(Candidate's Copy)</p>
                </div>
            </div>
            
            <div className="border-2 border-black p-1">
                <table className="w-full">
                    <tbody>
                        <tr><td className="font-bold pr-2 w-32 align-top">Name:</td><td className='font-mono font-bold'>{data.fullName.toUpperCase()}</td></tr>
                        <tr><td className="font-bold pr-2 align-top">Father's Name:</td><td className='font-mono font-bold'>{data.fatherName.toUpperCase()}</td></tr>
                        <tr><td className="font-bold pr-2 align-top">Address:</td><td className='font-mono font-bold'>{data.address.toUpperCase()}</td></tr>
                        <tr><td className="font-bold pr-2 align-top">Contact No.:</td><td className='font-mono font-bold'>{data.contactNo}</td></tr>
                        <tr><td className="font-bold pr-2 align-top">CNIC No.:</td><td className='font-mono font-bold'>{data.cnicNo}</td></tr>
                    </tbody>
                </table>
                <div className="flex flex-col items-center mt-1">
                    <Image src="https://placehold.co/200x30.png" alt="barcode" width={200} height={30} data-ai-hint="barcode" />
                    <p className="font-mono">{cardDetails.barcodeId}</p>
                </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="col-span-1 -mt-4">
            <div className="border-2 border-black p-1.5 text-left text-[10px] leading-tight">
                <p><span className="font-bold">Group:</span> {cardDetails.department}</p>
                <p><span className="font-bold">Studied:</span> Physics</p>
                <p className="mt-1"><span className="font-bold">Entry Test Roll#:</span> {cardDetails.rollNo}</p>
                <p><span className="font-bold">Place of Test:</span> Block B2 [CED*]</p>
                <p><span className="font-bold">Main Campus, NEDUET Karachi</span></p>
                <p className="mt-1"><span className="font-bold">Test Date:</span> Sunday, Jul 13, 2025</p>
                <p><span className="font-bold">Test Time:</span> 4:30 p.m. to 6:30 p.m.</p>
                <p><span className="font-bold">Reporting Time:</span> 3:30 p.m.</p>
            </div>
            <div className="mt-2 w-[120px] h-[150px] mx-auto border-2 border-black flex items-center justify-center bg-gray-100">
                <Image src={data.photoDataUrl} alt="Student's Photo" width={120} height={150} className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
        
        {/* Tables Section */}
        <div className="mt-3">
            <table className="w-full border-collapse border-2 border-black mb-2">
                <tbody>
                    <tr>
                        <td className="border-r-2 border-black p-1 w-2/3 font-bold">Applied for Hafiz-e-Qura'an:</td>
                        <td className="p-1 text-center font-bold">NO</td>
                    </tr>
                </tbody>
            </table>
            <table className="w-full border-collapse border-2 border-black text-center text-[10px]">
                <thead>
                    <tr>
                        <th className="border-r-2 border-b-2 border-black p-1 font-bold">S.No.</th>
                        <th className="border-r-2 border-b-2 border-black p-1 font-bold">Categories</th>
                        <th className="border-r-2 border-b-2 border-black p-1 font-bold">S.No.</th>
                        <th className="border-b-2 border-black p-1 font-bold">Categories</th>
                    </tr>
                </thead>
                <tbody>
                    {[1,2,3,4,5].map(i => (
                        <tr key={i}>
                            <td className="border-r-2 border-black h-4">{i}</td>
                            <td className="border-r-2 border-black">{i === 1 ? 'R-3(e)' : '-'}</td>
                            <td className="border-r-2 border-black">{i+5}</td>
                            <td className="">-</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-1 text-[9px]">Note: '*' denotes that Admission under this category shall only be through respective nominating authority.</p>
        </div>

        {/* Signature Section */}
        <div className="flex justify-between mt-12">
            <div className="text-center">
                <p className="border-t-2 border-black pt-1 px-8">Candidate's Signature</p>
            </div>
             <div className="text-center">
                <p className="italic">Signature</p>
                <p className="border-t-2 border-black pt-1 px-8">Signature of University Official</p>
            </div>
        </div>

        {/* Footer Section */}
        <div className="mt-6 text-[11px]">
            <p>Schedule/Dates of the following will be made available at the University website [ <span className="font-bold">https://www.neduet.edu.pk/admission</span> ]</p>
            <ul className="list-disc list-inside mt-2 ml-4">
                <li><span className="font-bold">Open Day (for qualified candidates)</span></li>
                <li><span className="font-bold">Hafiz-e-Quraa'n Test (for qualified candidates)</span></li>
            </ul>
        </div>
        
        <div className="mt-3">
            <h4 className="font-bold underline">Instructions:</h4>
            <ol className="list-decimal list-inside text-[10px] space-y-0.5 mt-1">
                <li>It is mandatory for candidates to bring a valid photo ID along with the hard copy of their admit card.</li>
                <li>Programmable calculators, mobile phones and electronic gadgets are not allowed in the Pre-Admission Entry Test.</li>
                <li>This Admit Card will be used for all future correspondence.</li>
                <li>Location map of test blocks (computer lab) will be available on NED University website.</li>
            </ol>
        </div>

        <div className="mt-2 border-2 border-black p-1">
            <p className="font-bold text-[10px]">*CED - CIVIL ENGINEERING DEPARTMENT</p>
        </div>

      </div>
    </>
  );
}
