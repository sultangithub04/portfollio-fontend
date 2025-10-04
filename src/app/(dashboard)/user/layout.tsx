import UserSidebar from "@/components/modules/sidebar/UserSidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex gap-4">
      <UserSidebar/>
      {children}
    </main>
  );
}
