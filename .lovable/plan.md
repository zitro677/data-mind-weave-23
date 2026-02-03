

## Add Share Functionality to DataHistoryApp

### Summary
Add a share dropdown menu to the "Share" / "Compartir" button in the Data Science History module that allows users to share events on Facebook, X (Twitter), and Instagram.

---

### Changes

**File: `src/components/DataHistoryApp.tsx`**

#### 1. Add new state for dropdown visibility
- Add `useState` for controlling the share dropdown open/close state

#### 2. Update translations (lines 17-99)
Add new translation keys for share options:
- `shareOn`: "Share on" / "Compartir en"
- `shareFacebook`: "Facebook"
- `shareTwitter`: "X (Twitter)"  
- `shareInstagram`: "Instagram"
- `copyLink`: "Copy Link" / "Copiar enlace"
- `linkCopied`: "Link copied!" / "¡Enlace copiado!"

#### 3. Create share handler functions
- `getShareText()` - Generate share text from current event
- `shareOnFacebook()` - Open Facebook share dialog
- `shareOnTwitter()` - Open X/Twitter share intent
- `shareOnInstagram()` - Copy text to clipboard (Instagram doesn't support direct URL sharing, so we'll copy and open Instagram)
- `copyShareLink()` - Copy link to clipboard

#### 4. Replace the static Share button (lines 368-373)
Convert the simple button into a dropdown menu with share options:
- Facebook icon and link
- X (Twitter) icon and link
- Instagram icon and link
- Copy link option

---

### Technical Details

**Share URL Construction:**
```typescript
const getShareText = (event) => {
  const text = `${event.year}: ${event.event}`;
  const url = window.location.href;
  return { text, url };
};

const shareOnFacebook = (event) => {
  const { url } = getShareText(event);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
};

const shareOnTwitter = (event) => {
  const { text, url } = getShareText(event);
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
};
```

**New UI Component:**
```tsx
<div className="relative">
  <button 
    onClick={() => setShowShareMenu(!showShareMenu)}
    className="bg-transparent border border-green-600 text-green-400 px-6 py-2 rounded-lg hover:bg-green-900 hover:bg-opacity-20 transition-colors flex items-center space-x-2"
  >
    <Share className="w-4 h-4" />
    <span>{t.share}</span>
  </button>
  
  {showShareMenu && (
    <div className="absolute bottom-full mb-2 left-0 bg-gray-900 border border-green-600 rounded-lg p-2 min-w-[180px]">
      <button onClick={() => shareOnFacebook(event)}>
        <Facebook /> Facebook
      </button>
      <button onClick={() => shareOnTwitter(event)}>
        <Twitter /> X (Twitter)
      </button>
      <button onClick={() => shareOnInstagram(event)}>
        <Instagram /> Instagram
      </button>
      <button onClick={() => copyShareLink(event)}>
        <Link /> {t.copyLink}
      </button>
    </div>
  )}
</div>
```

---

### Dependencies
- Add Lucide icons: `Facebook`, `Twitter`, `Instagram`, `Link2` (already available in lucide-react)

---

### Result
The Share button will open a dropdown menu with options to:
1. **Facebook** - Opens Facebook share dialog with the current page URL
2. **X (Twitter)** - Opens Twitter intent with event text and URL
3. **Instagram** - Copies the text to clipboard and shows a notification (Instagram doesn't support direct URL sharing)
4. **Copy Link** - Copies the page URL to clipboard with a confirmation message

The menu labels will be properly translated for both English and Spanish languages.

