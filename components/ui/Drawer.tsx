import React, { ReactNode, useCallback, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Scrollbars } from "react-custom-scrollbars";

interface Props {
  children: ReactNode | undefined;
  isOpen: boolean;
  setIsOpen: (e) => void;
  childrenTop?: ReactNode | undefined;
}

const Drawer: React.FC<Props> = ({ children, isOpen, setIsOpen, childrenTop = undefined }) => {
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
  return (
    <>
      <div
        className={"z-10 fixed inset-0 transition-opacity" + (isOpen ? "" : " hidden ")}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div
        className={
          "flex overflow-hidden transform bottom-0 left-0 w-screen max-h-[90vh] min-h-1/2 fixed ease-in-out transition-all duration-300 z-30 " +
          (isOpen ? " translate-y-0 " : " translate-y-full ")
        }
      >
        <div className="flex flex-col h-[90%] container mx-auto divide-y rounded-t text-gray-800">
          <div className=" min-h-16 max-h-20 flex justify-between items-center divide-x-reverse">
            <div className="mb-2">{childrenTop !== undefined && childrenTop}</div>
            <div
              className="drawer h-14 w-14 mb-2 cursor-pointer flex justify-center items-center rounded-2xl"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <AiOutlineCloseCircle size={23} />
            </div>
          </div>
          <Scrollbars autoHeight autoHeightMin={0} autoHeightMax="90vh" universal={true}>
            <div className="drawer pt-2">{children}</div>
          </Scrollbars>
        </div>
      </div>
    </>
  );
};
export default Drawer;
