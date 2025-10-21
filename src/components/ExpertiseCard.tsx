import { ReactNode } from 'react';

interface ExpertiseCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link?: string;
}

const ExpertiseCard = ({ icon, title, description, link }: ExpertiseCardProps) => {
  const content = (
    <>
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
    </>
  );

  const className = "group relative p-8 border border-border bg-card transition-all duration-300 hover:border-accent hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] cyber-border";

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={`${className} block cursor-pointer`}>
        {content}
      </a>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
};

export default ExpertiseCard;
