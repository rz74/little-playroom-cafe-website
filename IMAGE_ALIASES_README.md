# 🖼️ Image Alias System for Little Playroom Cafe

## 🎯 **How It Works:**

The website now uses an **alias system** for all images. Instead of hardcoding Google Drive URLs in HTML files, we use simple aliases that automatically load the correct images.

## 📝 **Usage:**

### **In HTML Files:**
Instead of:
```html
<img src="https://drive.google.com/uc?export=view&id=1UYb-WZO9ZRVaOfjhvxMR5Ibautj4wkhN" alt="Hero image">
```

Use:
```html
<img data-alias="hero-main" alt="Hero image">
```

### **Available Aliases:**

#### **🏠 Hero Images:**
- `hero-main` - Main hero background
- `cafe-interior-preview` - Cafe interior preview
- `playground-preview` - Playground preview
- `party-preview` - Party preview
- `cafe-preview` - Cafe preview
- `learning-preview` - Learning preview

#### **📖 About Images:**
- `cafe-interior` - Main cafe interior image

#### **🍽️ Menu Images:**
- `menu-display` - Menu display image

#### **🎨 Gallery Images:**
- `playground-main` - Main playground area
- `kids-playing` - Kids playing
- `toddler-area` - Toddler area
- `party-room` - Party room
- `decorated-party` - Decorated party
- `birthday-celebration` - Birthday celebration
- `cafe-seating` - Cafe seating
- `food-drinks` - Food and drinks
- `dining-area` - Dining area
- `special-events` - Special events
- `group-activities` - Group activities
- `community-events` - Community events

#### **🎭 Decoration Images:**
- `princess-theme` - Princess theme
- `superhero-theme` - Superhero theme
- `jungle-safari` - Jungle safari theme
- `custom-theme` - Custom theme

## 🔧 **How to Update Images:**

### **1. Update the Alias File:**
Edit `image-aliases.js` and change the URL for any alias:

```javascript
const IMAGE_ALIASES = {
    'hero-main': 'https://drive.google.com/uc?export=view&id=NEW_FILE_ID',
    // ... other aliases
};
```

### **2. Add New Images:**
1. Upload new image to Google Drive
2. Get the shareable link
3. Convert to direct link format: `https://drive.google.com/uc?export=view&id=FILE_ID`
4. Add new alias to `image-aliases.js`:

```javascript
const IMAGE_ALIASES = {
    // ... existing aliases
    'new-image': 'https://drive.google.com/uc?export=view&id=NEW_FILE_ID'
};
```

5. Use in HTML: `<img data-alias="new-image" alt="Description">`

## ✅ **Benefits:**

- **🎯 Centralized Management** - All image URLs in one file
- **🔄 Easy Updates** - Change URLs without touching HTML
- **📱 Consistent Loading** - Automatic image replacement
- **🚀 Better Performance** - No need to update multiple files
- **🛠️ Developer Friendly** - Simple alias names instead of long URLs

## 🔍 **File Structure:**

```
kids-cafe-website/
├── image-aliases.js          # All image URLs and aliases
├── index.html               # Uses data-alias attributes
├── about.html               # Uses data-alias attributes
├── menu.html                # Uses data-alias attributes
├── gallery.html             # Uses data-alias attributes
├── decor.html               # Uses data-alias attributes
└── script.js                # Main JavaScript functionality
```

## 🚀 **Testing:**

1. **Start the server:** `python -m http.server 8000`
2. **Open browser:** `http://localhost:8000`
3. **Check images:** All images should load from Google Drive
4. **Verify aliases:** Check browser console for any missing aliases

## ⚠️ **Important Notes:**

- **Always include** `image-aliases.js` before `script.js` in HTML files
- **Use descriptive aliases** for easy identification
- **Test image loading** after updating aliases
- **Keep Google Drive links** set to "Anyone with link can view" 