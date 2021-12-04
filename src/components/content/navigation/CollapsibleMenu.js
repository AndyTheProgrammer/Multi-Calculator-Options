import React from "react";
import Box from "@material-ui/core/Box";
import { useMaterialNestedMenuStyles } from "@mui-treasury/styles/nestedMenu/material";
import NestedMenu from "@mui-treasury/components/menu/nested";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { CALC_LABELS, CALCULATORS } from "../../../common/shared";

function CollapsibleMenu() {
  let history = useHistory();
  const getMenus = [
    {
      key: "home",
      label: "Home",
      onClick: () => history.push("/"),
    },
    {
      key: "math",
      label: CALC_LABELS.math,

      subMenus: [
        {
          key: "volume",
          label: "Volume",
          onClick: () => history.push("/"),
        },
        {
          key: "surfaceArea",
          label: "Surface Area",
          onClick: () => history.push("/surface_area"),
        },
        {
          key: "area",
          label: "Area",
          onClick: () => history.push("/area"),
        },
      ],
    },
    {
      key: "finance",
      label: CALC_LABELS.finance,
      subMenus: [
        {
          key: "themes",
          label: "Gatsby Themes",
        },
        {
          key: "link",
          label: "Gatsby Link",
        },
        {
          key: "image",
          label: "Gatsby Image",
        },
        {
          key: "config",
          label: "Gatsby Config",
        },
      ],
    },
    {
      key: "health",
      label: CALC_LABELS.health,
      subMenus: [
        {
          key: "v2",
          label: "v2 Release Notes",
        },
        {
          key: "v1",
          label: "v1 Release Notes",
        },
        {
          key: "v1Tov2",
          label: "Migration from v1 to v2",
        },
        {
          key: "v0Tov1",
          label: "Migration from v0 to v1",
        },
      ],
    },
    {
      key: "statistics",
      label: CALC_LABELS.statistics,
      subMenus: [
        {
          key: "v2",
          label: "v2 Release Notes",
        },
        {
          key: "v1",
          label: "v1 Release Notes",
        },
        {
          key: "v1Tov2",
          label: "Migration from v1 to v2",
        },
        {
          key: "v0Tov1",
          label: "Migration from v0 to v1",
        },
      ],
    },
    {
      key: "other",
      label: CALC_LABELS.other,
      subMenus: [
        {
          key: "v2",
          label: "v2 Release Notes",
        },
        {
          key: "v1",
          label: "v1 Release Notes",
        },
        {
          key: "v1Tov2",
          label: "Migration from v1 to v2",
        },
        {
          key: "v0Tov1",
          label: "Migration from v0 to v1",
        },
      ],
    },
  ];

  return (
    <Box>
      <NestedMenu menus={getMenus} useStyles={useMaterialNestedMenuStyles} />
    </Box>
  );
}

export default withRouter(CollapsibleMenu);
