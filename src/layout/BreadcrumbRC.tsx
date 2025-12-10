import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { normalizeStringPath } from "../modules";
import { useFlattenRoutes } from "../routes/useFlattenRoute";

import { Breadcrumb } from "antd";

export const BreadcrumbRC = () => {
  const location = useLocation();
  const flattenedRoutes = useFlattenRoutes();

  const breadcrumbItems = useMemo(() => {
    const temp = flattenedRoutes.filter((route) => normalizeStringPath(location.pathname).includes(normalizeStringPath(route?.path as string)));

    return temp.map((item) => {
      return {
        key: item.key,
        title: (
          <>
            {
              item.element !== null ?
                <Link to={item.path as string} >
                  {item.icon !== null && <>{item.icon}<span>&nbsp;</span></>}
                  <span style={{ lineHeight: 0, marginBottom: 0, }}>{item.title}</span>
                </Link>
                :
                <div>
                  {item.icon !== null && <>{item.icon}<span>&nbsp;</span></>}
                  <span>{item.title}</span>
                </div>
            }
          </>
        ),
      }
    })
  }, [location]);

  return (
    <Breadcrumb items={breadcrumbItems} />
  );
};