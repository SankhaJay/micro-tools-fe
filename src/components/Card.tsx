import React from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function Card({
  title,
  description,
  icon,
  href,
  onClick,
  className = '',
  children,
}: CardProps) {
  const cardContent = (
    <div
      className={`
        bg-white rounded-lg shadow-md p-6
        transition-all duration-200
        ${href || onClick ? 'cursor-pointer hover:shadow-lg hover:scale-105' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {icon && <div className="mb-4 text-4xl">{icon}</div>}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

