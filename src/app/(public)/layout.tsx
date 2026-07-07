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
      <SmartsuppWidget smartsuppKey={settings?.smartsupp_key ?? null} />
    </>
  );
}