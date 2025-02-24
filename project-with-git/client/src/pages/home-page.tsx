import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Community } from "@shared/schema";
import CommunityCard from "@/components/community/community-card";
import MatchList from "@/components/matches/match-list";
import { Users, Search, BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function HomePage() {
  const { user } = useAuth();
  const { data: communities } = useQuery<Community[]>({ queryKey: ["/api/communities"] });

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.fullName}</h1>
          <p className="text-muted-foreground">Find your perfect co-living community</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <QuickAction
          icon={<Users className="h-6 w-6" />}
          title="Browse Communities"
          description="Explore active co-living communities"
          href="/community"
        />
        <QuickAction
          icon={<Search className="h-6 w-6" />}
          title="Find Members"
          description="Connect with potential housemates"
          href="/community"
        />
        <QuickAction
          icon={<BookOpen className="h-6 w-6" />}
          title="Resources"
          description="Learn about co-living best practices"
          href="/resources"
        />
      </div>

      <div className="grid gap-8 mt-8 lg:grid-cols-2">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Featured Communities</h2>
          <div className="space-y-4">
            {communities?.slice(0, 2).map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">AI-Powered Matches</h2>
          <MatchList />
        </section>
      </div>
    </div>
  );
}

function QuickAction({ icon, title, description, href }: { icon: React.ReactNode; title: string; description: string; href: string }) {
  return (
    <Link href={href}>
      <a>
        <Card className="transition-colors hover:bg-muted/50">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              {icon}
            </div>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}