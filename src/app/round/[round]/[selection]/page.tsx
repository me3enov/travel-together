// src/app/round/[round]/[selection]/page.tsx
import RoundPageClient from '@/components/game/RoundPageClient';

const RoundPage = ({
  params,
}: {
  params: { round: string; selection: string };
}) => {
  return <RoundPageClient round={params.round} selection={params.selection} />;
};

export async function generateStaticParams() {
  const rounds = ['1', '2', '3', '4'];
  const selections = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'rescue'];

  return rounds.flatMap((round) =>
    selections.map((selection) => ({
      round,
      selection,
    })),
  );
}

export default RoundPage;
