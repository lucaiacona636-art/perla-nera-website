import Link from "next/link";

interface Crumb {
  label: string;
  href: string;
}

// Breadcrumb visibile + BreadcrumbList strutturato — Documento 6 §5 (SEO).
// Sempre "Home" come primo elemento, l'ultimo è la pagina corrente (non
// linkato, aria-current).
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `https://www.perlanera.it${item.href}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.05em] text-text-dark-muted">
          {trail.map((item, i) => (
            <li key={item.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === trail.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-text-dark transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
