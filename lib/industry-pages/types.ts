export type IndustrySector = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type IndustryPageContent = {
  title: string;
  intro: string;
  highlight: {
    label: string;
    description: string;
    icon: string;
  };
  coverage: {
    title: string;
    description: string;
    sectors: IndustrySector[];
  };
  whyChoose: {
    title: string;
    items: { title: string; description: string }[];
  };
  roles: {
    title: string;
    description: string;
    items: string[];
  };
  partner: {
    title: string;
    description: string;
    sideLabel: string;
  };
  cta: string;
  partnerIcon: string;
  whyIcons: string[];
};
