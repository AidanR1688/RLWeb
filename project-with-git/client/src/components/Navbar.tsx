import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Home, Users, Book, UserCircle, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();

  if (!user || location === "/auth") return null;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="ghost" className="space-x-2">
                <Users className="h-4 w-4" />
                <span>Community</span>
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="ghost" className="space-x-2">
                <Book className="h-4 w-4" />
                <span>Resources</span>
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/profile">
              <Button variant="ghost" className="space-x-2">
                <UserCircle className="h-4 w-4" />
                <span>Profile</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="space-x-2 text-destructive"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
