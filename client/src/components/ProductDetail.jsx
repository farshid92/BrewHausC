import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
export function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activeImage, setActiveImage] = useState(null)
  useEffect(() => {
    async function loadProduct() {
      setLoading(true)
      setNotFound(false)
      try {
        const response = await fetch(`/api/products/${slug}`)
        if (response.status === 404) {
          setNotFound(true)
          return
        }
        const data = await response.json()
        setProduct(data)
        setActiveImage(data.imageUrl)
      } catch (err) {
        console.error('Failed to load product', err)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [slug])
  if (loading) {
    return <p className="mx-auto max-w-[1100px] px-6 py-16 text-ink-soft">Loading...</p>
  }
  if (notFound) {
    return (
      <div className="mx-auto max-w-[1100px] px-6 py-16">
        <p className="text-ink-soft">No such product.</p>
        <Link to="/" className="mt-2 inline-block text-ember underline">Back to shop</Link>
      </div>
    )
  }
  return (
    <div className="mx-auto grid max-w-[1100px] gap-10 px-6 py-16 md:grid-cols-2">
      <div>
        <img src={activeImage} alt={product.name} className="w-full rounded-2xl" />
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2">
            {product.images.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveImage(img.url)}
                className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${activeImage === img.url ? 'border-ember' : 'border-line'
                  }`}
              >
                <img src={img.url} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-ink-soft">{product.category}</p>
        <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-ink-soft">{product.tagline}</p>
        {(product.origin || product.roast) && (
          <p className="mt-3 text-xs tracking-wide text-clay uppercase">
            {[product.origin, product.roast].filter(Boolean).join(' · ')}
          </p>
        )}
        <p className="mt-4 text-2xl font-semibold text-ember">
          ${(product.priceCents / 100).toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-ink-soft">{product.stock} in stock</p>
        <p className="mt-6 text-ink-soft">{product.description}</p>
        <button
          type="button"
          disabled
          className="mt-6 cursor-not-allowed rounded-full bg-ember px-6 py-3 font-semibold
text-white opacity-50"
          title="Checkout arrives next session"
        >
          Buy now
        </button>
      </div>
    </div>
  )
}