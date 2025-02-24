import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, FileText, Users, Coins, Scale, Home } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Center</h1>
          <p className="text-muted-foreground">Learn about co-living and community building</p>
        </div>
      </div>

      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="getting-started" className="w-full">
            <Book className="h-4 w-4 mr-2" />
            Getting Started
          </TabsTrigger>
          <TabsTrigger value="legal" className="w-full">
            <Scale className="h-4 w-4 mr-2" />
            Legal
          </TabsTrigger>
          <TabsTrigger value="financial" className="w-full">
            <Coins className="h-4 w-4 mr-2" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="community" className="w-full">
            <Users className="h-4 w-4 mr-2" />
            Community
          </TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceCard
              icon={<Home className="h-6 w-6" />}
              title="Co-Living Basics"
              description="Learn the fundamentals of co-living arrangements and what to expect."
              articles={[
                "What is Co-Living?",
                "Benefits of Shared Living",
                "Common Challenges and Solutions",
                "Finding the Right Community"
              ]}
            />
            <ResourceCard
              icon={<FileText className="h-6 w-6" />}
              title="Getting Started Guide"
              description="Step-by-step guide to beginning your co-living journey."
              articles={[
                "Assessing Your Needs",
                "Setting Expectations",
                "Timeline Planning",
                "First Steps Checklist"
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="legal" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceCard
              icon={<Scale className="h-6 w-6" />}
              title="Legal Structures"
              description="Understanding different legal frameworks for co-living arrangements."
              articles={[
                "Types of Legal Entities",
                "LLC vs Cooperative",
                "Member Agreements",
                "Liability Protection"
              ]}
            />
            <ResourceCard
              icon={<FileText className="h-6 w-6" />}
              title="Document Templates"
              description="Essential legal documents for co-living communities."
              articles={[
                "Member Agreements",
                "House Rules Template",
                "Conflict Resolution Process",
                "Exit Procedures"
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceCard
              icon={<Coins className="h-6 w-6" />}
              title="Financial Planning"
              description="Tools and guides for managing community finances."
              articles={[
                "Budgeting Basics",
                "Shared Expenses",
                "Investment Models",
                "Financial Policies"
              ]}
            />
            <ResourceCard
              icon={<Home className="h-6 w-6" />}
              title="Property Acquisition"
              description="Guide to finding and securing property for co-living."
              articles={[
                "Property Search Tips",
                "Financing Options",
                "Due Diligence",
                "Purchase Process"
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="community" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceCard
              icon={<Users className="h-6 w-6" />}
              title="Community Building"
              description="Creating strong and sustainable communities."
              articles={[
                "Building Trust",
                "Communication Guidelines",
                "Decision Making",
                "Conflict Resolution"
              ]}
            />
            <ResourceCard
              icon={<FileText className="h-6 w-6" />}
              title="Governance Models"
              description="Different approaches to community governance."
              articles={[
                "Types of Governance",
                "Creating Policies",
                "Role Distribution",
                "Meeting Facilitation"
              ]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResourceCard({ 
  icon, 
  title, 
  description, 
  articles 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  articles: string[] 
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            {icon}
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <ul className="space-y-2">
            {articles.map((article, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                <span className="text-sm">{article}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
