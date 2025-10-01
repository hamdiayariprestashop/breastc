import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  PhotoIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { getAnalyticsData, startRealTimeUpdates, AnalyticsData, clearAnalyticsData, addSampleData } from '../../services/analytics';

const data = [
  {
    title: 'Total Visits',
    metric: '2,543',
    icon: ChartBarIcon,
    color: 'blue',
    change: '+12.5%',
    changeType: 'positive'
  },
  {
    title: 'Total Users',
    metric: '1,234',
    icon: UserGroupIcon,
    color: 'emerald',
    change: '+8.2%',
    changeType: 'positive'
  },
  {
    title: 'Total Posts',
    metric: '86',
    icon: DocumentTextIcon,
    color: 'violet',
    change: '+3 this week',
    changeType: 'neutral'
  },
  {
    title: 'Media Files',
    metric: '245',
    icon: PhotoIcon,
    color: 'amber',
    change: '+15 this month',
    changeType: 'neutral'
  },
];

const pages = [
  { name: '/home', value: 1230 },
  { name: '/services', value: 751 },
  { name: '/about', value: 471 },
  { name: '/contact', value: 280 },
  { name: '/doctors', value: 78 },
];

const recentPosts = [
  {
    id: 1,
    title: 'Welcome to Our New Medical Center',
    status: 'Published',
    date: '2024-01-15',
    views: 245,
    comments: 8
  },
  {
    id: 2,
    title: 'COVID-19 Safety Protocols Update',
    status: 'Published',
    date: '2024-01-14',
    views: 189,
    comments: 12
  },
  {
    id: 3,
    title: 'New Cardiology Department',
    status: 'Draft',
    date: '2024-01-13',
    views: 0,
    comments: 0
  },
  {
    id: 4,
    title: 'Patient Care Excellence Awards',
    status: 'Published',
    date: '2024-01-12',
    views: 156,
    comments: 5
  }
];

const quickActions = [
  {
    title: 'Write New Post',
    icon: PlusIcon,
    color: 'bg-blue-500 hover:bg-blue-600',
    href: '/admin/posts/new'
  },
  {
    title: 'Edit Content',
    icon: PencilIcon,
    color: 'bg-green-500 hover:bg-green-600',
    href: '/admin/content'
  },
  {
    title: 'View Site',
    icon: EyeIcon,
    color: 'bg-purple-500 hover:bg-purple-600',
    href: '/'
  },
  {
    title: 'Settings',
    icon: Cog6ToothIcon,
    color: 'bg-gray-500 hover:bg-gray-600',
    href: '/admin/settings'
  }
];

const notifications = [
  {
    id: 1,
    type: 'warning',
    message: 'WordPress core update available (v6.4.2)',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'info',
    message: 'Weekly backup completed successfully',
    time: '1 day ago'
  },
  {
    id: 3,
    type: 'success',
    message: 'SSL certificate renewed automatically',
    time: '3 days ago'
  }
];

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Load analytics data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getAnalyticsData();
        setAnalyticsData(data);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Failed to load analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Start real-time updates
    const cleanup = startRealTimeUpdates((data) => {
      setAnalyticsData(data);
      setLastUpdate(new Date());
    });

    return cleanup;
  }, []);

  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Show loading state
  if (loading || !analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Prepare data for display
  const statsData = [
    {
      title: 'Total Visits',
      metric: analyticsData.totalVisits.toLocaleString(),
      icon: ChartBarIcon,
      color: 'blue',
      change: `+${analyticsData.visitsChange}%`,
      changeType: 'positive' as const
    },
    {
      title: 'Total Users',
      metric: analyticsData.totalUsers.toLocaleString(),
      icon: UserGroupIcon,
      color: 'emerald',
      change: `+${analyticsData.usersChange}%`,
      changeType: 'positive' as const
    },
    {
      title: 'Total Articles',
      metric: analyticsData.totalArticles.toString(),
      icon: DocumentTextIcon,
      color: 'violet',
      change: `${analyticsData.articlesChange} published`,
      changeType: 'neutral' as const
    },
    {
      title: 'Media Files',
      metric: analyticsData.totalMediaFiles.toString(),
      icon: PhotoIcon,
      color: 'amber',
      change: `+${analyticsData.mediaChange} this month`,
      changeType: 'neutral' as const
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">BIC Medical Center - Dashboard</h1>
            <p className="text-sm text-gray-600">
              Welcome back, Admin! {currentDate} at {currentTime}
            </p>
          </div>
            <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <CalendarDaysIcon className="h-4 w-4 mr-1" />
              Last update: {lastUpdate.toLocaleTimeString()}
            </div>
            <div className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live Data
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  addSampleData();
                  window.location.reload();
                }}
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Add Sample Data
              </button>
              <button
                onClick={() => {
                  clearAnalyticsData();
                  window.location.reload();
                }}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Welcome Widget */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 border-0">
          <div className="text-white">
            <Title className="text-white text-xl mb-2">Welcome to Your Dashboard</Title>
            <Text className="text-blue-100 mb-4">
              {analyticsData.totalVisits > 0 ? (
                <>You have {analyticsData.articles.filter(a => a.status === 'draft').length} draft articles, {analyticsData.recentActivity.filter(a => a.type === 'comment').length} recent comments, and your site received {analyticsData.totalVisits.toLocaleString()} visits this month.</>
              ) : (
                <>No data yet. Click "Add Sample Data" to see how the dashboard works, or start using your site to generate real analytics.</>
              )}
            </Text>
            <div className="flex space-x-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`inline-flex items-center px-3 py-2 text-xs font-medium text-white ${action.color} rounded-md transition-colors duration-200`}
                >
                  <action.icon className="h-4 w-4 mr-1" />
                  {action.title}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <Grid numItemsSm={2} numItemsLg={4} className="gap-4 mb-6">
          {statsData.map((item) => (
            <Card key={item.title} className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 bg-${item.color}-500`}></div>
              <Flex justifyContent="between" alignItems="start">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 bg-${item.color}-100 rounded-lg`}>
                    <item.icon className={`h-5 w-5 text-${item.color}-600`} />
                  </div>
                  <div>
                    <Text className="text-xs text-gray-600 uppercase font-medium">{item.title}</Text>
                    <Metric className="text-2xl font-bold text-gray-900 mt-1">{item.metric}</Metric>
                    <div className="flex items-center mt-1">
                      <ArrowTrendingUpIcon className={`h-3 w-3 mr-1 ${
                        item.changeType === 'positive' ? 'text-green-500' : 'text-gray-400'
                      }`} />
                      <Text className={`text-xs ${
                        item.changeType === 'positive' ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {item.change}
                      </Text>
                    </div>
                  </div>
                </div>
              </Flex>
            </Card>
          ))}
        </Grid>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-6">
            {/* Recent Posts */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <Title>Recent Posts</Title>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View All Posts
                </button>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Views
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comments
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {analyticsData.articles.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <Text className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                            {post.title}
                          </Text>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            post.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Text className="text-gray-500">{new Date(post.publishDate).toLocaleDateString()}</Text>
                        </td>
                        <td className="px-4 py-3">
                          <Text className="text-gray-900">{post.views}</Text>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <ChatBubbleLeftIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <Text className="text-gray-900">{post.comments}</Text>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Page Views */}
            <Card>
              <Title>Top Performing Pages</Title>
              <Text className="mt-1 mb-4">Most visited pages this month</Text>
              <BarList
                data={analyticsData.topPages.map(page => ({
                  name: page.path,
                  value: page.views
                }))}
                valueFormatter={(number: number) =>
                  `${Intl.NumberFormat('us').format(number)} views`
                }
                className="mt-2"
                color="blue"
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* At a Glance */}
            <Card>
              <Title>At a Glance</Title>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm font-medium">Articles</span>
                  </div>
                  <span className="text-sm text-gray-600">{analyticsData.totalArticles} total</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <ChatBubbleLeftIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm font-medium">Comments</span>
                  </div>
                  <span className="text-sm text-gray-600">{analyticsData.articles.reduce((sum, article) => sum + article.comments, 0)} total</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-sm font-medium">Visitors</span>
                  </div>
                  <span className="text-sm text-gray-600">{analyticsData.totalUsers.toLocaleString()} total</span>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <Title>Recent Activity</Title>
              <div className="mt-4 space-y-3">
                {analyticsData.recentActivity.length > 0 ? (
                  analyticsData.recentActivity.map((activity) => (
                    <div key={activity.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <p className="text-sm text-gray-900 leading-relaxed">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timeAgo}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500">No recent activity</p>
                    <p className="text-xs text-gray-400 mt-1">Activity will appear here as users interact with your site</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Notifications */}
            <Card>
              <Title>System Notifications</Title>
              <div className="mt-4 space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${
                    notification.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                    notification.type === 'success' ? 'bg-green-50 border-green-400' :
                    'bg-blue-50 border-blue-400'
                  }`}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <ExclamationTriangleIcon className={`h-4 w-4 ${
                          notification.type === 'warning' ? 'text-yellow-400' :
                          notification.type === 'success' ? 'text-green-400' :
                          'text-blue-400'
                        }`} />
                      </div>
                      <div className="ml-2">
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Draft */}
            <Card>
              <Title>Quick Draft</Title>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Post title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mb-3"
                />
                <textarea
                  placeholder="What's on your mind?"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                ></textarea>
                <button className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                  Save Draft
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;