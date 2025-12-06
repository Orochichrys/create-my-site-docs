import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

export interface CodeBlockProps {
  language: string;
  code: string;
  fileName?: string;
}

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}