import { Home } from "@/features/home/home";
import { Underwater } from "@/features/ocean/ocean";

export default function HomePage() {
  return (
    <Underwater>
      <Home />
    </Underwater>
  );
}
