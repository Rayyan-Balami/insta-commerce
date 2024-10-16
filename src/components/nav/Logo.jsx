import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Logo() {
  const { storeName } = useSelector((state) => state.store.general);
  return (
    <Link to="/" className="flex items-center gap-2 text-lg font-bold whitespace-nowrap">
      <Zap className="size-5" />
      <span className="font-mono">{storeName}</span>
    </Link>
  );
}

export default Logo;
