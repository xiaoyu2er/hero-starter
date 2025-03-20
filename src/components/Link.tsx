import { Link } from '@heroui/react';
import type { LinkProps } from '@heroui/react';
import { createLink } from '@tanstack/react-router';
import type { LinkComponent } from '@tanstack/react-router';
import React from 'react';

interface HeroLinkProps extends LinkProps {
  // Add any additional props you want to pass to the Link
}

const HeroLinkComponent = React.forwardRef<HTMLAnchorElement, HeroLinkProps>(
  (props, ref) => <Link ref={ref} {...props} />
);

const CreatedLinkComponent = createLink(HeroLinkComponent);

type CustomLinkType = LinkComponent<typeof HeroLinkComponent>;

const CustomLink: CustomLinkType = (props) => {
  return <CreatedLinkComponent preload={'intent'} {...props} />;
};

export { CustomLink as Link };

export type { CustomLinkType as LinkType };
