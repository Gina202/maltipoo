import { SettingsForm } from "@/components/admin/forms/SettingsForms";
import { getSiteSettings } from "@/features/settings/queries";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-2xl text-(--color-ink)">Settings</h1>
      <p className="mt-1 text-sm text-(--color-ink-soft)">
        Business contact info shown in your site footer and contact page.
      </p>
      <div className="mt-8 max-w-2xl">
        <SettingsForm
          defaultValues={{
            phone: settings?.phone ?? "",
            email: settings?.email ?? "",
            address: settings?.address ?? "",
            businessHours: settings?.business_hours ?? "",
            smartsuppKey: settings?.smartsupp_key ?? "",
          }}
        />
      </div>
    </div>
  );
}