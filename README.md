# The RIVERS Model - NFL Predictions Blog

A clean, modern blog-style website for displaying NFL predictions from The RIVERS Model. This is a static site that can be easily deployed to any hosting platform.

## 🏈 Features

- **Clean Design**: Modern, responsive design with Bootstrap 5
- **Predictions Display**: Shows weekly NFL predictions with confidence scores
- **Statistics Tracking**: Real-time accuracy tracking and performance metrics
- **Injury Reports**: Displays injury information for each game
- **Game Results**: Shows actual game results and prediction accuracy
- **Mobile Responsive**: Works perfectly on all devices

## 📁 Project Structure

```
blog-site/
├── index.html              # Main predictions page
├── statistics.html         # Statistics and performance page
├── about.html             # About the RIVERS model page
├── css/
│   └── style.css          # Custom styles
├── js/
│   ├── app.js             # Main application logic
│   ├── statistics.js      # Statistics page logic
│   └── about.js           # About page logic
├── data/
│   └── week3_predictions.json  # Week 3 predictions data
└── README.md              # This file
```

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)
1. Zip the entire `blog-site` folder
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the zip file
4. Your site will be live instantly!

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to the blog-site folder
3. Run: `vercel`
4. Follow the prompts

### Option 3: GitHub Pages
1. Create a new GitHub repository
2. Upload all files from the blog-site folder
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 4: Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run: `firebase login`
3. Run: `firebase init hosting`
4. Select the blog-site folder as your public directory
5. Run: `firebase deploy`

## 📊 Adding New Predictions

To add predictions for new weeks:

1. Create a new JSON file in the `data/` folder: `weekX_predictions.json`
2. Follow the same format as `week3_predictions.json`
3. Update the week selector buttons in `index.html` if needed
4. The site will automatically load the new data

### JSON Format
```json
{
  "predictions": [
    {
      "away_team": "MIA",
      "home_team": "BUF", 
      "winner": "BUF",
      "confidence": 81.0,
      "injury_report": "Injury details here..."
    }
  ],
  "results": {
    "MIA@BUF": {
      "home_score": 24,
      "away_score": 17,
      "actual_winner": "BUF"
    }
  }
}
```

## 🎨 Customization

### Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    /* ... */
}
```

### Branding
- Update the navbar brand in all HTML files
- Modify the hero section text
- Change the footer information

## 📱 Mobile Optimization

The site is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes

## 🔧 Technical Details

- **Framework**: Pure HTML/CSS/JavaScript (no build process needed)
- **Styling**: Bootstrap 5 + Custom CSS
- **Icons**: Font Awesome 6
- **Data**: JSON files for easy updates
- **Performance**: Optimized for fast loading

## 📈 Performance Features

- **Fast Loading**: Static files load instantly
- **No Backend**: No server required
- **CDN Ready**: Can be served from any CDN
- **SEO Friendly**: Proper meta tags and structure

## 🛠️ Maintenance

### Updating Predictions
1. Edit the appropriate JSON file in the `data/` folder
2. Redeploy the site (or push to GitHub if using GitHub Pages)

### Adding New Weeks
1. Create new JSON file: `weekX_predictions.json`
2. Add week button to `index.html`
3. Update JavaScript to handle the new week

## 📞 Support

This is a static site that requires no server maintenance. Simply update the JSON files with new predictions and redeploy.

## 🎯 Key Benefits

- **No Server Costs**: Static hosting is free on most platforms
- **Easy Updates**: Just edit JSON files and redeploy
- **Fast Performance**: Static files load instantly
- **Reliable**: No server downtime or maintenance issues
- **Scalable**: Can handle unlimited traffic

---

**Note**: This site displays prediction results only. The actual RIVERS model runs separately and results are uploaded here for display. This approach ensures the site remains fast, reliable, and easy to maintain.
