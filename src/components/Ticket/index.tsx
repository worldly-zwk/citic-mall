import { Image, ImageBackground, StyleSheet, View, ViewProps } from 'react-native';
import Typography from '../Typography';
import Space from '../Space';
import Tag from '../Tag';
import { ReactNode } from 'react';

const { Text, Price } = Typography;

const sealStatusEnum = {
  used: require('@/assets/images/view/seal_used.png'),
  soldOut: require('@/assets/images/view/seal_sold-out.png'),
  expired: require('@/assets/images/view/seal_expired.png'),
}

interface TicketProps extends ViewProps {
  ticket: API.Ticket;
  status?: keyof typeof sealStatusEnum;
  disabled?: boolean;
  extra?: ReactNode;
}

const Ticket = (props: TicketProps) => {
  const { style, ticket, status = 'expired', disabled, extra, ...restProps } = props;

  const containerStyle = [styles.container, style, { opacity: disabled ? .7 : 1 }];
  const colorTag = disabled ? '#dbdbdb' : '#999';
  const colorPrimary = disabled ? '#dbdbdb' : 'primary';
  const colorDisabled = disabled ? '#dbdbdb' : 'disabled';

  return (
    <ImageBackground source={require('@/assets/images/view/ticket.png')} resizeMode="stretch" style={containerStyle} {...restProps}>
      <Space style={styles.ticket}>
        <View style={styles.money}>
          <Price size={20} style={styles.price} unitStyle={{ marginBottom: 4 }} color={colorPrimary}>{ticket?.value}</Price>
          <Text size="mini" color={colorPrimary}>{ticket.ticketType === 1 ? `满${ticket?.minAmount}元可用` : '无门槛现金券'}</Text>
        </View>
        <View style={styles.content}>
          <Typography tag={<Tag style={{ borderColor: colorTag }} textColor={colorPrimary}>{ticket.ticketType === 1 ? '满减券' : '现金券'}</Tag>}>
            <Text indent={7} strong="600" numberOfLines={1} color={disabled ? '#dbdbdb' : undefined}>{ticket?.name}</Text>
          </Typography>
          <Text size="small" color={colorDisabled}>{ticket?.useScope}</Text>
          <Text size="small" color={colorDisabled}>{ticket?.useStartTime.slice(0,10).replace(/-/ig,'.')} ~ {ticket?.useEndTime.slice(0,10).replace(/-/ig,'.')}</Text>
          {status && (
            <Image style={styles.seal} source={sealStatusEnum[status]} />
          )}
        </View>
        {extra}
      </Space>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 7,
  },
  ticket: {
    flex: 1,
  },
  money: {
    width: '24.8%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    height: 32,
    marginBottom: 3,
  },
  content: {
    flex: 1,
    padding: 10,
    gap: 8,
  },
  seal: {
    position: 'absolute',
    width: 50,
    height: 37,
    bottom: 0,
    right: 0,
  },
  extra: {}
})

export default Ticket;

