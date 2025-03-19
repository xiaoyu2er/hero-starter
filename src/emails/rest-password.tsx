import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  Link,
  Hr,
} from '@react-email/components';
import Footer from './components/footer';

interface ResetPasswordTemplateProps {
  email: string;
  url: string;
  appName: string;
}

export default function ResetPasswordTemplate({
  email,
  url,
  appName,
}: ResetPasswordTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password request</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-gray-200 border-solid px-10 py-5">
            <Heading className="mx-0 my-7 p-0 text-center font-semibold text-black text-xl">
              Reset your password
            </Heading>
            
            <Text className="text-black text-sm leading-6">
              You recently requested to reset your password for your {appName} account. Use the button below to reset it.
            </Text>

            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={url}
              >
                Reset Password
              </Link>
            </Section>
            
            <Text className="text-black text-sm leading-6">
              Or, you can copy and paste this URL into your browser:
            </Text>
            
            <Text className="max-w-sm flex-wrap break-words font-medium text-purple-600 no-underline">
              {url}
            </Text>
            
            <Hr className="my-4" />
            
            <Text className="text-center text-gray-500 text-sm">
              This password reset link is valid for 1 hour
            </Text>
            
            <Text className="text-center text-gray-500 text-sm">
              If you didn't request a password reset, you can safely ignore this email.
            </Text>

            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

ResetPasswordTemplate.PreviewProps = {
  email: 'test@example.com',
  url: 'https://example.com/reset-password',
  appName: 'Acme',
} as ResetPasswordTemplateProps; 