import { useFetch } from "../hooks/useFetch";
import { fetchAllProducts } from "../services/productService";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  productId: number;
  category: string;
}

export function RelatedProducts({ productId, category }: RelatedProductsProps) {
  const { data } = useFetch(fetchAllProducts);
  const related = (data ?? []).filter((p) => p.category === category && p.id !== productId).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="related">
      <h2>Produk terkait</h2>
      <div className="grid">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}