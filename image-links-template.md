# 📸 Google Drive Image Links Template for Little Playroom Cafe

## 🎯 How to Use This Template:

1. **Upload your images** to Google Drive in the appropriate folders
2. **Get shareable links** for each image
3. **Convert the links** using the format below
4. **Replace the placeholder URLs** in the HTML files

## 🔗 Link Conversion Format:

**Original Google Drive Link:**
```
https://drive.google.com/file/d/1ABC123DEF456/view?usp=sharing
```

**Convert to Direct Image Link:**
```
https://drive.google.com/uc?export=view&id=1ABC123DEF456
```

## 📁 Image Organization Structure:

### 🏠 **Hero Images** (`images/hero/`)
- `hero-main.jpg` - Main hero background
- `cafe-interior-preview.jpg` - Cafe interior preview
- `playground-preview.jpg` - Playground preview
- `party-preview.jpg` - Party preview
- `cafe-preview.jpg` - Cafe preview
- `learning-preview.jpg` - Learning preview

### 📖 **About Images** (`images/about/`)
- `cafe-interior.jpg` - Main cafe interior image

### 🍽️ **Menu Images** (`images/menu/`)
- `menu-display.jpg` - Menu display image

### 🎨 **Gallery Images** (`images/gallery/`)
- `playground-main.jpg` - Main playground area
- `kids-playing.jpg` - Kids playing
- `toddler-area.jpg` - Toddler area
- `party-room.jpg` - Party room
- `decorated-party.jpg` - Decorated party
- `birthday-celebration.jpg` - Birthday celebration
- `cafe-seating.jpg` - Cafe seating
- `food-drinks.jpg` - Food and drinks
- `dining-area.jpg` - Dining area
- `special-events.jpg` - Special events
- `group-activities.jpg` - Group activities
- `community-events.jpg` - Community events

### 🎉 **Party Images** (`images/parties/`)
- `party-area.jpg` - Party area

### 🎭 **Decoration Images** (`images/decorations/`)
- `princess-theme.jpg` - Princess theme
- `superhero-theme.jpg` - Superhero theme
- `jungle-safari.jpg` - Jungle safari theme
- `custom-theme.jpg` - Custom theme

## 📝 **Example Implementation:**

Once you have your Google Drive links, replace the Unsplash URLs in your HTML files like this:

**Before (Unsplash):**
```html
<img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=900" alt="Kids playing in cafe">
```

**After (Google Drive):**
```html
<img src="https://drive.google.com/uc?export=view&id=YOUR_FILE_ID" alt="Kids playing in cafe">
```

## 🚀 **Quick Setup Steps:**

1. **Upload images** to Google Drive folders
2. **Get shareable links** for each image
3. **Extract file IDs** from the links
4. **Use the direct link format** above
5. **Update HTML files** with new image URLs

## ⚠️ **Important Notes:**

- **File size**: Keep images under 10MB for optimal loading
- **Image formats**: Use JPG for photos, PNG for graphics with transparency
- **Naming**: Use descriptive names for easy identification
- **Access**: Ensure all links are set to "Anyone with the link can view" 