import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import ProfileCard from "@/components/profiles/profile-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Match {
  user: User;
  score: number;
}

export default function MatchList() {
  const { data: matches, isLoading, error } = useQuery<Match[]>({
    queryKey: ["/api/matches"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-[200px] w-full rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load matches</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {matches?.map(({ user, score }) => (
        <div key={user.id} className="relative">
          <div className="absolute right-4 top-4 z-10">
            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {Math.round(score * 100)}% Match
            </span>
          </div>
          <ProfileCard user={user} />
        </div>
      ))}
      {matches?.length === 0 && (
        <p className="text-center text-muted-foreground">No matches found</p>
      )}
    </div>
  );
}
