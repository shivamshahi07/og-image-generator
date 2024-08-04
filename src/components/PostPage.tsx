import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

const PostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [ogImageUrl, setOgImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const ogImageRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateOGImage = async () => {
    if (ogImageRef.current) {
      setIsGenerating(true);
      try {
        const dataUrl = await toPng(ogImageRef.current, { width: 1200, height: 630 });
        setOgImageUrl(dataUrl);
        const metaTag = document.createElement('meta');
        metaTag.setAttribute('property', 'og:image');
        metaTag.setAttribute('content', dataUrl);
        document.head.appendChild(metaTag);
        console.log('OG Image generated and meta tag added');
      } catch (error) {
        console.error('Error generating OG image:', error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const downloadOGImage = () => {
    if (ogImageUrl) {
      const link = document.createElement('a');
      link.href = ogImageUrl;
      link.download = 'og-image.png';
      link.click();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded h-32"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      <button
        onClick={generateOGImage}
        disabled={isGenerating}
        className={`bg-blue-500 text-white px-4 py-2 rounded mr-2 ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isGenerating ? 'Generating...' : 'Generate OG Image'}
      </button>
      {ogImageUrl && (
        <button
          onClick={downloadOGImage}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Download OG Image
        </button>
      )}

      <div ref={ogImageRef} className="mt-8 p-4 border rounded">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2">{content.substring(0, 90)}...</p>
        {image && <img src={image} alt="Post" className="mt-4 max-w-full h-auto" />}
      </div>

      {ogImageUrl && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Generated OG Image Preview:</h3>
          <img src={ogImageUrl} alt="OG Image" className="max-w-full h-auto border rounded" />
        </div>
      )}
    </div>
  );
};

export default PostPage;