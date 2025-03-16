import { createFileRoute, Outlet } from '@tanstack/react-router';
import BasicNavbar from '~/components/basic-navbar';
import { Footer } from '~/components/footer';

export const Route = createFileRoute('/_www')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <BasicNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
