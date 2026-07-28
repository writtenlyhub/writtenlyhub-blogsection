import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'WrittenlyHub Blog'
      
    const author = searchParams.get('author') || 'WrittenlyHub'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#000000',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            {/* Simple logo text since we don't have SVG access easily here */}
            <div
              style={{
                color: '#3B82F6',
                fontSize: 36,
                fontWeight: 900,
                letterSpacing: '-0.02em',
              }}
            >
              WrittenlyHub
            </div>
          </div>
          <div
            style={{
              color: 'white',
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '60px',
              maxWidth: '950px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#9CA3AF',
              fontSize: 32,
              fontWeight: 500,
            }}
          >
            By {author}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error(`[OG Route] Failed to generate image`, e.message)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
