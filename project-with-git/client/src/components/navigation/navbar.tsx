import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Home, Users, User, BookOpen, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();

  if (!user) return null;

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <a className="flex items-center gap-2 font-semibold">
            <Users className="h-6 w-6" />
            <span>Co-Living</span>
          </a>
        </Link>

        <div className="flex items-center gap-6 ml-6">
          <NavLink href="/" icon={<Home className="h-4 w-4" />}>
            Home
          </NavLink>
          <NavLink href="/community" icon={<Users className="h-4 w-4" />}>
            Community
          </NavLink>
          <NavLink href="/profile" icon={<User className="h-4 w-4" />}>
            Profile
          </NavLink>
          <NavLink href="/resources" icon={<BookOpen className="h-4 w-4" />}>
            Resources
          </NavLink>
        </div>

        <div className="ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <a className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        {icon}
        {children}
      </a>
    </Link>
  );
}
