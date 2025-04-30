import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  ratio?: '1:1' | '4:3' | '16:9';
  imageUrl: string;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  ratio = '1:1', 
  imageUrl, 
  alt = 'Logo' 
}) => {
  const sizeClasses = {
    sm: 'w-25',
    md: 'w-50 h-50',
    lg: 'w-100 h-100'
  };

  const ratioClasses = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video'
  };

  return (
    <div className={`${sizeClasses[size]} ${ratioClasses[ratio]} overflow-hidden`}>
      <img 
        src={imageUrl} 
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Logo;


/* <Logo 
  size="md"
  ratio="16:9"
  imageUrl="/path/to/your/logo.png"
  alt="Company Logo"
/> */