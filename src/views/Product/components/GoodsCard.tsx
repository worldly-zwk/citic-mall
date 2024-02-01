import { FC, useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Tag, Space, Popup, Typography, Ticket } from '@/components';
import { useBoolean } from '@/hooks';
import Item from './Item';
import LinearGradient from 'react-native-linear-gradient';

interface GoodsCardProps {
  info?: API.ProductGoods;
  coupons?: API.PromotionTicket[];
  promotions?: API.ProductPromotion[];
  count: number;
  services?: Record<'title' | 'desc', string>[];
  onClickNorm: () => void;
}

const GoodsCard: FC<GoodsCardProps> = ({ info, count, services, coupons, promotions, onClickNorm }) => {
  const [visible, actions] = useBoolean();
  const [visibleCoupon, actionCoupon] = useBoolean();
  const [visiblePromotion, actionPromotion] = useBoolean();
  const normContent = useMemo(() => {
    let name = '默认';
    if (info?.normName) {
      const normList = info?.normName.split(';');
      name = normList.map(normName => normName.split(',')[1]).join(',')
    }
    return `${name}，${count}件`;
  }, [info?.normName, count]);

  const isVisibleVoucher = useMemo(() => !!coupons?.length || !!promotions?.length, [promotions, coupons]);
  
  return  (
    <View>
      {isVisibleVoucher && (
        <View style={styles.list}>
          {!!coupons?.length && (
            <Item label="领券" contentStyle={{ alignItems: 'center', gap: 6 }} onPress={actionCoupon.setTrue}>
              {coupons.map(({ id, value, minAmount }) => (
                <Tag key={id}>{minAmount ? `满${minAmount}减${value}券` : `${value}元券`}</Tag>
              ))}
            </Item>
          )}
          {!!promotions?.length && (
            <Item contentStyle={styles.promotionContent} label="促销" onPress={actionPromotion.setTrue}>
              {promotions.map(({ id, title, detailedInformation }) => (
                <Space size={4} align="center" key={id}>
                  <Tag>{title}</Tag>
                  <Typography.Text numberOfLines={1} style={{ flex: 1 }}>{detailedInformation}</Typography.Text>
                </Space>
              ))}
            </Item>
          )}
        </View>
      )}
      <View style={styles.list}>
        <Item style={styles.bordered} label="规格" onPress={onClickNorm}>
          <Typography.Text numberOfLines={1}>{normContent}</Typography.Text>
        </Item>
        <Item label="服务" contentStyle={styles.serviceContent} onPress={actions.setTrue}>
          {services?.map(({ title }) => (
            <View style={styles.serviceLabel} key={title}>
              <View style={styles.dot} />
              <Typography.Text>{title}</Typography.Text>
            </View>
          ))}
        </Item>
      </View>
      <Popup
        title="优惠券"
        visible={visibleCoupon}
        onClose={actionCoupon.setFalse}
        bodyStyle={{ padding: 0 }}
      >
        <ScrollView style={{ height: 300 }} contentContainerStyle={{ padding: 4 }}>
          {coupons?.map((ticket) => {
            const isHave = ticket.memberReceivedNum > 0;
            return (
              <Ticket
                key={ticket.id}
                ticket={{ ...ticket, type: ticket.couponType }}
                status={isHave ? 'have' : undefined}
                extra={ticket.isReceive === 2 ? (
                  <TouchableWithoutFeedback>
                    <LinearGradient style={styles.couponButton} colors={['#ffaf31', '#ff8400']} end={{ x: 1, y: 0 }}>
                      <Typography.Text size="small" color="white" align="center">立即领取</Typography.Text>
                    </LinearGradient>
                  </TouchableWithoutFeedback>
                ) : null}
              />
            )
          })}
        </ScrollView>
      </Popup>
      <Popup title="促销" visible={visiblePromotion} onClose={actionPromotion.setFalse}>
        {promotions?.map(({ title, detailedInformation }) => (
          <View style={styles.item} key={title}>
            <View style={styles.title}>
              <View style={styles.itemDot} />
              <Typography.Text style={styles.name}>{title}</Typography.Text>
            </View>
            <Typography.Text size="small" color="secondary" style={{ lineHeight: 18 }}>{detailedInformation}</Typography.Text>
          </View>
        ))}
      </Popup>
      <Popup title="服务" visible={visible} onClose={actions.setFalse}>
        {services?.map(({ title, desc }) => (
          <View style={styles.item} key={title}>
            <View style={styles.title}>
              <View style={styles.itemDot} />
              <Typography.Text style={styles.name}>{title}</Typography.Text>
            </View>
            <Typography.Text size="small" color="secondary" style={{ lineHeight: 18 }}>{desc}</Typography.Text>
          </View>
        ))}
      </Popup>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  bordered: {
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: '#f5a623',
    borderRadius: 3,
  },
  serviceContent: {
    columnGap: 12,
  },
  serviceLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  item: {
    padding: 12,
    borderRadius: 2,
    backgroundColor: '#f5f6fa',
    marginBottom: 10
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    marginBottom: 8,
  },
  name: {
    color: '#000',
    lineHeight: 16,
  },
  itemDot: {
    width: 5,
    height: 5,
    backgroundColor: '#e65321',
    borderRadius: 5,
  },
  promotionContent: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    gap: 6,
  },
  couponButton: {
    width: 36,
    padding: 10,
    justifyContent: 'center',
  }
})

export default GoodsCard;
