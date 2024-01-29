import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const loadError = async () => {
      const result = await Swal.fire({
        title: " Error!",
        text: "Not found page",
        icon: "error",
        confirmButtonText: "Go home",
        background: "#111111",
        color: "white",
        allowEscapeKey: false,
        allowEnterKey: true,
        backdrop: false,
        confirmButtonColor: "#bd00ff",
      });
      if (result.isConfirmed) {
        navigate("/home");
      }
      if (result.isDismissed) {
        navigate("/home");
      }
    };
    loadError();
  }, []);

  return <></>;
}

export default NotFoundPage;
