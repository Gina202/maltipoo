import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmartsuppWidget } from "@/components/shared/SmartsuppWidget";
import { getSiteSettings } from "@/features/settings/queries";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <SmartsuppWidget smartsuppKey="48073b78b7eb482e25a5d12dc7b0e433224f2cbb" />
    </>
  );
}