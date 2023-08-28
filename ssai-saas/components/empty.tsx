import Image from "next/image";

interface EmptyInterface {
  label: string;
}

const Empty = ({ label }: EmptyInterface) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image fill src="/empty.webp" alt="Empty" />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};

export default Empty;
