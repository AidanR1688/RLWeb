import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";

import Navbar from "@/components/navigation/navbar";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import ProfilePage from "@/pages/profile-page";
import CommunityPage from "@/pages/community-page";
import ResourcesPage from "@/pages/resources-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/" component={() => <ProtectedRoute component={HomePage} path="/" />} />
      <Route path="/profile" component={() => <ProtectedRoute component={ProfilePage} path="/profile" />} />
      <Route path="/community" component={() => <ProtectedRoute component={CommunityPage} path="/community" />} />
      <Route path="/resources" component={() => <ProtectedRoute component={ResourcesPage} path="/resources" />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen bg-background pt-16">
          <Router />
        </main>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;