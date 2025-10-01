module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In a real application, you would fetch this from a database
    // For now, we'll return some sample data
    const analytics = {
      totalVisits: Math.floor(Math.random() * 1000) + 2000,
      totalUsers: Math.floor(Math.random() * 500) + 1000,
      totalArticles: 6,
      totalMediaFiles: Math.floor(Math.random() * 50) + 200,
      visitsChange: Math.round((Math.random() * 20 + 5) * 10) / 10,
      usersChange: Math.round((Math.random() * 15 + 3) * 10) / 10,
      articlesChange: 6,
      mediaChange: Math.floor(Math.random() * 20 + 5),
      topPages: [
        { path: '/home', views: Math.floor(Math.random() * 500) + 800 },
        { path: '/services', views: Math.floor(Math.random() * 300) + 500 },
        { path: '/about', views: Math.floor(Math.random() * 200) + 300 },
        { path: '/contact', views: Math.floor(Math.random() * 150) + 200 },
        { path: '/doctors', views: Math.floor(Math.random() * 100) + 50 }
      ],
      recentActivity: [
        {
          id: '1',
          action: 'New contact form submission from John Doe',
          timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          type: 'form',
          timeAgo: '2 minutes ago'
        },
        {
          id: '2',
          action: 'Article viewed: "L\'Intelligence Artificielle en Mammographie"',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          type: 'article',
          timeAgo: '15 minutes ago'
        },
        {
          id: '3',
          action: 'New media uploaded: mammographe_3d.webp',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          type: 'media',
          timeAgo: '2 hours ago'
        }
      ]
    };
    
    res.status(200).json(analytics);
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ error: 'Failed to get analytics', details: error.message });
  }
};

