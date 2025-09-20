import { AppHeader } from '@/components/app/header';
import { IssueList } from '@/components/app/issue-list';
import { mockIssues } from '@/lib/mock-data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapPin } from 'lucide-react';
import type { Issue, IssueStatus } from '@/lib/types';
import { AppFooter } from '@/components/app/footer';

// This is a simplified function to convert lat/lng to a percentage-based position.
// In a real application, you'd use a more robust projection or a mapping service.
const getPinPosition = (issue: Issue) => {
  // Define an approximate bounding box for the placeholder map image.
  const mapBounds = {
    top: 34.10,
    bottom: 34.00,
    left: -118.30,
    right: -118.20,
  };

  const lat = issue.location.lat;
  const lng = issue.location.lng;

  // Clamp coordinates to bounds to prevent pins from going off-map
  const clampedLat = Math.max(mapBounds.bottom, Math.min(mapBounds.top, lat));
  const clampedLng = Math.max(mapBounds.left, Math.min(mapBounds.right, lng));

  const latRange = mapBounds.top - mapBounds.bottom;
  const lngRange = mapBounds.right - mapBounds.left;

  // Calculate position as a percentage and add a larger random jitter
  const topPercent = ((mapBounds.top - clampedLat) / latRange) * 100 + (Math.random() - 0.5) * 10;
  const leftPercent = ((clampedLng - mapBounds.left) / lngRange) * 100 + (Math.random() - 0.5) * 10;

  return { top: `${topPercent}%`, left: `${leftPercent}%` };
};

const getPinClassName = (status: IssueStatus) => {
    switch (status) {
        case 'Reported':
            return 'text-blue-500 fill-blue-500/50';
        case 'Acknowledged':
            return 'text-yellow-500 fill-yellow-500/50';
        case 'In-Progress':
            return 'text-purple-500 fill-purple-500/50';
        case 'Resolved':
            return 'text-green-500 fill-green-500/50';
        default:
            return 'text-primary fill-primary/50';
    }
}


export default function Home() {
  const mapPlaceholder = PlaceHolderImages.find(p => p.id === 'map-placeholder');

  return (
    <div className="min-h-screen w-full flex flex-col">
      <AppHeader />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <section className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
              Community Issue Map
            </h2>
            <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
              View recently reported issues in your area. Pins indicate issue locations.
            </p>
            <div className="relative w-full aspect-[16/7] bg-muted rounded-xl flex items-center justify-center overflow-hidden border">
              {mapPlaceholder && (
                <>
                  <Image
                    src={mapPlaceholder.imageUrl}
                    alt={mapPlaceholder.description}
                    width={1200}
                    height={500}
                    className="object-cover w-full h-full"
                    data-ai-hint={mapPlaceholder.imageHint}
                    priority
                  />
                  {mockIssues.map(issue => {
                    const position = getPinPosition(issue);
                    const pinClassName = getPinClassName(issue.status);
                    return (
                      <div
                        key={issue.id}
                        className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300 hover:scale-125"
                        style={{ top: position.top, left: position.left }}
                        title={`${issue.title} - ${issue.status}`}
                      >
                        <MapPin className={`h-8 w-8 stroke-width-1.5 ${pinClassName}`} />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">
              Issue Dashboard
            </h2>
            <IssueList initialIssues={mockIssues} />
          </section>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
