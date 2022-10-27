import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/router";

export default function FilterCheckbox() {
  const [isOn, setOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const routerQuery = router.query;

  useEffect(() => {
    if (router.isReady && routerQuery.instock) {
      setChecked(routerQuery.instock === "true");
    }
  }, [routerQuery]);

  const handleClick = (e) => {
    delete routerQuery['cursor']
    delete routerQuery['direction']
    delete routerQuery['reversed']
    if (!checked) {
      routerQuery.instock = true;

      if (!routerQuery.reverse) routerQuery.reverse = false;
      if (routerQuery.cursor) delete routerQuery.cursor;
      router.push(
        {
          query: routerQuery,
        },
        undefined
      );

      setChecked(true);
    } else {
      delete routerQuery.instock;
      router.push(
        {
          query: routerQuery,
        },
        undefined
      );
      setChecked(false);
    }
  };

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={() => setOn(!isOn)}
            onClick={handleClick}
          />
        }
        label={<p className="text-lg">Instock</p>}
      />
    </>
  );
}
