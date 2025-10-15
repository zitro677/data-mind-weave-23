import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-2 bg-card/90 backdrop-blur-sm border border-border p-2 rounded cyber-border">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}
      >
        EN
      </Button>
      <Button
        variant={language === 'es' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('es')}
        className={language === 'es' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}
      >
        ES
      </Button>
    </div>
  );
};

export default LanguageToggle;