"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Image as ImageIcon, Loader2, MapPin, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { reportNewIssue } from '@/lib/actions';

export function ReportIssueDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(photo);
    } else {
      setPhotoPreview(null);
    }
  }, [photo]);

  const handleGetLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocating(false);
          toast({ title: "Success", description: "Location captured." });
        },
        () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Unable to retrieve your location. Please enable location services.",
          });
          setIsLocating(false);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Geolocation is not supported by your browser.",
      });
      setIsLocating(false);
    }
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPhoto(null);
    setPhotoPreview(null);
    setLocation(null);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill out the title, description, and capture your location.",
      });
      return;
    }
    setIsSubmitting(true);
    
    // In a real app, you would upload the photo to a storage service
    // and get back a URL. For this demo, we'll just use a placeholder.
    const result = await reportNewIssue({
        title,
        description,
        location,
        status: 'Reported',
        imageUrl: photoPreview ?? undefined
    });

    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Issue Reported!",
        description: "Your report has been submitted for review. Thank you!",
      });
      setOpen(false);
      resetForm();
    } else {
       toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was a problem submitting your report. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2" />
          Report New Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Report a New Issue</DialogTitle>
            <DialogDescription>
              Help improve your city by reporting problems. Please provide as much detail as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="e.g., Deep Pothole on Main St" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Provide details about the issue..." value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label>Photo</Label>
              <Input id="photo" type="file" accept="image/*" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
              <Label htmlFor="photo" className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                {photoPreview ? (
                  <Image src={photoPreview} alt="Preview" width={128} height={128} className="h-full w-auto object-contain" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="mx-auto h-8 w-8 mb-2" />
                    <p>Click to upload a photo</p>
                  </div>
                )}
              </Label>
            </div>
             <div className="grid gap-2">
              <Label>Location</Label>
              <Button type="button" variant="outline" onClick={handleGetLocation} disabled={isLocating}>
                {isLocating ? <Loader2 className="mr-2 animate-spin" /> : <MapPin className="mr-2" />}
                {location ? `Location Captured (${location.lat.toFixed(4)}, ${location.lng.toFixed(4)})` : 'Get Current Location'}
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
              Submit Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
