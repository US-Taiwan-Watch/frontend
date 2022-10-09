import React from "react";
import { Box } from "@mui/material";
import { USTWTheme, styled } from "../../styles";
import { cellPlugins as defaultCellPlugins } from "./plugins/cell-plugins";
import type { Value } from "@react-page/editor";
import Editor, {
  CellPlugin,
  BottomToolbarProps,
  BottomToolbar,
} from "@react-page/editor";

import background, { ModeEnum } from "@react-page/plugins-background";
import { imagePlugin, ImageUploadType } from "@react-page/plugins-image";
// import { gqlAddImage, gqlDeleteImage } from "../../../../utils/cms-heiper";
import { useI18n } from "../../context/i18n";
import { EditorLanguage, ZhLanguage, EnLanguage } from "./i18n";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { useApolloClient } from "@apollo/client";
import { makeStyles, createStyles } from "@mui/styles";
import { uploadPostImage } from "../../utils/image-upload-utils";

const useStyles = makeStyles((theme: USTWTheme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      // "& a": {
      //   color: theme.color.white[200],
      // },
      "& blockquote": {
        marginTop: "0px !important",
        marginBottom: "0px !important",
      },
      "& h1": {
        fontSize: "1.6rem !important",
        fontWeight: theme.typography.fontWeightRegular,
      },
      "& h2": {
        fontSize: "1.4rem  !important",
        fontWeight: theme.typography.fontWeightRegular,
      },
      "& p": {
        fontSize: "1.15rem !important",
        fontWeight: "normal",
      },
      "& h4": {
        fontSize: "1rem !important",
        fontWeight: "normal",
      },
    },
    withBorder: {
      // border: `1px solid ${theme.color.white[100]}`,
    },
    drawer: {
      "&, & > *": {
        zIndex: `1201 !important`,
      },
    },
  })
);

// const CustomToolbar = React.memo<BottomToolbarProps>((props) => (
//   <BottomToolbar {...props} className={classes.drawer} />
// ));

export interface AdaptiveEditorProps {
  value?: string;
  onSave?: (value_raw: string) => void;
  viewOnly?: boolean;
  classNameForRootComponent?: string;
  postLang?: string;
}

export const AdaptiveEditor = React.memo<AdaptiveEditorProps>(
  ({
    value: defaultValue,
    onSave,
    viewOnly = false,
    classNameForRootComponent,
    postLang,
  }) => {
    const classes = useStyles();
    const { lang } = useI18n();
    const [value, setValue] = React.useState<Value | null>(
      defaultValue && JSON.parse(defaultValue)
    );
    const [language, setLanguage] = React.useState<EditorLanguage>(EnLanguage);

    React.useEffect(() => {
      handleLangChange(lang);
    }, [lang]);

    React.useEffect(() => {
      setValue(defaultValue ? JSON.parse(defaultValue) : defaultValue);
    }, [defaultValue]);

    const handleLangChange = (lang: string) => {
      switch (lang) {
        case "zh":
          setLanguage(ZhLanguage);
          break;
        case "zh-TW":
          setLanguage(ZhLanguage);
          break;
        case "en":
          setLanguage(EnLanguage);
          break;
        default:
          setLanguage(EnLanguage);
          break;
      }
    };

    const uploadImage: (url: string) => ImageUploadType =
      (defaultUrl) => (file, reportProgress) =>
        new Promise((resolve, reject) => {
          uploadPostImage(file)
            .then((url) => resolve({ url }))
            .catch((err) => reject(err));
        });

    const cellPlugins = [
      ...defaultCellPlugins,
      imagePlugin({
        imageUpload: uploadImage("/images/react.png"),
      }) as CellPlugin,
      background({
        imageUpload: uploadImage("/images/sea-bg.jpg"),
        enabledModes:
          ModeEnum.COLOR_MODE_FLAG |
          ModeEnum.IMAGE_MODE_FLAG |
          ModeEnum.GRADIENT_MODE_FLAG,
      }) as CellPlugin,
    ];

    const uiTranslator = React.useCallback(
      (label?: string | null) => {
        if (label && language[label] !== undefined) {
          return language[label];
        }
        return `${label}(to translate)`;
      },
      [language]
    );

    return (
      <Box
        className={clsx(
          classes.root,
          { [classes.withBorder]: !viewOnly },
          classNameForRootComponent ?? ""
        )}
      >
        <Editor
          cellPlugins={cellPlugins}
          value={value}
          lang={postLang || lang}
          // components={{
          //   BottomToolbar: CustomToolbar,
          // }}
          languages={[
            {
              lang: "en",
              label: "English",
            },
            {
              lang: "zh",
              label: "中文(繁)",
            },
          ]}
          readOnly={viewOnly}
          {...(!viewOnly && {
            onChange: (v) => {
              setValue(v);
              onSave?.(JSON.stringify(v));
            },
            uiTranslator,
            dndBackend: HTML5Backend,
            hideEditorSidebar: true,
          })}
        />
      </Box>
    );
  }
);
