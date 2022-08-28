import * as React from "react";
import type { CellPlugin } from "@react-page/editor";
import { connectField } from "uniforms";
import { TextFieldProps } from "uniforms-material";
import { TextField } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

export interface IFramePluginProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  encodedHtml?: string;
}

const IFrameWPlugin: React.FC<IFramePluginProps> = ({
  encodedHtml,
  src,
  ...props
}) => {
  const ref = React.useRef<HTMLIFrameElement>(null);
  const doc = ref.current?.contentDocument;
  const docBody = ref.current?.contentDocument?.body;
  const docHead = ref.current?.contentDocument?.head;

  React.useEffect(() => {
    if (
      doc &&
      !docBody?.hasChildNodes() &&
      !docHead?.hasChildNodes() &&
      !src &&
      encodedHtml
    ) {
      const html = decodeURIComponent(encodedHtml);
      doc.write(html);
    }
  }, [doc, docBody, src, encodedHtml]);

  return <iframe ref={ref} src={src} {...props} />;
};

const ControlHTMLInputField = connectField<TextFieldProps>(
  ({ value, onChange }) => {
    const text = value && decodeURIComponent(value);
    const update = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const newVal = encodeURIComponent(e.target.value ?? "");
      onChange(newVal);
    };
    return (
      <TextField
        value={text}
        onChange={(e) => update(e)}
        multiline={true}
        minRows={5}
        maxRows={10}
      />
    );
  }
);

export const iframePlugin: CellPlugin<{ encodedHtml: string, src: string, width: string, height: string }> = {
  id: "plugin-iframe",
  title: "i18n_iframe_title",
  description: "i18n_iframe_desc",
  icon: <CodeIcon />,
  version: 1,
  Renderer: ({ data }) => <IFrameWPlugin {...data} />,
  controls: [
    {
      title: "Config",
      controls: {
        type: "autoform",
        schema: {
          required: [],
          properties: {
            src: {
              type: "string",
            },
          },
        },
      },
    },
    {
      title: "Html",
      controls: {
        type: "autoform",
        schema: {
          required: [],
          properties: {
            encodedHtml: {
              type: "string",
              uniforms: {
                component: ControlHTMLInputField as any,
              },
            },
          },
        },
      },
    },
    {
      title: "Styling",
      controls: {
        type: "autoform",
        schema: {
          required: [],
          properties: {
            width: {
              type: "string",
              default: "auto",
            },
            height: {
              type: "string",
              default: "600px",
            },
          },
        },
      },
    },
  ],
};
