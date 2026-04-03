import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, LogOut, Sparkles, Loader2, Palette } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Profile {
  full_name: string;
  subscription_tier: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  room_type: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadUserData(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadUserData = async (userId: string) => {
    try {
      // Load profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, subscription_tier')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Load projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;
      setProjects(projectsData || []);
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load your data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error: any) {
      console.error('Signout error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'creator':
        return 'bg-gradient-to-r from-primary to-accent text-primary-foreground';
      case 'studio':
        return 'bg-gradient-to-r from-accent to-primary text-primary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">NexusDecor</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {profile?.full_name || user?.email}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-mono font-semibold ${getTierBadgeColor(profile?.subscription_tier || 'starter')}`}>
              {profile?.subscription_tier?.toUpperCase() || 'STARTER'}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/products")}
            >
              Browse Products
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">Your Projects</h2>
            <p className="text-muted-foreground">Design, save, and manage your AR room projects</p>
          </div>
          
          <Button 
            size="lg"
            onClick={() => navigate("/design-studio")}
            className="group bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/50 transition-all"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            New Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card className="border-dashed border-2 border-border/50">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Palette className="w-16 h-16 text-muted-foreground mb-4 animate-float" />
              <h3 className="text-2xl font-bold mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Start your first AR interior design project and bring your vision to life
              </p>
              <Button 
                size="lg"
                onClick={() => navigate("/design-studio")}
                className="bg-gradient-to-r from-primary to-accent"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={project.id}
                className="group hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(`/design-studio?project=${project.id}`)}
              >
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription>
                    {project.room_type && (
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-mono mb-2">
                        {project.room_type}
                      </span>
                    )}
                    <p className="text-sm mt-2">{project.description || 'No description'}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Created {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
