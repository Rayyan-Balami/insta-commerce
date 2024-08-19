import { Variable } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
      <Variable className="h-6 w-6" />
      <span>Balami Store</span>
    </Link>
  );
}

export default Logo;
