import { memo } from "react";
import RenderHTML, { CustomRendererProps, RenderHTMLProps, TBlock } from "react-native-render-html";

const RichText = (props: RenderHTMLProps) => {
  return (
    <RenderHTML
      enableExperimentalGhostLinesPrevention
      enableExperimentalMarginCollapsing
      ignoredDomTags={['input', 'map', 'area']}
      renderers={{
        p(props: CustomRendererProps<TBlock>) {
          const { TDefaultRenderer } = props;
          if (props.tnode.children.length) {
            return <TDefaultRenderer {...props} />
          }
          return null;
        }
      }}
      {...props}
    />
  )
}

export default memo(RichText);
