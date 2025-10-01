import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const navigation = [
  { name: '🏥 Site Info', href: '/admin/content?tab=site' },
  { name: '🎯 Hero Section', href: '/admin/content?tab=hero' },
  { name: '💡 About/Why Choose', href: '/admin/content?tab=about' },
  { name: '👥 Team', href: '/admin/content?tab=team' },
  { name: '👨‍⚕️ Doctors', href: '/admin/content?tab=doctors' },
  { name: '📞 Contact', href: '/admin/content?tab=contact' },
  { name: '🕒 Business Hours', href: '/admin/content?tab=hours' },
  { name: '📸 Gallery', href: '/admin/content?tab=gallery' },
  { name: '🩺 Services', href: '/admin/content?tab=services' },
  { name: '🏷️ Departments', href: '/admin/content?tab=departments' },
  { name: '📺 Médias', href: '/admin/content?tab=media' },
  { name: '❓ FAQ', href: '/admin/content?tab=faq' },
  { name: '📰 Articles', href: '/admin/articles' },
  { name: '🦶 Footer', href: '/admin/content?tab=footer' },
];

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    auth.logout();
    navigate('/admin/login');
  };

  const isActiveRoute = (href: string) => {
    const target = new URL(href, window.location.origin);
    const targetTab = target.searchParams.get('tab');
    const current = new URL(window.location.href);
    const currentTab = current.searchParams.get('tab');
    if (href.startsWith('/admin/content')) {
      return location.pathname.startsWith('/admin/content') && currentTab === targetTab;
    }
    if (href === '/admin/articles') {
      return location.pathname === '/admin/articles' || (location.pathname === '/admin/content' && currentTab === 'articles');
    }
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <div className={`fixed inset-0 flex z-40 ${sidebarOpen ? '' : 'hidden'}`}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            
            {/* Mobile Sidebar Content */}
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
              </div>
              
              <nav className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                      isActiveRoute(item.href)
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className={`mr-3 h-5 w-5 flex-shrink-0 ${isActiveRoute(item.href) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`}>•</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Logout */}
            <div className="flex-shrink-0 border-t border-gray-200 p-4">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
              >
                <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-60 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white shadow-sm border-r border-gray-200">
          {/* Logo area */}
          <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    isActiveRoute(item.href)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={`mr-3 h-5 w-5 flex-shrink-0 ${isActiveRoute(item.href) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`}>•</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* User area */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center mb-3">
              <UserCircleIcon className="h-8 w-8 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@site.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
            >
              <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-60">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Breadcrumb or page title could go here */}
              <h1 className="text-lg font-semibold text-gray-900">
                {navigation.find(item => isActiveRoute(item.href))?.name || 'Content Editor'}
              </h1>
            </div>
            
            <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
              {/* Notifications */}
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile */}
              <div className="flex items-center gap-x-3">
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="bg-gray-50 min-h-screen">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};