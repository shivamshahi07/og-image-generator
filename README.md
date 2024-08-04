# OG Image Generator ✍️

Generate custom Open Graph (OG) images for your blog posts or web pages with ease.

Live Demo(not yet available): [https://og-image-generator.vercel.app/](https://og-image-generator.vercel.app/)

## Overview

This React-based application allows users to create customized OG images by inputting a title, content, and an optional image. The generated OG image can be used for social media previews, improving the visual appeal of shared links.

## Features

- Dynamic OG image generation
- Title and content input
- Image upload capability
- Real-time preview
- Download generated OG image
- Responsive design

## How It Works

1. **Input Fields**: Users can enter a title and content for their post.
2. **Image Upload**: An optional image can be uploaded to enhance the OG image.
3. **Generation**: Clicking "Generate OG Image" creates a preview of the OG image.
4. **Download**: Users can download the generated image for use on their websites or social media platforms.

## Technical Details

### Key Components

- `PostPage.tsx`: The main component handling the OG image generation logic. It contains the input fields for title and content, the image upload functionality, and the button to generate the OG image. It also manages the state and refs used in the application.
- `Footer.tsx`: A footer component styled using Tailwind CSS that credits the author and links to the GitHub profile.
- `App.tsx`: The root component that renders the application structure, including the `PostPage` and `Footer` components.
## Setup Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/og-image-generator.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm start
   ```
4. **Open the application in your browser**:
   ```bash
   http://localhost:3000
   ```  

### Core Functionality

#### Image Generation

The `generateOGImage` function uses the `html-to-image` library to convert a React component into a PNG image. This process involves:

1. Capturing the content of a referenced div element.
2. Converting the HTML content to a PNG image.
3. Setting the generated image URL in the component state.
4. Dynamically adding an OG meta tag to the document head.

```typescript
const generateOGImage = async () => {
  if (ogImageRef.current) {
    try {
      const dataUrl = await toPng(ogImageRef.current, { width: 1200, height: 630 });
      const metaTag = document.createElement('meta');
      metaTag.setAttribute('property', 'og:image');
      metaTag.setAttribute('content', dataUrl);
      document.head.appendChild(metaTag);
      console.log('OG Image generated and meta tag added');
    } catch (error) {
      console.error('Error generating OG image:', error);
    }
  }
};
