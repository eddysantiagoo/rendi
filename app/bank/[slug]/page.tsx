import { DetailedCardBank } from "./CardBank";

interface Params {
  slug: string;
}

type Props = {
  params: Promise<Params>;
};

export default async function BankPage({ params }: Props) {
  const resolvedParams = await params;
  const normalizedSlug = decodeURIComponent(
    resolvedParams.slug.toLowerCase().replace(/-/g, " ")
  );

  return (
    <div>
      <DetailedCardBank slug={normalizedSlug} />
    </div>
  );
}
