'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const formSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  fatherName: z.string().min(3, 'Father\'s name is required'),
  address: z.string().min(10, 'Full address is required'),
  contactNo: z.string().regex(/^03\d{9}$/, 'Must be a valid Pakistani mobile number (03xxxxxxxxx)'),
  cnicNo: z.string().regex(/^\d{5}-\d{7}-\d$/, 'Must be a valid CNIC (xxxxx-xxxxxxx-x)'),
  email: z.string().email('Please enter a valid email address'),
  photo: z
    .any()
    .refine((files) => files?.length == 1, 'A photo is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
});

export type AdmitCardData = z.infer<typeof formSchema> & { photoDataUrl: string };

type AdmitCardFormProps = {
  onSubmit: (data: AdmitCardData) => void;
};

const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export function AdmitCardForm({ onSubmit }: AdmitCardFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        fullName: '',
        fatherName: '',
        address: '',
        contactNo: '',
        cnicNo: '',
        email: '',
    },
  });

  const fileRef = form.register('photo');

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
        const photoFile = values.photo[0];
        const photoDataUrl = await fileToDataUri(photoFile);
        onSubmit({ ...values, photoDataUrl });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Richard Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                    <Input placeholder="e.g. 123 Main St, Anytown" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact No.</FormLabel>
                  <FormControl>
                    <Input placeholder="03xxxxxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnicNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNIC No.</FormLabel>
                  <FormControl>
                    <Input placeholder="xxxxx-xxxxxxx-x" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="e.g. john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Your Photo</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" {...fileRef} />
                    </FormControl>
                    <FormDescription>
                        Please upload a clear, passport-style photo.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
        
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Admit Card
        </Button>
      </form>
    </Form>
  );
}
