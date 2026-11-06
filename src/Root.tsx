import React from "react";
import { Composition } from "remotion";
import { VIDEO } from "./theme";
import {
  YangilikReel,
  yangilikDefaults,
  yangilikDuration,
  yangilikSchema,
} from "./templates/YangilikReel";
import { FAKT_MAIN, FAKT_OUTRO, FaktKarta, faktDefaults, faktSchema } from "./templates/FaktKarta";
import { SAVOL_TOTAL, SavolJavob, savolDefaults, savolSchema } from "./templates/SavolJavob";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="YangilikReel"
      component={YangilikReel}
      schema={yangilikSchema}
      defaultProps={yangilikDefaults}
      durationInFrames={yangilikDuration(yangilikDefaults)}
      calculateMetadata={({ props }) => ({ durationInFrames: yangilikDuration(props) })}
      {...VIDEO}
    />
    <Composition
      id="FaktKarta"
      component={FaktKarta}
      schema={faktSchema}
      defaultProps={faktDefaults}
      durationInFrames={FAKT_MAIN + FAKT_OUTRO}
      {...VIDEO}
    />
    <Composition
      id="SavolJavob"
      component={SavolJavob}
      schema={savolSchema}
      defaultProps={savolDefaults}
      durationInFrames={SAVOL_TOTAL}
      {...VIDEO}
    />
  </>
);
