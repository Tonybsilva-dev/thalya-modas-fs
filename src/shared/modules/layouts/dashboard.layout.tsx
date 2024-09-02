import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 text-center text-xl">
        <h1>My Dashboard</h1>
      </header>

      {/* Main content area with sidebar and page content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-700 text-white p-4 overflow-y-auto">
          <nav>
            <ul>
              <li className="mb-2"><a href="#" className="block p-2 rounded hover:bg-gray-600">Dashboard</a></li>
              <li className="mb-2"><a href="#" className="block p-2 rounded hover:bg-gray-600">Settings</a></li>
              <li className="mb-2"><a href="#" className="block p-2 rounded hover:bg-gray-600">Profile</a></li>
              <li className="mb-2"><a href="#" className="block p-2 rounded hover:bg-gray-600">Logout</a></li>
            </ul>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </section>
  );
}
