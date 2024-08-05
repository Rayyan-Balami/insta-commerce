import { Drumstick } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
      <Drumstick className="h-6 w-6" />
      <span>Balami Inc</span>
    </Link>
  );
}

export default Logo;
