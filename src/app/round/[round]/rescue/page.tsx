import RoundPageClient from '@/components/game/RescuePageClient';

const RescuePage = () => {
  return <RoundPageClient />;
};

export default RescuePage;

export async function generateStaticParams() {
  const rounds = ['1', '2', '3', '4'];

  return rounds.map((round) => ({
    round,
    selection: 'rescue',
  }));
}
