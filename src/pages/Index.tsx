import { Database, GitBranch, MessageSquare, BookOpen, Network, Camera, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WireframeCube from '@/components/WireframeCube';
import TypingText from '@/components/TypingText';
import ExpertiseCard from '@/components/ExpertiseCard';
import DataHistoryApp from '@/components/DataHistoryApp';
import LanguageToggle from '@/components/LanguageToggle';
import SplashCursor from '@/components/SplashCursor';
import ProfileCard from '@/components/ProfileCard';
import { useLanguage } from '@/contexts/LanguageContext';
import profilePhoto from '@/assets/profile.jpg';

const Index = () => {
  const { t } = useLanguage();
  
  const scrollToExpertise = () => {
    document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SplashCursor />
      <LanguageToggle />
      {/* Hero Section */}
      <section className="min-h-screen grid-pattern relative flex items-center justify-center px-6 pt-24">
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex flex-col items-center gap-12">
            <div className="flex justify-center items-center">
              <ProfileCard
                avatarUrl={profilePhoto}
                name="Luis Ortiz"
                title=""
                handle="zitro677"
                status="Online"
                contactText={t('hero.cta')}
                showUserInfo={true}
                onContactClick={scrollToExpertise}
              />
            </div>
            
            <div className="space-y-6 text-center">
              <TypingText 
                text={t('hero.typing')}
                className="text-lg text-accent"
              />
              
              <Button
                onClick={scrollToExpertise}
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                {t('hero.cta')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Matrix */}
      <section id="expertise" className="py-24 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">
            {t('expertise.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <ExpertiseCard
              icon={<GitBranch size={48} strokeWidth={1.5} />}
              title={t('expertise.openscience.title')}
              description={t('expertise.openscience.desc')}
            />
            
            <ExpertiseCard
              icon={<Database size={48} strokeWidth={1.5} />}
              title={t('expertise.datascience.title')}
              description={t('expertise.datascience.desc')}
            />
            
            <ExpertiseCard
              icon={<MessageSquare size={48} strokeWidth={1.5} />}
              title={t('expertise.ai.title')}
              description={t('expertise.ai.desc')}
            />
            
            <ExpertiseCard
              icon={<BookOpen size={48} strokeWidth={1.5} />}
              title={t('expertise.research.title')}
              description={t('expertise.research.desc')}
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
              <h3 className="text-2xl font-bold mb-6 text-accent">{t('stack.build')}</h3>
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
              <h3 className="text-2xl font-bold mb-6 text-magenta">{t('stack.explore')}</h3>
              <div className="flex gap-8 items-center">
                <div className="flex items-center gap-3">
                  <Plane size={32} className="text-magenta" strokeWidth={1.5} />
                  <span className="text-lg">{t('stack.drone')}</span>
                </div>
                <span className="text-magenta text-2xl">|</span>
                <div className="flex items-center gap-3">
                  <Camera size={32} className="text-magenta" strokeWidth={1.5} />
                  <span className="text-lg">{t('stack.photo')}</span>
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
              {t('academic.title')}
            </h3>
            <p className="text-xl text-muted-foreground">
              {t('academic.subtitle')} <a href="#" className="text-accent hover:underline">{t('academic.orcid')}</a>
            </p>
          </div>
          
          <div className="flex justify-center gap-6">
            <a 
              href="#" 
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <Network size={24} />
              <span className="font-mono">{t('academic.profile')}</span>
            </a>
            <span className="text-border">|</span>
            <a 
              href="#" 
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <BookOpen size={24} />
              <span className="font-mono">{t('academic.publications')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Data History Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <DataHistoryApp />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <p className="text-2xl font-bold text-accent">
            {t('footer.tagline')}
          </p>
          
          <div className="flex justify-center gap-8 text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors font-mono">{t('footer.linkedin')}</a>
            <a href="#" className="hover:text-accent transition-colors font-mono">{t('academic.orcid')}</a>
            <a href="#" className="hover:text-accent transition-colors font-mono">{t('footer.email')}</a>
          </div>
          
          <p className="text-sm text-muted-foreground font-mono pt-8">
            © {new Date().getFullYear()} {t('hero.title')}. {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
