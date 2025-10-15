import { ReactNode } from 'react';

interface ExpertiseCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ExpertiseCard = ({ icon, title, description }: ExpertiseCardProps) => {
  return (
    <div className="group relative p-8 border border-border bg-card transition-all duration-300 hover:border-accent hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] cyber-border">
      <div className="absolute top-0 left-0 w-2 h-2 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="mb-6 text-accent transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ExpertiseCard;
