import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/PricingCard";
import { FeatureCard } from "@/components/FeatureCard";
import { FloatingElements } from "@/components/FloatingElements";
import { Sparkles, ArrowRight, Scan } from "lucide-react";
import heroImage from "@/assets/hero-ar-room.jpg";
import arFeatureIcon from "@/assets/ar-feature-icon.jpg";
import catalogFeatureIcon from "@/assets/catalog-feature-icon.jpg";
import cloudFeatureIcon from "@/assets/cloud-feature-icon.jpg";

const Index = () => {
  const pricingPlans = [
    {
      name: "Professional Studio",
      price: "$2,399",
      period: "year",
      description: "Complete professional 3D design and game development platform",
      features: [
        "8K Resolution Output",
        "Game Development Engine",
        "Advanced 3D Modeling",
        "Material Editor",
        "Model Import/Export (FBX, OBJ, GLTF)",
        "AI Design Assistant",
        "Real-time Ray Tracing",
        "Physics Simulation",
        "Animation Tools",
        "Unlimited Cloud Storage",
        "Priority Support",
        "30-Day Free Trial"
      ],
      highlighted: true,
      ctaText: "Start 30-Day Free Trial"
    },
    {
      name: "Enterprise Studio",
      price: "$9,999",
      period: "year",
      description: "Ultimate power for AAA game studios and professional teams",
      features: [
        "Everything in Professional",
        "AAA Game Development Tools",
        "Advanced AI Code Generation",
        "Multi-user Collaboration",
        "Custom Shader Editor",
        "Motion Capture Integration",
        "Procedural Generation Tools",
        "Advanced Physics Engine",
        "Dedicated Account Manager",
        "Custom Training Sessions",
        "SLA Guarantee",
        "White Label Options"
      ],
      ctaText: "Contact Sales"
    }
  ];

  const features = [
    {
      icon: arFeatureIcon,
      title: "8K Rendering",
      description: "Ultra-high resolution rendering with real-time ray tracing and advanced lighting"
    },
    {
      icon: catalogFeatureIcon,
      title: "Game Development",
      description: "Full game engine with physics, scripting, and deployment to all platforms"
    },
    {
      icon: cloudFeatureIcon,
      title: "AI-Powered Tools",
      description: "Intelligent design assistance, asset generation, and workflow automation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <FloatingElements />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/30 shadow-lg shadow-primary/20 backdrop-blur-sm">
                  Professional 3D Design & Game Development Studio
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Create Stunning
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(var(--primary),0.5)]">
                  3D Worlds & Games
                </span>
                Like Never Before
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Industry-leading 3D design and AAA game development platform. 
                AI-powered tools, 8K rendering, real-time ray tracing, and everything you need 
                to compete with Unreal Engine 5.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group text-lg h-14 px-8 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                  onClick={() => window.location.href = '/auth'}
                >
                  <Scan className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Start 30-Day Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg h-14 px-8 border-primary/20 hover:border-primary/40 backdrop-blur-sm"
                >
                  Watch Demo
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20 backdrop-blur-sm hover:bg-primary/10 transition-all">
                  <div className="text-3xl font-bold text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">8K</div>
                  <div className="text-sm text-muted-foreground">Resolution</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/5 border border-secondary/20 backdrop-blur-sm hover:bg-secondary/10 transition-all">
                  <div className="text-3xl font-bold text-secondary drop-shadow-[0_0_15px_rgba(var(--secondary),0.5)]">AAA</div>
                  <div className="text-sm text-muted-foreground">Game Dev</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20 backdrop-blur-sm hover:bg-primary/10 transition-all">
                  <div className="text-3xl font-bold text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">AI</div>
                  <div className="text-sm text-muted-foreground">Powered</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 blur-3xl animate-pulse" />
              <img 
                src={heroImage}
                alt="3D Design Studio Visualization"
                className="relative rounded-2xl shadow-2xl border border-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to design, visualize, and perfect your interior spaces
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-b from-background via-secondary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Professional Plans
              <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Billed Annually
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry-leading tools with yearly pricing and 30-day free trial on all plans
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                highlighted={plan.highlighted}
                ctaText={plan.ctaText}
              />
            ))}
          </div>
          
          <p className="text-center mt-12 text-muted-foreground">
            All plans include a 30-day free trial. No credit card required to start.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 rounded-3xl p-12 md:p-16 text-center space-y-8 border border-primary/30 shadow-2xl shadow-primary/20 backdrop-blur-xl">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Create
              <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(var(--primary),0.5)]">
                AAA-Quality Content?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join professionals using the most advanced 3D design and game development platform. 
              Start your 30-day free trial today—no credit card required.
            </p>
            <Button 
              size="lg" 
              className="text-lg h-14 px-12 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
              onClick={() => window.location.href = '/auth'}
            >
              <Scan className="w-6 h-6 mr-2" />
              Start 30-Day Free Trial
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">NexusDecor</span>
            </div>
            
            <p className="text-sm text-muted-foreground font-mono">
              © 2025 NexusDecor. Powered by AR innovation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
