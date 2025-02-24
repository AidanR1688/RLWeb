import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Community } from "@shared/schema";
import { Users } from "lucide-react";

export default function CommunityCard({ community }: { community: Community }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{community.name}</CardTitle>
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {community.memberIds?.length || 0}/{community.maxMembers}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{community.description}</p>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Values</h4>
            <div className="flex flex-wrap gap-2">
              {community.values?.map((value) => (
                <Badge key={value} variant="outline">
                  {value}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{community.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Budget</p>
              <p className="text-sm text-muted-foreground">${community.budget}/month</p>
            </div>
          </div>

          <Button className="w-full">
            Join Community
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
