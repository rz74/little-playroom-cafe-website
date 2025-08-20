// Announcement loader for Netlify CMS
(async () => {
  try {
    const res = await fetch('/data/announcement.json', { cache: 'no-store' });
    const a = await res.json();
    const now = new Date();
    
    // Check if announcement is within time window
    const inWindow =
      (!a.start || new Date(a.start) <= now) &&
      (!a.end || new Date(a.end) >= now);

    if (a.enabled && inWindow) {
      const announcementSection = document.getElementById('announcement-section');
      const announcementTitle = document.getElementById('announcement-title');
      const announcementMessage = document.getElementById('announcement-message');
      
      if (announcementSection && announcementTitle && announcementMessage) {
        // Update content
        announcementTitle.textContent = a.title || '';
        announcementMessage.textContent = a.message || '';
        
        // Update styling based on severity
        announcementSection.className = `announcement-section announcement-${a.severity || 'warning'}`;
        
        // Show the announcement
        announcementSection.style.display = 'block';
      }
    }
  } catch (e) { 
    console.error('Announcement load failed', e); 
  }
})();
