import { useEffect, useState } from "react";

const useRandomIds = (length = 20) => {
   const [randomIds, setRandomIds] = useState([]);

   useEffect(() => {
      if (typeof window !== "object") return;

      setRandomIds(
         Array(length)
            .fill("")
            .map(() => {
               if (!crypto.randomUUID) return;
               const [id] = crypto?.randomUUID()?.split("-");

               return id;
            })
      );
   }, [length]);

   return randomIds;
};

export default useRandomIds;
