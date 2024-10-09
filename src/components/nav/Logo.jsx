import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-lg font-bold whitespace-nowrap">
      <Zap className="size-5" />
      <span className="font-mono">Insta-Pasal</span>
    </Link>
  );
}

export default Logo;
