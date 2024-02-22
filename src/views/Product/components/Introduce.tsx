import { FC, memo, useMemo, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View, ViewProps, useWindowDimensions } from "react-native";
import { Typography, RichText } from "@/components";
import Descriptions from "./Descriptions";

enum KeyEnum {
  INTRO,
  SPEC,
}

interface IntroduceProps extends ViewProps {
  data?: API.ProductInfo;
  richText?: string;
}

const Introduce: FC<IntroduceProps> = ({ data, richText = '', ...restProps }) => {
  const { width } = useWindowDimensions();
  const [activeKey, setActiveKey] = useState(KeyEnum.INTRO);

  const [basis, attrs] = useMemo(() => {
    const basis = [
      {
        label: '商品编号',
        content: data?.id,
      },
      {
        label: '商品品牌',
        content: data?.productBrandName
      }
    ];

    const attrs = data?.productAttrList?.map(({ name, value }) => ({
      label: name,
      value,
    }));
    return [basis, attrs];
  }, [data]);


  return (
    <View style={styles.container} {...restProps}>
     <View style={styles.tabs}>
      <TouchableWithoutFeedback onPress={() => setActiveKey(KeyEnum.INTRO)}>
        <View style={[styles.item, styles.itemLine]}>
          <Typography.Text style={styles.text} primary={activeKey === KeyEnum.INTRO}>商品介绍</Typography.Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setActiveKey(KeyEnum.SPEC)}>
        <View style={styles.item}>
          <Typography.Text style={styles.text} primary={activeKey === KeyEnum.SPEC}>规格参数</Typography.Text>
        </View>
      </TouchableWithoutFeedback>
     </View>
     <View style={{ display: activeKey === KeyEnum.INTRO ? 'flex' : 'none' }}>
      <RichText contentWidth={width} source={{ html: richText }} />
     </View>
     <View style={[styles.table ,{ display: activeKey === KeyEnum.SPEC ? 'flex' : 'none' }]}>
      <Descriptions items={basis} />
      {attrs && (
        <Descriptions style={{ borderTopWidth: 0 }} title="规格" items={attrs} />
      )}
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  tabs: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
  },
  itemLine: {
    borderRightColor: '#dcdcdc',
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  text: {
    textAlign: 'center',
  },
  table: {
    padding: 10,
    backgroundColor: '#fff'
  }
})

export default memo(Introduce);
