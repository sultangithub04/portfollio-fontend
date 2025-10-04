import SuperAdminSidebar from "@/components/modules/sidebar/SuperAdminSidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex gap-4">
      <SuperAdminSidebar/>
      {children}
    </main>
  );
}
