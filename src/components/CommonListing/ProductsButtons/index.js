"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductButton({ item }) {
  const pathName = usePathname();
  const {
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);
  const router = useRouter();

  const pin = process.env.NEXT_PUBLIC_PIN_ADMIN;

  const isAdminView = pathName.includes("admin-view");

  async function handleDeleteProduct(item) {
    const enteredPin = prompt("Enter Security Pin:");

    if (enteredPin !== pin) {
      toast.error("Only authenticated admin can make changes.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await deleteAProduct(item._id);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  return isAdminView ? (
    <>
      <button
        onClick={() => {
          const enteredPin = prompt("Enter Security Pin:");

          if (enteredPin !== pin) {
            toast.error("Only authenticated admin can make changes.", {
              position: toast.POSITION.TOP_RIGHT,
            });
            return;
          }
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-product");
        }}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        Edit
        {/* SVG icon */}
      </button>
      <button
        onClick={() => handleDeleteProduct(item)}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Removing Product"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Remove"
        )}
        {/* SVG icon */}
      </button>
    </>
  ) : (
    <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
      Add To Cart
      {/* SVG icon */}
    </button>
  );
}
