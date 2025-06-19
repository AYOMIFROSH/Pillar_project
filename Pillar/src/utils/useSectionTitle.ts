import { useEffect, useRef } from 'react';

interface SectionConfig {
  id: string;
  title: string;
}

export const useSectionTitle = (sections: SectionConfig[]) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionElements = sections.map(section => 
      document.getElementById(section.id)
    ).filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionConfig = sections.find(s => s.id === entry.target.id);
            if (sectionConfig) {
              // Update document title
              document.title = sectionConfig.title;
              
              // Update URL hash without causing a scroll
              const newHash = `#${sectionConfig.id}`;
              if (window.location.hash !== newHash) {
                history.replaceState(null, '', newHash);
              }
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of section is visible
        rootMargin: '-100px 0px', // Offset to trigger title change earlier
      }
    );

    sectionElements.forEach(el => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections]);
};