import AdminSidebar from "@/components/modules/sidebar/AdminSidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex gap-4">
      <AdminSidebar/>
      {children}
    </main>
  );
}
