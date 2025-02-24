import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@shared/schema";

export default function ProfileCard({ user }: { user: User }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 p-6">
        <Avatar className="h-16 w-16">
          <AvatarFallback>
            {user.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{user.fullName}</h3>
          <p className="text-sm text-muted-foreground">{user.location}</p>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">About</h4>
            <p className="text-sm text-muted-foreground">{user.bio || "No bio yet"}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Community Themes</h4>
            <div className="flex flex-wrap gap-2">
              {user.communityThemes?.map((theme) => (
                <Badge key={theme} variant="secondary">
                  {theme}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium">Budget</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Monthly Rent: ${user.monthlyBudget || 'Not specified'}</p>
              <p>Downpayment: ${user.downpaymentBudget || 'Not specified'}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Preferences</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              {user.preferences.occupation && (
                <p>Occupation: {user.preferences.occupation}</p>
              )}
              <p>Age Range: {user.preferences.ageRange}</p>
              <p>Social Style: {user.preferences.socialStyle}</p>
              <p>Cleaning Habits: {user.preferences.cleaningHabits}</p>
              {user.preferences.petPreferences && (
                <p>Pets: {user.preferences.petPreferences}</p>
              )}
              {user.preferences.smokingPreference && (
                <p>Smoking: {user.preferences.smokingPreference}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}