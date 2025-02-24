import { useQuery } from "@tanstack/react-query";
import { Community, User } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityCard from "@/components/community/community-card";
import ProfileCard from "@/components/profiles/profile-card";
import { Search, Users, UserPlus } from "lucide-react";
import { useState } from "react";

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: communities } = useQuery<Community[]>({ 
    queryKey: ["/api/communities"]
  });
  
  const { data: users } = useQuery<User[]>({ 
    queryKey: ["/api/users"]
  });

  const filteredCommunities = communities?.filter(community => 
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users?.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Find Your Community</h1>
            <p className="text-muted-foreground">Connect with like-minded individuals and communities</p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Create Community
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search communities and members..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="communities" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="communities" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Communities
            </TabsTrigger>
            <TabsTrigger value="members" className="w-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="communities" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCommunities?.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
              {filteredCommunities?.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No communities found matching your search.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="members" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredUsers?.map((user) => (
                <ProfileCard key={user.id} user={user} />
              ))}
              {filteredUsers?.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No members found matching your search.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
