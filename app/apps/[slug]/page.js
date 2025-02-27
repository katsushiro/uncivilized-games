import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Script from 'next/script';

export async function generateStaticParams() {
  const apps = await client.fetch(`*[_type == "appPage"]{ slug }`);
  return apps.map((app) => ({
    slug: app.slug.current,
  }));
}

export default async function AppPage({ params }) {
  const { slug } = params;
  
  const app = await client.fetch(
    `*[_type == "appPage" && slug.current == $slug][0]`,
    { slug }
  );

  if (!app) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{app.title}</h1>
        {app.description && (
          <p className="text-xl text-gray-300 mb-8 max-w-3xl">{app.description}</p>
        )}
        
        {/* Container for the app content */}
        <div 
          id="app-container" 
          className="bg-gray-800 p-4 rounded-lg min-h-[500px]"
          dangerouslySetInnerHTML={{ __html: app.htmlContent || '<div>Loading app...</div>' }}
        />
      </div>
      
      {/* Inject CSS */}
      {app.cssContent && (
        <style dangerouslySetInnerHTML={{ __html: app.cssContent }} />
      )}
      
      {/* Inject JavaScript */}
      {app.jsContent && (
        <Script id={`app-script-${slug}`}>{app.jsContent}</Script>
      )}
    </>
  );
}