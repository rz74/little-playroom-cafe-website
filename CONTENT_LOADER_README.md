# Content Loader System - Little Playroom Cafe

## 🚀 Overview

This system automatically loads content from a single text file (`content/website-content.txt`) and populates your HTML pages dynamically. No more editing HTML files to change content!

## ✨ How It Works

1. **Content File**: All website content is stored in `content/website-content.txt`
2. **HTML Templates**: HTML elements use `data-content` attributes to identify what content they should display
3. **JavaScript Magic**: `js/content-loader.js` reads the content file and automatically updates the HTML

## 📁 File Structure

```
your-website/
├── content/
│   └── website-content.txt    ← Edit this file for all content changes
├── js/
│   └── content-loader.js      ← This script (already created)
├── pages/
│   ├── about.html             ← Uses data-content attributes
│   ├── menu.html              ← Uses data-content attributes
│   └── ...
└── index.html                 ← Uses data-content attributes
```

## 🛠️ How to Use

### Step 1: Edit Content File
Open `content/website-content.txt` and make your changes:

```txt
HOME PAGE (index.html)
========================================================================

HERO SECTION:
- Welcome text: "Welcome to"
- Main title: "LITTLE PLAYROOM CAFÉ - NOW OPEN!"
- Subtitle: "Not Your Ordinary Playground"
- Description: "A safe and fun environment..."
- CTA button: "Explore Now"
```

### Step 2: Save and Deploy
Save the file and deploy to your website. The content updates automatically!

### Step 3: Content Appears
When visitors load your page, they see the new content immediately.

## 🔧 HTML Setup

### Add Data Attributes
Replace hardcoded content with `data-content` attributes:

```html
<!-- Before (hardcoded) -->
<h1>LITTLE PLAYROOM CAFÉ</h1>

<!-- After (dynamic) -->
<h1 data-content="main_title">LITTLE PLAYROOM CAFÉ</h1>
```

### Include Script
Add this script to your HTML files:

```html
<script src="js/content-loader.js"></script>
```

## 📝 Content File Format

The content file uses a simple format:

```txt
PAGE_NAME (filename.html)
========================================================================

SECTION_NAME:
- Key: "Value"
- Another key: "Another value"

ANOTHER_SECTION:
- List item 1
- List item 2
- List item 3
```

## 🎯 Supported Content Types

- **Text Content**: Headings, paragraphs, buttons
- **Navigation**: Menu items, links
- **Meta Data**: Page descriptions, titles
- **Contact Info**: Addresses, phone numbers, hours
- **Pricing**: Package costs, add-on services
- **Legal Text**: Waiver content, rules

## 🔍 Example: Changing Hero Title

### 1. Edit Content File
```txt
HERO SECTION:
- Main title: "LITTLE PLAYROOM CAFÉ - GRAND OPENING!"
```

### 2. HTML Already Set Up
```html
<h1 data-content="main_title">LITTLE PLAYROOM CAFÉ</h1>
```

### 3. Result
The page automatically shows "LITTLE PLAYROOM CAFÉ - GRAND OPENING!" without touching HTML!

## 🚨 Important Notes

- **File Path**: The content file must be accessible at `/content/website-content.txt`
- **Script Order**: Include `content-loader.js` before other scripts that might depend on the content
- **Fallback**: If the content file can't be loaded, the original HTML content remains
- **Caching**: Some browsers may cache the content file - clear cache if changes don't appear

## 🧪 Testing

1. Make a small change to `content/website-content.txt`
2. Save the file
3. Refresh your website
4. See the change immediately!

## 🆘 Troubleshooting

### Content Not Updating?
- Check browser console for errors
- Verify `content-loader.js` is included in your HTML
- Ensure the content file path is correct
- Clear browser cache

### Script Errors?
- Make sure `content-loader.js` is in the `js/` folder
- Check that the script tag is included in your HTML
- Verify the script loads before other scripts

## 🎉 Benefits

- **Single Source of Truth**: All content in one file
- **Easy Updates**: No need to edit HTML files
- **Consistent Content**: Changes apply across all pages
- **Static Website Friendly**: Works with Netlify, GitHub Pages, etc.
- **No Database Required**: Just a text file
- **Version Control**: Easy to track content changes in Git

## 📚 Next Steps

1. Add `data-content` attributes to your HTML elements
2. Include `content-loader.js` in your HTML files
3. Test by editing `content/website-content.txt`
4. Deploy and enjoy automatic content updates!

---

**Need Help?** Check the `demo.html` file for a visual demonstration of how the system works.
