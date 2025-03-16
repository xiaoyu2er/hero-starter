import { Link } from '@heroui/react';
import { AcmeIcon, DiscordIcon, GithubIcon, TwitterIcon } from './social';

const products = [
  { name: 'Links', href: '/' },
  { name: 'Analytics', href: '/' },
  { name: 'Custom Domains', href: '/' },
  { name: 'API', href: '/' },
];

const resources = [
  { name: 'Blog', href: '/blog' },
  { name: 'Documentation', href: '/docs/' },
  { name: 'Pricing', href: '/pricing' },
];

const compares = [{ name: 'TanStack vs Next', href: '/blog/hero-tss-vs-next' }];

const legal = [
  { name: 'Privacy', href: '/legal/privacy' },
  { name: 'Terms', href: '/legal/terms' },
  { name: 'Subprocessors', href: '/legal/subprocessors' },
  { name: 'DPA', href: '/legal/dpa' },
];

export const Footer = () => {
  
  return (
    <footer className='mx-auto flex w-full max-w-7xl flex-col justify-center border-white/5 border-t-1 px-4 pt-16 pb-8 md:px-12 lg:mt-12 lg:px-8'>
      <div className="xl:grid xl:grid-cols-2 xl:gap-8">
        <div className="space-y-8 md:pr-8">
          <div className="flex items-center justify-start">
            <AcmeIcon />
            <span className="ml-2 font-bold">Hero TSS</span>
          </div>
          <p className='text-default-400 text-small'>
            © {new Date().getFullYear()} Hero TanStack Starter- Building the future of development
          </p>
          <div className="flex space-x-6">
            <Link
              isExternal
              href={''}
              aria-label="X"
              className="text-default-400"
            >
              <TwitterIcon className="w-6" />
            </Link>
            <Link
              isExternal
              href={''}
              aria-label="Github"
              className="text-default-400"
            >
              <GithubIcon className="w-6" />
            </Link>
            <Link
              isExternal
              href={''}
              aria-label="Discord"
              className="text-default-400"
            >
              <DiscordIcon className="w-6" />
            </Link>
          </div>
        </div>

        <div className="mt-16 sm:grid sm:grid-cols-3 sm:gap-8 lg:w-auto lg:text-right xl:mt-0">
          <div>
            <h3 className='font-semibold text-default-600 text-small'>
              Products
            </h3>
            <ul className="mt-2 space-y-1.5 sm:mt-3">
              {products.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='text-default-400 text-small'
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 md:mt-0">
            <h3 className='font-semibold text-default-600 text-small'>
              Resources
            </h3>
            <ul className="mt-2 space-y-1.5 sm:mt-3">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='text-default-400 text-small'
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 md:mt-0">
            <h3 className='font-semibold text-default-600 text-small'>
              Compare
            </h3>
            <ul className="mt-2 space-y-1.5 sm:mt-3">
              {compares.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='text-default-400 text-small'
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className='mt-8 font-semibold text-default-600 text-small'>
              Legal
            </h3>
            <ul className="mt-2 space-y-1.5 sm:mt-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='text-default-400 text-small'
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
