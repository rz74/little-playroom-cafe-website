# 📸 Manual Image Link Update Guide

## 🎯 **Step-by-Step Process:**

### **1. Upload Images to Google Drive**
- Create folders: `Hero`, `Gallery`, `Menu`, `Parties`, `Decorations`, `About`
- Upload your images to the appropriate folders

### **2. Get Shareable Links**
For each image:
1. Right-click → "Share" → "Copy link"
2. Change access to "Anyone with the link can view"

### **3. Convert Links**
Change from:
```
https://drive.google.com/file/d/1ABC123DEF456/view?usp=sharing
```
To:
```
https://drive.google.com/uc?export=view&id=1ABC123DEF456
```

### **4. Update HTML Files**

#### **🏠 index.html - Hero Section:**
```html
<!-- Line 50: Main hero image -->
<img src="YOUR_GOOGLE_DRIVE_HERO_LINK" alt="Kids playing in café">

<!-- Line 103: Cafe interior preview -->
<img src="YOUR_GOOGLE_DRIVE_CAFE_INTERIOR_LINK" alt="Café interior">

<!-- Line 115: Playground preview -->
<img src="YOUR_GOOGLE_DRIVE_PLAYGROUND_LINK" alt="Playground area">

<!-- Line 121: Party preview -->
<img src="YOUR_GOOGLE_DRIVE_PARTY_LINK" alt="Party area">

<!-- Line 127: Cafe preview -->
<img src="YOUR_GOOGLE_DRIVE_CAFE_PREVIEW_LINK" alt="Café area">

<!-- Line 133: Learning preview -->
<img src="YOUR_GOOGLE_DRIVE_LEARNING_LINK" alt="Learning area">
```

#### **📖 about.html - About Section:**
```html
<!-- Line 43: Cafe interior -->
<img src="YOUR_GOOGLE_DRIVE_ABOUT_CAFE_LINK" alt="Little Playroom Café interior">
```

#### **🍽️ menu.html - Menu Section:**
```html
<!-- Line 116: Menu display -->
<img src="YOUR_GOOGLE_DRIVE_MENU_LINK" alt="Menu" class="menu-image">
```

#### **🎨 gallery.html - Gallery Section:**
```html
<!-- Lines 67-169: All gallery images -->
<img src="YOUR_GOOGLE_DRIVE_GALLERY_1_LINK" alt="Main playground area">
<img src="YOUR_GOOGLE_DRIVE_GALLERY_2_LINK" alt="Kids playing">
<!-- ... continue for all 12 gallery images -->
```

#### **🎭 decor.html - Decoration Section:**
```html
<!-- Lines 57-111: Decoration theme images -->
<img src="YOUR_GOOGLE_DRIVE_PRINCESS_LINK" alt="Princess Theme">
<img src="YOUR_GOOGLE_DRIVE_SUPERHERO_LINK" alt="Superhero Theme">
<img src="YOUR_GOOGLE_DRIVE_JUNGLE_LINK" alt="Jungle Safari Theme">
<img src="YOUR_GOOGLE_DRIVE_CUSTOM_LINK" alt="Custom Theme">
```

## 🔧 **Quick Find & Replace Commands:**

### **For Visual Studio Code:**
1. Press `Ctrl+H` to open Find & Replace
2. Use these patterns:

**Find:** `https://images.unsplash.com/photo-1554118811-1e0d58224f24`
**Replace:** `YOUR_GOOGLE_DRIVE_LINK`

**Find:** `https://images.unsplash.com/photo-1578662996442-48f60103fc96`
**Replace:** `YOUR_GOOGLE_DRIVE_LINK`

**Find:** `https://images.unsplash.com/photo-1511795409834-ef04bbd61622`
**Replace:** `YOUR_GOOGLE_DRIVE_LINK`

**Find:** `https://images.unsplash.com/photo-1530103862676-de8c9debad1d`
**Replace:** `YOUR_GOOGLE_DRIVE_LINK`

**Find:** `https://images.unsplash.com/photo-1513151233558-d860c5398176`
**Replace:** `YOUR_GOOGLE_DRIVE_LINK`

**Find:** `https://images.unsplash.com/photo-1464207687429-7505649dae38`
**Replace:** `YOUR_GOOGLE_DRIVE_LINK`

## 📋 **Image Checklist:**

### **Hero Images (6 total):**
- [ ] hero-main.jpg
- [ ] cafe-interior-preview.jpg
- [ ] playground-preview.jpg
- [ ] party-preview.jpg
- [ ] cafe-preview.jpg
- [ ] learning-preview.jpg

### **About Images (1 total):**
- [ ] cafe-interior.jpg

### **Menu Images (1 total):**
- [ ] menu-display.jpg

### **Gallery Images (12 total):**
- [ ] playground-main.jpg
- [ ] kids-playing.jpg
- [ ] toddler-area.jpg
- [ ] party-room.jpg
- [ ] decorated-party.jpg
- [ ] birthday-celebration.jpg
- [ ] cafe-seating.jpg
- [ ] food-drinks.jpg
- [ ] dining-area.jpg
- [ ] special-events.jpg
- [ ] group-activities.jpg
- [ ] community-events.jpg

### **Decoration Images (4 total):**
- [ ] princess-theme.jpg
- [ ] superhero-theme.jpg
- [ ] jungle-safari.jpg
- [ ] custom-theme.jpg

## ⚠️ **Important Tips:**

1. **Test each link** by pasting it in a browser to ensure it works
2. **Keep original file names** for easy identification
3. **Use descriptive alt text** for accessibility
4. **Check image loading** after updating each file
5. **Backup your files** before making changes

## 🚀 **After Updates:**

1. **Test the website** locally
2. **Check all images** load correctly
3. **Verify mobile responsiveness**
4. **Deploy to Netlify** when ready 