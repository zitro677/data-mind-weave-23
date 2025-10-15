import { Database, GitBranch, MessageSquare, BookOpen, Cpu, Network, Camera, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WireframeCube from '@/components/WireframeCube';
import TypingText from '@/components/TypingText';
import ExpertiseCard from '@/components/ExpertiseCard';
import CodeHistoryApp from '@/components/CodeHistoryApp';

const Index = () => {
  const scrollToExpertise = () => {
    document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen grid-pattern relative flex items-center justify-center px-6">
        <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              Your Name
            </h1>
            
            <div className="space-y-2">
              <p className="text-xl text-muted-foreground">
                Information Scientist | AI Systems Architect
              </p>
              
              <TypingText 
                text="Bridging Data Repositories <> Intelligent Applications."
                className="text-lg text-accent"
              />
            </div>
            
            <Button
              onClick={scrollToExpertise}
              variant="outline"
              className="mt-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              Explore My Work
            </Button>
          </div>
          
          <div className="flex justify-center items-center">
            <WireframeCube />
          </div>
        </div>
      </section>

      {/* Expertise Matrix */}
      <section id="expertise" className="py-24 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">
            Core Domains
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <ExpertiseCard
              icon={<GitBranch size={48} strokeWidth={1.5} />}
              title="Open Science & Repositories"
              description="Structuring knowledge for global access and collaboration."
            />
            
            <ExpertiseCard
              icon={<Database size={48} strokeWidth={1.5} />}
              title="Data Science & Automation"
              description="Transforming raw data into efficient, automated workflows."
            />
            
            <ExpertiseCard
              icon={<MessageSquare size={48} strokeWidth={1.5} />}
              title="AI Application Development"
              description="Building conversational interfaces and intelligent agents."
            />
            
            <ExpertiseCard
              icon={<BookOpen size={48} strokeWidth={1.5} />}
              title="Academic Research"
              description="Authoring scientific papers grounded in information theory."
            />
          </div>
        </div>
      </section>

      {/* Technical Stack & Hobbies */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 border border-border p-12 cyber-border">
            {/* Professional Stack */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 text-accent">Build With:</h3>
              <div className="flex flex-wrap gap-4 items-center">
                {['Python', 'Flowise', 'N8N', 'Loveable'].map((tech, idx) => (
                  <span 
                    key={tech}
                    className="font-mono text-lg text-foreground relative"
                  >
                    {tech}
                    {idx < 3 && (
                      <span className="inline-block mx-3 text-accent">|</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent" />
            </div>
            
            {/* Creative Pursuits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 text-magenta">Explore With:</h3>
              <div className="flex gap-8 items-center">
                <div className="flex items-center gap-3">
                  <Plane size={32} className="text-magenta" strokeWidth={1.5} />
                  <span className="text-lg">Drone Pilot</span>
                </div>
                <span className="text-magenta text-2xl">|</span>
                <div className="flex items-center gap-3">
                  <Camera size={32} className="text-magenta" strokeWidth={1.5} />
                  <span className="text-lg">Photographer</span>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-magenta via-magenta/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Academic Pedigree */}
      <section className="py-24 px-6 bg-card/20">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">
              Research | Pontificia Universidad Javeriana
            </h3>
            <p className="text-xl text-muted-foreground">
              Author of Scientific Papers | <a href="#" className="text-accent hover:underline">ORCID</a>
            </p>
          </div>
          
          <div className="flex justify-center gap-6">
            <a 
              href="#" 
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <Network size={24} />
              <span className="font-mono">ORCID Profile</span>
            </a>
            <span className="text-border">|</span>
            <a 
              href="#" 
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <BookOpen size={24} />
              <span className="font-mono">Publications</span>
            </a>
          </div>
        </div>
      </section>

      {/* Code History Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <CodeHistoryApp />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <p className="text-2xl font-bold text-accent">
            Designed for Connection.
          </p>
          
          <div className="flex justify-center gap-8 text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors font-mono">LinkedIn</a>
            <a href="#" className="hover:text-accent transition-colors font-mono">ORCID</a>
            <a href="#" className="hover:text-accent transition-colors font-mono">Email</a>
          </div>
          
          <p className="text-sm text-muted-foreground font-mono pt-8">
            © {new Date().getFullYear()} Your Name. Systems in Motion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
