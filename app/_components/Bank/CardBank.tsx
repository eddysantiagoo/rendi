interface CardBankProps {
  name: string;
  tase: number;
}

export const CardBank = ({ name, tase }: CardBankProps) => {
  return (
    <div className="flex-1 p-4 border rounded shadow-lg">
      <h1 className="text-xl font-bold mb-2 whitespace-nowrap text-nowrap">{name}</h1>
      <p className="text-gray-700">Interest Rate: {tase}%</p>
    </div>
  );
};
