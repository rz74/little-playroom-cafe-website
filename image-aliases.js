// Image Aliases for Little Playroom Cafe
// All Imgur image URLs organized by category
// Source: https://imgur.com/a/27yLEF6

const IMAGE_ALIASES = {
    // Hero Images
    'hero-main': 'https://i.imgur.com/HvtOCVi.jpg',
    'hero-main-2': 'https://i.imgur.com/c87O0f1.jpg',
    'cafe-interior-preview': 'https://i.imgur.com/4SQqoqO.jpg',
    'playground-preview': 'https://i.imgur.com/MHctG2N.jpg',
    'party-preview': 'https://i.imgur.com/IUxchYp.jpg',
    'cafe-preview': 'https://i.imgur.com/DgZFAG8.jpg',
    
    // About Images
    'cafe-interior': 'https://i.imgur.com/oga7Dan.jpg',
    
    // Menu Images
    'menu-display': 'https://i.imgur.com/Xg3HWQv.jpg',
    
    // Gallery Images
    'playground-main': 'https://i.imgur.com/ex9Y1m1.jpg',
    'kids-playing': 'https://i.imgur.com/Scps6IF.jpg',
    'toddler-area': 'https://i.imgur.com/cfpGKR7.jpg',
    'party-room': 'https://i.imgur.com/I47Emhu.jpg',
    'decorated-party': 'https://i.imgur.com/NnO28uX.jpg',
    'birthday-celebration': 'https://i.imgur.com/pbMVibw.jpg',
    'cafe-seating': 'https://i.imgur.com/59S2xRx.jpg',
    'food-drinks': 'https://i.imgur.com/euz44gh.jpg',
    'dining-area': 'https://i.imgur.com/wEses0D.jpg',
    'special-events': 'https://i.imgur.com/JXkhSsm.jpg',
    'group-activities': 'https://i.imgur.com/GmL1Di5.jpg',
    'community-events': 'https://i.imgur.com/UoYqCMY.jpg',
    
    // Party Images
    'party-area': 'https://i.imgur.com/KhL0ezS.jpg',
    
    // Decoration Images
    'princess-theme': 'https://i.imgur.com/N3jjBhT.jpg',
    'superhero-theme': 'https://i.imgur.com/ghlcyP1.jpg',
    'jungle-safari': 'https://i.imgur.com/7yigPCF.jpg',
    'custom-theme': 'https://i.imgur.com/6p9BK4P.jpg',
    
    // Additional Gallery Images
    'gallery-1': 'https://i.imgur.com/sNKayjj.jpg',
    'gallery-2': 'https://i.imgur.com/oUOcnKa.jpg',
    'gallery-3': 'https://i.imgur.com/dlBsRvr.jpg',
    'gallery-4': 'https://i.imgur.com/7rS6pHZ.jpg',
    'gallery-5': 'https://i.imgur.com/AhnSwQl.jpg',
    'gallery-6': 'https://i.imgur.com/gCrbhQK.jpg',
    'gallery-7': 'https://i.imgur.com/IIGs3bc.jpg',
    'gallery-8': 'https://i.imgur.com/eO7V8Re.jpg',
    'gallery-9': 'https://i.imgur.com/3BTPZTC.jpg',
    'gallery-10': 'https://i.imgur.com/L9HV4yu.jpg',
    'gallery-11': 'https://i.imgur.com/BRx1bQj.jpg',
    'gallery-12': 'https://i.imgur.com/FF85rr4.jpg',
    'gallery-13': 'https://i.imgur.com/y1xMTdK.jpg',
    'gallery-14': 'https://i.imgur.com/gjm0m19.jpg',
    'gallery-15': 'https://i.imgur.com/c2WxKgz.jpg',
    'gallery-16': 'https://i.imgur.com/CLlKtCN.jpg',
    'gallery-17': 'https://i.imgur.com/pbopaAE.jpg',
    'gallery-18': 'https://i.imgur.com/lwZYtS6.jpg',
    'gallery-19': 'https://i.imgur.com/GZDvoNB.jpg',
    'gallery-20': 'https://i.imgur.com/4bH0gla.jpg',
    'gallery-21': 'https://i.imgur.com/WtxoTQA.jpg',
    'gallery-22': 'https://i.imgur.com/k6YKrSb.jpg',
    'gallery-23': 'https://i.imgur.com/J6pSIeG.jpg',
    'gallery-24': 'https://i.imgur.com/XlTmbwp.jpg',
    'gallery-25': 'https://i.imgur.com/xzHylu0.jpg',
    'gallery-26': 'https://i.imgur.com/tUxrZZS.jpg',
    'gallery-27': 'https://i.imgur.com/G8Zia12.jpg'
};

// Function to get image URL by alias
function getImageUrl(alias) {
    return IMAGE_ALIASES[alias] || `Image alias "${alias}" not found`;
}

// Function to replace all image aliases in the page
function replaceImageAliases() {
    const images = document.querySelectorAll('img[data-alias]');
    images.forEach(img => {
        const alias = img.getAttribute('data-alias');
        const url = getImageUrl(alias);
        if (url && !url.includes('not found')) {
            img.src = url;
        } else {
            console.warn(`Image alias "${alias}" not found`);
        }
    });
}

// Auto-replace aliases when DOM is loaded
document.addEventListener('DOMContentLoaded', replaceImageAliases);

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IMAGE_ALIASES, getImageUrl };
} 