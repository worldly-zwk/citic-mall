import { FC, PropsWithChildren, useMemo } from "react";
import { Image, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Typography from "@/components/Typography";
import Popup from "@/components/Popup";
import { useBoolean } from "@/hooks";

interface ItemProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

interface GoodsCardProps {
  info?: API.ProductGoods;
  count: number;
  services?: Record<'title' | 'desc', string>[];
  onClickNorm: () => void;
}

const Item = ({ style, label, onPress, children }: PropsWithChildren<ItemProps>) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.item, style]}>
        <Typography.Text size="small" type="disabled">{label}</Typography.Text>
        <View style={styles.content}>{children}</View>
        <Image style={styles.arrow} source={require('@/assets/images/icons/arrow.png')} />
      </View>
    </TouchableWithoutFeedback>
    
  )
}

const GoodsCard: FC<GoodsCardProps> = ({ info, count, services, onClickNorm }) => {
  const [visible, setVisible] = useBoolean();
  const normContent = useMemo(() => {
    let name = '默认';
    if (info?.normName) {
      const normList = info?.normName.split(';');
      name = normList.map(normName => normName.split(',')[1]).join(',')
    }
    return `${name}，${count}件`;
  }, [info?.normName, count]);
  
  return  (
    <View style={styles.container}>
      <Item style={styles.itemLine} label="规格" onPress={onClickNorm}>
        <Typography.Text>{normContent}</Typography.Text>
      </Item>
      <Item label="服务" style={{ paddingBottom: 0 }} onPress={() => setVisible(true)}>
        {services?.map(({ title }) => (
          <View style={styles.serviceLabel} key={title}>
            <View style={styles.dot} />
            <Typography.Text>{title}</Typography.Text>
          </View>
        ))}
      </Item>
      <Popup title="服务" visible={visible} onClose={setVisible}>
        {services?.map(({ title, desc }) => (
          <View style={styles.serviceItem} key={title}>
            <View style={styles.serviceName}>
              <View style={styles.serviceDot} />
              <Typography.Text style={styles.serviceNameText}>{title}</Typography.Text>
            </View>
            <Typography.Text size="small" type="secondary" style={{ lineHeight: 18 }}>{desc}</Typography.Text>
          </View>
        ))}
      </Popup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    minHeight: 44,
  },
  itemLine: {
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  content: {
    flex: 1,
    paddingLeft: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  arrow: {
    width: 12,
    height: 12,
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: '#f5a623',
    borderRadius: 3,
  },
  serviceLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    marginRight: 12,
    marginBottom: 12,
  },
  serviceItem: {
    padding: 12,
    borderRadius: 2,
    backgroundColor: '#f5f6fa',
    marginBottom: 10
  },
  serviceName: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    marginBottom: 8,
  },
  serviceNameText: {
    color: '#000',
    lineHeight: 16,
  },
  serviceDot: {
    width: 5,
    height: 5,
    backgroundColor: '#e65321',
    borderRadius: 5,
  },
})

export default GoodsCard;
