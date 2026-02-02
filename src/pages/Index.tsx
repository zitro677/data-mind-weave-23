import { Database, GitBranch, MessageSquare, BookOpen, Network, Camera, Plane, Code2, Workflow, Zap, Sparkles, Container, Cpu, Terminal, Link, Github, Twitter, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WireframeCube from '@/components/WireframeCube';
import TypingText from '@/components/TypingText';
import ExpertiseCard from '@/components/ExpertiseCard';
import DataHistoryApp from '@/components/DataHistoryApp';
import LanguageToggle from '@/components/LanguageToggle';
import SplashCursor from '@/components/SplashCursor';
import ProfileCard from '@/components/ProfileCard';
import PixelBlast from '@/components/PixelBlast';
import LogoLoop from '@/components/LogoLoop';
import ElectricBorder from '@/components/ElectricBorder';
import { useLanguage } from '@/contexts/LanguageContext';
import profilePhoto from '@/assets/profile.jpg';

const Index = () => {
  const { t, language } = useLanguage();
  

  const openTwitterProfile = () => {
    window.open('https://twitter.com/TechArkana72223', '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SplashCursor />
      <LanguageToggle />
      {/* Hero Section */}
      <section className="min-h-screen grid-pattern relative flex items-center justify-center px-6 pt-24">
        <PixelBlast />
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
              {/* Left side: ElevenLabs Widget */}
              <div className="flex justify-center items-center">
                <elevenlabs-convai agent-id="agent_8501k9a898asenfaekt9cvf6mdah"></elevenlabs-convai>
              </div>
              
              {/* Right side: ProfileCard */}
              <div className="flex justify-center items-center">
                <ProfileCard
                  avatarUrl={profilePhoto}
                  name="Luis Ortiz"
                  title=""
                  handle="zitro677"
                  status={t('profile.status')}
                  contactText="@TechArkana72223"
                  showUserInfo={true}
                  onContactClick={openTwitterProfile}
                />
              </div>
            </div>
            
            <div className="space-y-6 text-center">
              <TypingText 
                text={t('hero.typing')}
                className="text-lg text-accent"
              />
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <a href="https://arkanatech.tech/portfolio/" target="_blank" rel="noopener noreferrer">
                    {t('hero.cta')}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <a href={language === 'en' ? '/cv-luis-ortiz-en.pdf' : '/cv-luis-ortiz-es.pdf'} download>
                    <Download size={18} />
                    {t('hero.downloadCV')}
                  </a>
                </Button>
              </div>
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
              link="https://arkanatech.tech/solutions/"
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
              link="https://orcid.org/0000-0003-2328-3245"
            />
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="border border-border p-12 cyber-border">
            <h3 className="text-2xl font-bold mb-6 text-accent">{t('stack.build')}</h3>
            <LogoLoop 
              items={[
                { name: 'Python', icon: <Code2 size={24} className="text-accent" /> },
                { name: 'Flowise', icon: <Workflow size={24} className="text-accent" /> },
                { name: 'N8N', icon: <Zap size={24} className="text-accent" /> },
                { name: 'Loveable', icon: <Sparkles size={24} className="text-accent" /> },
                { name: 'Docker', icon: <Container size={24} className="text-accent" /> },
                { name: 'TP', icon: <Cpu size={24} className="text-accent" /> },
                { name: 'Codex', icon: <Terminal size={24} className="text-accent" /> },
                { name: 'Langchain', icon: <Link size={24} className="text-accent" /> },
                { name: 'GitHub', icon: <Github size={24} className="text-accent" /> }
              ]} 
              speed={35} 
            />
            <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mt-6" />
          </div>
        </div>
      </section>

      {/* Hobbies */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <ElectricBorder 
            color="#ff00ff"
            speed={1.2}
            chaos={1}
            thickness={2}
            className="p-12 rounded-lg"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-magenta">{t('stack.hobbies')}</h3>
              <div className="flex gap-8 items-center justify-center">
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
              <div className="h-px bg-gradient-to-r from-magenta via-magenta/50 to-transparent mt-6 mx-auto max-w-md" />
            </div>
          </ElectricBorder>
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
              {t('academic.subtitle')} <a href="https://orcid.org/0000-0003-2328-3245" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{t('academic.orcid')}</a>
            </p>
          </div>
          
          <div className="flex justify-center gap-6">
            <a 
              href="https://orcid.org/0000-0003-2328-3245"
              target="_blank"
              rel="noopener noreferrer"
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
          
          <div className="flex justify-center gap-6 text-muted-foreground">
            <a href="https://twitter.com/zitro677" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="https://linkedin.com/in/luis-ali-ortiz-martinez-454b9139" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="https://arkanatech.tech/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Website">
              <Link size={24} />
            </a>
            <a href="mailto:info@arkanatech.tech" className="hover:text-accent transition-colors" aria-label="Email">
              <Mail size={24} />
            </a>
            <a href="https://github.com/zitro677" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="GitHub">
              <Github size={24} />
            </a>
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
