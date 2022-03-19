import * as React from "react";
import {
  FormControlLabel,
  Switch,
  FormControlLabelProps,
  alpha,
} from "@mui/material";
import { styled } from "../styles";

const CustomColorSwitch = (color: any) =>
  styled(Switch)(({ theme }) => ({
    color: color[300],
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: color[500],
      "&:hover": {
        backgroundColor: alpha(color[500], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: color[500],
    },
  }));

export interface SwitchRendererProps {
  flag?: boolean;
  label?: string;
  onChange?: (flag: boolean) => void;
  color?: any;
  size?: "medium" | "small";
  labelProps?: Partial<FormControlLabelProps>;
  nonEditable?: boolean;
}

export const SwitchRenderer = React.memo<SwitchRendererProps>(
  ({
    flag: propFlag,
    label,
    onChange,
    color,
    size = "medium",
    labelProps,
    nonEditable,
  }) => {
    const [flag, setFlag] = React.useState<boolean>(!!propFlag);

    React.useEffect(() => {
      setFlag(!!propFlag);
    }, [propFlag, setFlag]);

    const onSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!nonEditable) {
        const checked = event.target.checked;
        onChange && onChange(checked);
        setFlag(checked);
      }
    };

    const SwitchControl = color ? CustomColorSwitch(color) : Switch;

    return (
      <FormControlLabel
        control={
          <SwitchControl
            size={size}
            checked={flag}
            onChange={onSwitchChange}
            name="flag"
          />
        }
        label={label ?? ""}
        {...labelProps}
      />
    );
  }
);
